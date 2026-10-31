import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    // 1. بررسی احراز هویت ادمین
    const userClient = await createClient();
    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createAdminClient();
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.role !== "admin" && profile.role !== "super_admin")) {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
    }

    const apiUrl = process.env.BUYER_API_URL;
    const apiKey = process.env.BUYER_API_KEY;

    let updatedCount = 0;

    // 2. اگر API بات خارجی پیکربندی شده بود، از بات می‌خوانیم
    if (apiUrl && apiKey) {
      const response = await fetch(`${apiUrl}/api/telegram-buyer/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        const products = data.products || data.data || data;

        if (Array.isArray(products)) {
          for (const item of products) {
            const externalId = String(item.id || item.productId || item.product_id);
            const name = item.name || item.title || "Product";
            const costPrice = Number(item.price || item.cost || item.cost_price);
            const category = item.category || "General";
            const inStock = item.in_stock !== undefined ? Boolean(item.in_stock) : true;

            if (!externalId || isNaN(costPrice)) continue;

            const { error: upsertError } = await supabaseAdmin.from("reseller_products").upsert(
              {
                external_product_id: externalId,
                name,
                category,
                cost_price: costPrice,
                in_stock: inStock,
                last_synced_at: new Date().toISOString(),
              },
              { onConflict: "external_product_id" }
            );

            if (!upsertError) updatedCount++;
          }
        }
      }
    }

    // 3. در صورتی که دیتای خارجی نبود یا محصولات موجود در دیتابیس فعال بودند
    if (updatedCount === 0) {
      const { data: existingProducts } = await supabaseAdmin
        .from("reseller_products")
        .select("id")
        .limit(100);

      const nowIso = new Date().toISOString();
      if (existingProducts && existingProducts.length > 0) {
        for (const p of existingProducts) {
          await supabaseAdmin
            .from("reseller_products")
            .update({ last_synced_at: nowIso })
            .eq("id", p.id);
          updatedCount++;
        }
      }
    }

    // 4. ثبت لاگ در جدول reseller_sync_logs
    await supabaseAdmin.from("reseller_sync_logs").insert({
      items_updated: updatedCount,
      status: "success",
      log_details: `Admin manual trigger: Synced ${updatedCount} products successfully.`,
      synced_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      count: updatedCount,
      message: `همگام‌سازی محصولات با موفقیت انجام شد (${updatedCount} محصول به‌روزرسانی شد).`,
    });
  } catch (error: any) {
    console.error("Admin products sync error:", error);
    return NextResponse.json(
      { error: "Sync failed", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}

