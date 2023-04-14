import http from 'node:http';
import { URL } from 'node:url';
import counter from './counter.cjs';

function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === '/' && request.method === 'GET') {
        response.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                    <title>Exercise 2</title>
                </head>
                <body style="padding: 3rem">
                    <main>
                        <h1>Exercise 2 server</h1>
                        <form method="GET" action="/submit">
                            <select name="mode" class="form-select">
                                <option value="" selected>-</option>
                                <option value="sync">sync</option>
                                <option value="async">async</option>
                            </select>
                            <textarea name="command-list" class="form-control"></textarea>
                            <br>
                            <input type="submit" class="btn btn-primary" value="Submit">
                        </form>
                    </main>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
                </body>
            </html>
        `);

        response.end();
    }
    else if (url.pathname === '/submit' && request.method === 'GET') {
        const mode = url.searchParams.get('mode');
        const commandList = url.searchParams.get('command-list');
        let output = '';

        
        if (mode === 'sync') {
            output = `Current counter state: ${counter.countSync()}`;
        }
        else if (mode === 'async') {
            counter.countAsync().then(res => {
                output = `Current counter state: ${res}`;
                
                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                            <title>Exercise 2 - output</title>
                        </head>
                        <body style="padding: 3rem">
                            <output ${!mode ? 'style="font-family: monospace"' : ''}>
                                ${output}
                            </output>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
                        </body>
                    </html>
                `);
                response.end();
            });
        }
        else if (!mode) {
            const list = commandList.split('\n').map(command => command.trim());
            
            counter.exec(list).then(res => {
                output = res
                        .reduce((acc, curr) => acc + curr + '\n', '')
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");

                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                            <title>Exercise 2 - output</title>
                        </head>
                        <body style="padding: 3rem">
                            <output ${!mode ? 'style="font-family: monospace; white-space: pre"' : ''}>
                                ${output}
                            </output>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
                        </body>
                    </html>
                `);
                response.end();
            });
        }

        if (mode === 'sync') {
            response.write(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
                        <title>Exercise 2 - output</title>
                    </head>
                    <body style="padding: 3rem">
                        <output ${!mode ? 'style="font-family: monospace"' : ''}>
                            ${output}
                        </output>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
                    </body>
                </html>
            `);

            response.end();
        }
        

       
    }
    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}

const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');