const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'Pages');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the gray section up to the closing </section>
  // It usually has bg-gray-100 and pt- something. 
  const graySectionRegex = /<section[^>]*class="[^"]*bg-gray-100[^"]*pt-\d+[^"]*"[^>]*>([\s\S]*?)<\/section>/i;
  const match = content.match(graySectionRegex);

  if (match) {
    const graySectionContent = match[1];
    
    // Find h1 or h2 inside the gray section
    const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i;
    const headingMatch = graySectionContent.match(headingRegex);

    if (headingMatch) {
      const fullHeading = headingMatch[0];
      const headingText = headingMatch[2].trim();
      
      // Remove the heading from the gray section
      let newGraySectionContent = graySectionContent.replace(fullHeading, '');
      
      // Now find the NEXT section
      const afterGraySectionIndex = match.index + match[0].length;
      const contentAfter = content.substring(afterGraySectionIndex);
      
      const nextSecStartRegex = /<section[^>]*>\s*<div[^>]*>\s*(?:<div[^>]*>)?/i;
      
      const nextSecStartMatch = contentAfter.match(nextSecStartRegex);
      
      if (nextSecStartMatch) {
          // Check if we ALREADY moved a heading here (prevent duplicate runs)
          // Also check if the exact heading already exists in the next section
          const alreadyHasHeadingRegex = new RegExp(`<h[1-6][^>]*>\\s*${headingText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\/h[1-6]>`, 'i');
          if (alreadyHasHeadingRegex.test(contentAfter.substring(0, 1500))) {
              console.log(`Heading already moved in ${filePath}, skipping...`);
              return;
          }

          // Replace the old gray section with the new one
          let newContent = content.substring(0, match.index) + 
                           match[0].replace(graySectionContent, newGraySectionContent) + 
                           contentAfter;

          const insertPos = match.index + match[0].replace(graySectionContent, newGraySectionContent).length + nextSecStartMatch.index + nextSecStartMatch[0].length;
          
          // Adjust heading classes
          let adjustedHeading = fullHeading;
          if (!adjustedHeading.includes('mb-6') && !adjustedHeading.includes('mb-12') && !adjustedHeading.includes('mb-8')) {
              adjustedHeading = adjustedHeading.replace('class="', 'class="mb-6 tracking-tight ');
          }
          if (adjustedHeading.includes('text-4xl')) {
              adjustedHeading = adjustedHeading.replace('text-4xl', 'text-4xl md:text-5xl');
          } else if (adjustedHeading.includes('text-3xl')) {
              adjustedHeading = adjustedHeading.replace('text-3xl', 'text-3xl md:text-4xl');
          }

          newContent = newContent.substring(0, insertPos) + 
                       '\n        ' + adjustedHeading + '\n' + 
                       newContent.substring(insertPos);
                       
          fs.writeFileSync(filePath, newContent);
          console.log(`Updated heading in ${filePath}`);
      } else {
          console.log(`Could not find where to insert in ${filePath}`);
      }
    } else {
        // console.log(`No heading found in gray section for ${filePath}`);
    }
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
