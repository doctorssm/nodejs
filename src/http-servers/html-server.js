const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var readStream = fs.createReadStream('./src/public/index.html');

    readStream.on('data', (chunk) => {
        const content = chunk.toString().replace(/{message}/, 'Hello World');
        res.write(content)
    });

    readStream.on('error', (err) => {
        res.end(err);
    });

    readStream.on('end', () => res.end());
}).listen(5002);