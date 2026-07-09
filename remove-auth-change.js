const fs = require('fs');

function removeListener(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Replace the onAuthStateChange block with an empty string
  content = content.replace(
    /const \{\s*data:\s*\{\s*subscription\s*\}\s*\} = supabase\.auth\.onAuthStateChange\(\(event, session\) => \{\s*if \(event === 'SIGNED_OUT'\) \{\s*router\.replace\("\/en\/login"\);\s*\}\s*\}\);\s*return \(\) => \{\s*subscription\.unsubscribe\(\);\s*\};/m,
    ''
  );
  
  fs.writeFileSync(path, content);
}

removeListener('src/app/en/dashboard/layout.tsx');
removeListener('src/app/en/teacher/layout.tsx');
removeListener('src/app/en/admin/layout.tsx');
