const fs = require('fs');

function replaceSessionWithUser(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  content = content.replace(
    /const \{\s*data:\s*\{\s*session\s*\}\s*\} = await supabase\.auth\.getSession\(\);/g,
    'const { data: { user }, error: userError } = await supabase.auth.getUser();'
  );
  
  content = content.replace(
    /if \(session\) \{/g,
    'if (user && !userError) {'
  );
  
  content = content.replace(
    /session\.user\.id/g,
    'user.id'
  );
  
  fs.writeFileSync(path, content);
}

replaceSessionWithUser('src/app/en/dashboard/layout.tsx');
replaceSessionWithUser('src/app/en/teacher/layout.tsx');
replaceSessionWithUser('src/app/en/admin/layout.tsx');
