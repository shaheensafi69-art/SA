import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// اتصال به سوپابیس با دسترسی Service Role جهت دسترسی کامل به جداول
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        // ۱. بررسی احراز هویت درخواست از سمت Cron Job
        const authHeader = req.headers.get("authorization");
        const secret = process.env.CRON_SECRET;

        if (secret && authHeader !== `Bearer ${secret}`) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const apiUrl = process.env.BUYER_API_URL;
        const apiKey = process.env.BUYER_API_KEY;

        if (!apiUrl || !apiKey) {
            return NextResponse.json(
                { error: "API credentials are not configured" },
                { status: 500 }
            );
        }

        // ۲. دریافت لیست محصولات و قیمت‌ها از API بات
        const response = await fetch(`${apiUrl}/api/telegram-buyer/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Bot API returned status ${response.status}`);
        }

        const data = await response.json();
        const products = data.products || data.data || data;

        if (!Array.isArray(products)) {
            throw new Error("Invalid products payload structure from bot API");
        }

        let updatedCount = 0;

        // ۳. درج یا به‌روزرسانی قیمت‌ها در جدول reseller_products
        for (const item of products) {
            const externalId = String(item.id || item.productId || item.product_id);
            const name = item.name || item.title || "Unknown Product";
            const costPrice = Number(item.price || item.cost || item.cost_price);
            const category = item.category || "General";
            const inStock = item.in_stock !== undefined ? Boolean(item.in_stock) : true;

            if (!externalId || isNaN(costPrice)) continue;

            const { error } = await supabaseAdmin.from("reseller_products").upsert(
                {
                    external_product_id: externalId,
                    name: name,
                    category: category,
                    cost_price: costPrice,
                    in_stock: inStock,
                    last_synced_at: new Date().toISOString(),
                },
                {
                    onConflict: "external_product_id",
                    ignoreDuplicates: false,
                }
            );

            if (!error) updatedCount++;
        }

        // ۴. ثبت لاگ اجرای عملیات
        await supabaseAdmin.from("reseller_sync_logs").insert({
            items_updated: updatedCount,
            status: "success",
            log_details: `Synced ${updatedCount} products successfully.`,
            synced_at: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: `Sync completed. ${updatedCount} items processed.`,
        });
    } catch (error: any) {
        // ثبت لاگ خطا در صورت قطعی یا مشکل ارتباط
        await supabaseAdmin.from("reseller_sync_logs").insert({
            items_updated: 0,
            status: "failed",
            log_details: error.message || "Unknown error",
            synced_at: new Date().toISOString(),
        });

        return NextResponse.json(
            { error: "Sync failed", details: error.message },
            { status: 500 }
        );
    }
}