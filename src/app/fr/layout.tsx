import "../globals.css";

export const metadata = {
  title: "صافی آکادمی",
  description: "بهترین پلتفرم یادگیری آنلاین.",
};

export default function PersianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}