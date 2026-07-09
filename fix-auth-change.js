const fs = require('fs');

function fixAuth(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    /if \(event === 'SIGNED_OUT' \|\| !session\) \{/g,
    `if (event === 'SIGNED_OUT') {`
  );
  fs.writeFileSync(path, content);
}

fixAuth('src/app/en/dashboard/layout.tsx');
fixAuth('src/app/en/teacher/layout.tsx');
fixAuth('src/app/en/admin/layout.tsx');
