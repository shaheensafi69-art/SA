export default function AboutPage() {
  return (
    <main className="min-h-screen p-10 flex items-center justify-center">
      <div className="max-w-3xl bg-neutral-900 border border-neutral-800 p-12 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* افکت نوری پس‌زمینه */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>
        
        <h1 className="text-4xl font-bold text-yellow-500 mb-6">About Safi Academy</h1>
        <div className="space-y-6 text-neutral-300 leading-relaxed text-lg">
          <p>
            Safi Academy represents the educational frontier of our global ecosystem. Designed to bridge the gap between theoretical knowledge and real-world execution, we provide elite training across global markets, technology, and commerce.
          </p>
          <p>
            Spearheaded by Shaheen Safi and Husna Shadab Zafer, this platform is built on a foundation of international standards. We believe in empowering students not just with information, but with the practical tools and community support needed to thrive.
          </p>
          <p className="pt-4 border-t border-neutral-800 text-neutral-400 text-sm">
            Powered by Safi AI | Integrated with our unified ecosystem.
          </p>
        </div>
      </div>
    </main>
  );
}