const fs = require('fs');
let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');

content = content.replace(
  'import { useEffect, useState } from "react";',
  'import { useEffect, useState } from "react";\nimport { Menu, X } from "lucide-react";'
);

content = content.replace(
  'const [instructor, setInstructor] = useState({ first_name: "Instructor", avatar: "" });',
  'const [instructor, setInstructor] = useState({ first_name: "Instructor", avatar: "" });\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

content = content.replace(
  '<div className="flex h-screen bg-[#020202] text-white overflow-hidden font-sans">',
  '<div className="flex flex-col lg:flex-row h-screen bg-[#020202] text-white overflow-hidden font-sans">\n      {/* Mobile Header */}\n      <div className="lg:hidden flex items-center justify-between p-4 bg-[#080808] border-b border-white/5">\n        <Link href="/en/teacher" className="flex items-center gap-3">\n          <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center">\n            <img src="/logo-without-b.png" alt="Safi Academy" className="w-5 h-5 object-contain" />\n          </div>\n          <span className="font-extrabold text-sm tracking-widest text-white uppercase">Safi Academy</span>\n        </Link>\n        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">\n          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}\n        </button>\n      </div>'
);

content = content.replace(
  '<aside className="w-[260px] bg-[#080808] border-r border-white/5 flex flex-col shrink-0 relative z-50">',
  '<aside className={`fixed lg:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out w-[260px] bg-[#080808] border-r border-white/5 flex flex-col shrink-0 z-50`}>'
);

fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
