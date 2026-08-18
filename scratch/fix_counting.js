const fs = require('fs');
const cheerio = require('cheerio');
const file = '../frontend/Pages/terms-and-conditions.html';
let html = fs.readFileSync(file, 'utf8');
const $ = cheerio.load(html);

$('h2 span').each((i, el) => {
    let text = $(el).text();
    text = text.replace(/^\d+\./, (i + 1) + '.');
    $(el).text(text);
});

fs.writeFileSync(file, $.html());
console.log('Counting corrected');
