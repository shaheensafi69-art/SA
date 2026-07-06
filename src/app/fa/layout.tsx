import "../globals.css";

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
    <html lang="en" dir="ltr">
      <body className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}