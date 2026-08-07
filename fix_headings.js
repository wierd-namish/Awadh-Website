const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = path.join(__dirname, 'frontend', 'Pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Use cheerio to parse the DOM
  const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });
  
  let modified = false;

  // Find the gray section (typically bg-gray-100 and pt-36/32)
  const graySections = $('section[class*="bg-gray-100"]');
  
  graySections.each((i, el) => {
    const $section = $(el);
    const className = $section.attr('class') || '';
    if (className.includes('pt-36') || className.includes('pt-32')) {
      // Find the main heading in this section
      const $heading = $section.find('h1, h2').first();
      
      if ($heading.length > 0) {
        // We found a heading to move!
        // We should move this heading to the NEXT section.
        
        // Let's get the text and original classes
        const headingHtml = $.html($heading);
        let adjustedHeading = headingHtml;
        
        // Add mb-6 if not present
        if (!adjustedHeading.includes('mb-6') && !adjustedHeading.includes('mb-10')) {
          adjustedHeading = adjustedHeading.replace('class="', 'class="mb-6 tracking-tight ');
        }
        if (adjustedHeading.includes('text-4xl')) {
            adjustedHeading = adjustedHeading.replace('text-4xl', 'text-4xl md:text-5xl');
        } else if (adjustedHeading.includes('text-3xl')) {
            adjustedHeading = adjustedHeading.replace('text-3xl', 'text-3xl md:text-4xl');
        }

        // Remove heading from gray section
        $heading.remove();
        
        // Find the next section element
        const $nextSection = $section.nextAll('section').first();
        if ($nextSection.length > 0) {
          // Inside the next section, find a good place to prepend the heading.
          // Usually there is a max-w container.
          let $container = $nextSection.find('div[class*="max-w-"]').first();
          if ($container.length === 0) {
            $container = $nextSection; // Fallback
          }
          
          // Let's try to prepend it inside the container, OR if there's an inner grid/flex container, before it.
          // Prepending it directly to the container is safest.
          $container.prepend('\n      ' + adjustedHeading + '\n');
          modified = true;
          console.log(`Moved heading for ${path.basename(filePath)}`);
        }
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
