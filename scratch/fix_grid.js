const fs = require('fs');
let html = fs.readFileSync('../frontend/Pages/terms-and-conditions.html', 'utf8');

// Replace the grid container to add items-start
html = html.replace(
  'class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"',
  'class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 items-start"'
);

// Remove the h-full relative class from all the cards so they don't stretch vertically
html = html.replace(/h-full relative/g, 'relative');

fs.writeFileSync('../frontend/Pages/terms-and-conditions.html', html);
console.log('Fixed');
