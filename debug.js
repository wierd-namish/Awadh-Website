const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('frontend/Pages/ame-b1-2-mechanical.html', 'utf8');
const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });

const graySections = $('section[class*="bg-gray-100"]');
console.log('gray sections found:', graySections.length);

graySections.each((i, el) => {
  const $section = $(el);
  const className = $section.attr('class') || '';
  console.log('class:', className);
  
  if (className.includes('pt-36') || className.includes('pt-32')) {
    const $heading = $section.find('h1, h2').first();
    console.log('heading found:', $heading.length);
    
    if ($heading.length > 0) {
      const $nextSection = $section.nextAll('section').first();
      console.log('next section found:', $nextSection.length);
      
      if ($nextSection.length > 0) {
        let $container = $nextSection.find('div[class*="max-w-"]').first();
        console.log('container found:', $container.length);
      }
    }
  }
});
