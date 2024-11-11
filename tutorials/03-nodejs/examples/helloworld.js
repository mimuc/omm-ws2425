const http = require('http');
const port = 8976;
const host = '127.0.0.1';

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
});
server.listen(port, host);
console.log(`Server running at http://${host}:${port}/`);
