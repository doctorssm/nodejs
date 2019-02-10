const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const content = fs.readFileSync('./src/public/index.html').toString();
    const parsedContent = content.replace(/{message}/, 'Hello World');

    res.end(parsedContent);
}).listen(5002);