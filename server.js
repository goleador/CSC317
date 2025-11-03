const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;
const publicDir = '.'; // Serve files from current directory

console.log(`Serving files from: ${path.resolve(publicDir)}`);

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    console.log(`Request: ${req.method} ${pathname}`);
    
    // Default to index.html if root is requested
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Remove leading slash and join with public directory
    const fileName = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const filePath = path.join(publicDir, fileName);
    
    console.log(`Looking for file: ${filePath}`);
    
    // Security check - ensure file is within public directory
    const resolvedPath = path.resolve(filePath);
    const resolvedPublicDir = path.resolve(publicDir);
    
    if (!resolvedPath.startsWith(resolvedPublicDir)) {
        console.log('Security violation - path outside public directory');
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        
        // File exists, read it
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(`Error reading file: ${err.message}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }
            
            // Determine content type
            const ext = path.extname(filePath).toLowerCase();
            const contentTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.txt': 'text/plain',
                '.jpg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif'
            };
            
            const contentType = contentTypes[ext] || 'application/octet-stream';
            
            console.log(`Serving ${filePath} (${data.length} bytes) as ${contentType}`);
            
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Content-Length': data.length
            });
            res.end(data);
        });
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`You can telnet to it with: telnet localhost ${port}`);
    console.log('Press Ctrl+C to stop');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
