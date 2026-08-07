const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = path.join(__dirname, 'frontend', 'Pages');
let foundIssues = false;

fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith('.html')) return;
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });
  
  $('h1, h2').each((i, el) => {
    const $parent = $(el).parent();
    const cls = $parent.attr('class') || '';
    
    if (cls.includes('grid') || cls.includes('flex-row')) {
      console.log(`Potential issue in ${f}: Heading inside ${cls}`);
      foundIssues = true;
    }
  });
});

if (!foundIssues) {
  console.log('No remaining issues found.');
}
