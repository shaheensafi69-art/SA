export default function ContactPage() {
  return (
    <main className="min-h-screen p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8 text-center">Get in Touch</h1>
      
      <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
        <form className="space-y-6 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-400">Full Name</label>
              <input type="text" className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-400">Email Address</label>
              <input type="email" className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="you@example.com" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-400">Department</label>
            <select className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Finance & Payments</option>
              <option>Instructor Partnership</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-400">Message</label>
            <textarea rows={5} className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="How can we help you?"></textarea>
          </div>

          <button type="button" className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg transition-all mt-4">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}