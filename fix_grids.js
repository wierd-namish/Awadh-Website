const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = path.join(__dirname, 'frontend', 'Pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });
  let modified = false;

  // Find containers that have both max-w-7xl and grid classes
  $('div[class*="max-w-7xl"], div[class*="max-w-5xl"], div[class*="max-w-6xl"]').each((i, el) => {
    const $container = $(el);
    const className = $container.attr('class') || '';
    
    // Check if it has grid classes
    if (className.includes('grid') && className.includes('lg:grid-cols-2')) {
      // It's a grid container!
      // Check if it has an h1 as a direct child
      const $h1 = $container.children('h1').first();
      
      if ($h1.length > 0) {
        // Yes, the h1 is inside the grid!
        console.log(`Fixing grid structure in ${path.basename(filePath)}`);
        
        // Remove grid classes from the container
        const newContainerClass = className
          .replace('grid', '')
          .replace('grid-cols-1', '')
          .replace('lg:grid-cols-2', '')
          .replace('gap-12', '')
          .replace('items-start', '')
          .replace('items-center', '')
          .replace(/\s+/g, ' ')
          .trim();
          
        $container.attr('class', newContainerClass);
        
        // Create an inner div with the grid classes
        const gridClasses = 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-start';
        const $innerGrid = $(`<div class="${gridClasses}"></div>`);
        
        // Move all children EXCEPT the h1 into the inner grid
        $container.children().each((j, child) => {
          if (child !== $h1[0]) {
            $(child).appendTo($innerGrid);
          }
        });
        
        // Append the inner grid to the container (so h1 is first, then the grid)
        $container.append($innerGrid);
        
        modified = true;
      }
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
