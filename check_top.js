const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'frontend', 'Pages');

fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith('.html')) return;
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const idx = c.indexOf('id="header-container"');
  if (idx === -1) return;
  
  const sub = c.substring(idx);
  const match = sub.match(/class="([^"]+)"/);
  
  if (match) {
    const cls = match[1];
    if (!cls.includes('pt-36') && !cls.includes('pt-40') && !cls.includes('pt-32')) {
      console.log(`${f} first class: ${cls}`);
    }
  }
});
