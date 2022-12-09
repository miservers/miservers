const http = require('http');

const server = http.createServer (
    (request, response) => {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write ('<h1> First HTTP Node Server</h1>')
        response.write('Hello world!');
        response.end();
    }
);


server.listen(3000);

