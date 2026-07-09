const fs = require('fs');

let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');
content = content.replace(
  /{ name: "Trading Journals", path: "\/en\/teacher\/trading-journals", icon: "📈" }/g,
  '{ name: "Trading Journal", path: "/en/teacher/trading-journal", icon: "📈" }'
);
fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
