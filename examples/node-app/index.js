const http = require('http');

function serverFn(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  res.end('Hello, World!');
}
        
const server = http.createServer(serverFn);

server.listen(3000, 'localhost', () => { console.log('Server is running') });
