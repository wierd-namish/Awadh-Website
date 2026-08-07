const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'Pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We want to remove the section that contains the breadcrumb, OR just the breadcrumb div.
  // In `registration-hangglider.html`, the whole section is:
  // <section class="bg-gray-100 pt-36 pb-6 px-6 md:px-14 border-b"> ... </section>
  // In `gallery-photos.html`, the section also contains the h1.
  // We can just remove the div containing the Home link.
  
  const breadcrumbDivRegex = /<div[^>]*>\s*<a href="\.\.\/index\.html"[^>]*>Home<\/a>\s*<span[^>]*>\/<\/span>[\s\S]*?<\/div>/i;
  
  if (breadcrumbDivRegex.test(content)) {
    content = content.replace(breadcrumbDivRegex, '');
    
    // Clean up empty section if it's just spaces and maybe a container div
    // But it's safer to just let the empty section be, or clean up specific ones.
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      processFile(fullPath);
    }
  }
}

walkDir(pagesDir);
console.log('Done');
