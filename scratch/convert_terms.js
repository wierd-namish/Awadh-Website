const fs = require('fs');
const cheerio = require('cheerio');

const htmlFile = '../frontend/Pages/terms-and-conditions.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const $ = cheerio.load(html);

// Process the space-y-8 container
const container = $('.space-y-8.text-gray-700');

// Create a new container
const newContainer = $('<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"></div>');

container.children('div').each((i, el) => {
    const title = $(el).find('h2').text().trim();
    const ul = $(el).find('ul').html();
    
    const card = `
<div class="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-[#005F86]/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative">
  <h2 class="text-base font-bold text-[#005F86] group-hover:text-[#ff4301] transition-colors flex justify-between items-start relative z-10">
    <span class="pr-4 leading-tight">${title}</span>
    <i class="fas fa-chevron-down text-gray-400 group-hover:text-[#ff4301] group-hover:rotate-180 transition-transform duration-300 mt-1"></i>
  </h2>
  <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
    <div class="overflow-hidden">
      <ul class="list-disc pl-5 text-gray-600 space-y-2 text-xs md:text-sm mt-3 pt-3 border-t border-gray-100">
        ${ul}
      </ul>
    </div>
  </div>
</div>`;
    newContainer.append(card);
});

// Replace the old container with the new one
container.replaceWith(newContainer);

fs.writeFileSync(htmlFile, $.html());
console.log('Done!');
