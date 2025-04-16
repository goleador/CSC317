const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  res.setHeader('Content-Type', 'text/html');
  
  if (url === '/') {
    res.statusCode = 200;
    res.end('<h1>Home Page</h1>');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end('<h1>About Page</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000);
