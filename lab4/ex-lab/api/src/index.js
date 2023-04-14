const http = require('node:http');
const { URL } = require('node:url');
const vehicles = require('./vehicles');

const requestListener = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/vehicles' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(JSON.stringify(vehicles.data));
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');