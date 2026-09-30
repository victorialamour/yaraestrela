// Servidor estático mínimo (com suporte a Range, necessário para vídeo) para pré-visualizar a landing.
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, path.normalize(p));
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404); return res.end('404'); }
    const type = types[path.extname(f)] || 'application/octet-stream';
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (m) {
      const s = m[1] ? +m[1] : 0, en = m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${s}-${en}/${st.size}`, 'Content-Length': en - s + 1 });
      fs.createReadStream(f, { start: s, end: en }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': st.size });
      fs.createReadStream(f).pipe(res);
    }
  });
}).listen(4173, () => console.log('http://localhost:4173'));
