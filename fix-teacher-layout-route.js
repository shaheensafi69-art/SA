const fs = require('fs');
let content = fs.readFileSync('src/app/en/teacher/layout.tsx', 'utf8');

// Close menu when path changes
content = content.replace(
  'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);',
  'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  useEffect(() => {\n    setIsMobileMenuOpen(false);\n  }, [pathname]);'
);

fs.writeFileSync('src/app/en/teacher/layout.tsx', content);
