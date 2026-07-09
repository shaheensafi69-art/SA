import "../globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata = {
  title: "Safi Academy",
  description: "The best place to learn.",
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" className="w-full h-full">
      <ConditionalLayout>
        {children}
      </ConditionalLayout>
    </div>
  );
}
