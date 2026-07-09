const fs = require('fs');

let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');
content = content.replace(
  /<div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center shadow-\[0_0_15px_rgba\(192,38,211,0\.3\)\] group-hover:scale-105 transition-transform">\s*<img src="\/logo-without-b\.png" alt="Safi Academy" className="w-6 h-6 object-contain" \/>\s*<\/div>/g,
  `<div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
      <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
   </div>`
);
fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
