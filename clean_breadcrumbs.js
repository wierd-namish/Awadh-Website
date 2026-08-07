const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = path.join(__dirname, 'frontend', 'Pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });
  
  let modified = false;

  const graySections = $('section[class*="bg-gray-100"]');
  
  graySections.each((i, el) => {
    const $section = $(el);
    const className = $section.attr('class') || '';
    if (className.includes('pt-36') || className.includes('pt-32')) {
      // Find the div containing the hardcoded breadcrumb.
      // Usually looks like: <div class="mt-4 md:mt-0 text-sm font-semibold text-gray-500"> <a href="../index.html">Home</a> ... </div>
      // Let's just find any link to index.html with text "Home" inside this section
      const $homeLink = $section.find('a').filter((i, a) => {
        return $(a).text().trim().toLowerCase() === 'home';
      });

      if ($homeLink.length > 0) {
        // The breadcrumb container is usually the parent div
        const $breadcrumbContainer = $homeLink.parent('div');
        if ($breadcrumbContainer.length > 0) {
          $breadcrumbContainer.remove();
          modified = true;
          console.log(`Removed hardcoded breadcrumb from ${path.basename(filePath)}`);
        }
      }
      
      // Also, if the section's inner div is now empty, let's keep the structure but it will naturally collapse to 0 height besides padding.
      // We don't need to do anything else.
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, $.html());
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
