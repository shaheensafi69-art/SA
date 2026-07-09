const fs = require('fs');

function fixDashboard() {
  let content = fs.readFileSync('src/app/en/dashboard/layout.tsx', 'utf8');

  // Fix the syntax error area
  const regex = /\{([^}]*)\}\s*<div className="lg:hidden w-full flex items-center p-4 bg-black\/40 border-b border-white\/5 relative z-40">[\s\S]*?<button onClick=\{\(\) => setIsMobileMenuOpen\(!isMobileMenuOpen\)\} className="p-2 text-white">\s*\{isMobileMenuOpen \? <X size=\{24\} \/> : <Menu size=\{24\} \/>\}\s*<\/button>\s*<\/div>/m;
  
  content = content.replace(regex, 
    `{/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-black/40 border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white uppercase">Safi Academy</span>
        </div>
      </div>`
  );

  fs.writeFileSync('src/app/en/dashboard/layout.tsx', content);
}

function fixTeacher() {
  let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');

  const regex = /\{([^}]*)\}\s*<div className="lg:hidden w-full flex items-center p-4 bg-\[\#080808\] border-b border-white\/5 relative z-40">[\s\S]*?<button onClick=\{\(\) => setIsMobileMenuOpen\(!isMobileMenuOpen\)\} className="p-2 text-white">\s*\{isMobileMenuOpen \? <X size=\{24\} \/> : <Menu size=\{24\} \/>\}\s*<\/button>\s*<\/div>/m;

  content = content.replace(regex, 
    `{/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-[#080808] border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <span className="font-extrabold text-sm tracking-widest text-white uppercase">Safi Academy</span>
        </div>
      </div>`
  );

  fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
}

fixDashboard();
fixTeacher();
