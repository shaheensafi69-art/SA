const fs = require('fs');
let content = fs.readFileSync('src/app/en/dashboard/layout.tsx', 'utf8');

content = content.replace(
  'import { useEffect, useState } from "react";',
  'import { useEffect, useState } from "react";\nimport { Menu, X } from "lucide-react";'
);

content = content.replace(
  'const [userProfile, setUserProfile] = useState<any>(null);',
  'const [userProfile, setUserProfile] = useState<any>(null);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

content = content.replace(
  '<div className="min-h-screen bg-[#050505] flex items-start text-white font-sans overflow-hidden">',
  '<div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row items-start text-white font-sans overflow-hidden">\n      {/* Mobile Header */}\n      <div className="lg:hidden w-full flex items-center justify-between p-4 bg-black/40 border-b border-white/5 relative z-50">\n        <Link href="/en/dashboard" className="flex items-center gap-3">\n          <div className="w-8 h-8 flex items-center justify-center">\n            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />\n          </div>\n          <span className="font-bold text-sm tracking-tight text-white">Safi Academy</span>\n        </Link>\n        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">\n          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}\n        </button>\n      </div>'
);

content = content.replace(
  '<aside className="w-72 bg-black/40 border-r border-white/5 backdrop-blur-3xl flex flex-col relative z-10 hidden lg:flex h-screen shrink-0">',
  '<aside className={`fixed lg:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-black/90 lg:bg-black/40 border-r border-white/5 backdrop-blur-3xl flex flex-col z-50 h-screen shrink-0`}>'
);

// Close menu when path changes
content = content.replace(
  'const pathname = usePathname();',
  'const pathname = usePathname();\n  useEffect(() => {\n    setIsMobileMenuOpen(false);\n  }, [pathname]);'
);

fs.writeFileSync('src/app/en/dashboard/layout.tsx', content);
