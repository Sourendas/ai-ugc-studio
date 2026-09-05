// Zero-dependency local server. Run: npm start
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function safeResolve(requestPath) {
  // Only allow relative paths; reject anything that tries to escape the root.
  const decoded = decodeURIComponent(requestPath.split('?')[0].split('#')[0]);
  // Normalize to forward slashes and reject any '..' segment so we never
  // walk out of the project, regardless of how the OS collapses paths.
  const slashed = decoded.replace(/\\/g, '/');
  const segments = slashed.split('/').filter((seg) => seg !== '' && seg !== '.');
  for (const seg of segments) {
    if (seg === '..') return null;
  }
  const normalized = segments.join(path.sep);
  const resolved = path.resolve(root, normalized);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  return resolved;
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const target = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = safeResolve(target);
  if (!file) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404);
      return res.end('Not found');
    }
    fs.readFile(file, (error, content) => {
      if (error) { res.writeHead(500); return res.end('Server error'); }
      res.writeHead(200, {
        'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(content);
    });
  });
}).listen(port, () => console.log(`Ayra Studio is running at http://localhost:${port}`));
