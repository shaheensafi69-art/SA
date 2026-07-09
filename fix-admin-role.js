const fs = require('fs');
let content = fs.readFileSync('src/app/en/admin/layout.tsx', 'utf8');
content = content.replace(
  /if \(profile.role !== "admin"\)/,
  'if (profile.role !== "admin" && profile.role !== "super_admin")'
);
fs.writeFileSync('src/app/en/admin/layout.tsx', content);
