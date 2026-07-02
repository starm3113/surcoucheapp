const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/api/salles') {
    const sallesDir = path.join(__dirname, 'salles');
    const dirs = fs.readdirSync(sallesDir).filter(f => fs.statSync(path.join(sallesDir, f)).isDirectory());
    const salles = dirs
      .filter(id => fs.existsSync(path.join(sallesDir, id, `${id}.svg`)) && fs.existsSync(path.join(sallesDir, id, `${id}.json`)))
      .map(id => ({
        id,
        nom: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        fichierSvg: `salles/${id}/${id}.svg`,
        fichierJson: `salles/${id}/${id}.json`
      }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(salles));
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found'); return;
  }

  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n✅ SeatMap lancé sur http://localhost:${PORT}\n`);
});
