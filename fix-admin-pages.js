const fs = require('fs');

function fixAdminPage() {
  let content = fs.readFileSync('src/app/en/admin/page.tsx', 'utf8');
  content = content.replace(
    /<div className="min-h-screen bg-\[#050505\] p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">/,
    '<div className="bg-[#050505] p-4 sm:p-6 lg:p-8 font-sans overflow-x-hidden">'
  );
  
  // Also replace Admin Header (if any) because we now have a Sidebar and Mobile Header in Layout
  // Let's remove the "Admin Header" section if it exists, or at least keep it since it acts as top nav.
  
  fs.writeFileSync('src/app/en/admin/page.tsx', content);
}

fixAdminPage();
