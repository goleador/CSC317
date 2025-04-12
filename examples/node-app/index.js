const http = require('http');

function serverFn(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  res.end('Hello, World!');
}
        
const server = http.createServer(serverFn);

const PORT = process.env.PORT || 3000;
server.listen(PORT, 'localhost', () => { console.log('Server is running') });

