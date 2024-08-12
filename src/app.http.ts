
import http from 'http';
import fs from 'fs';


const server = http.createServer((req, resp)=>{

    console.log(req.url);
    
    // resp.writeHead(200, {'Content-Type': 'text/html'});
    // resp.write('<strong> Hello world! <strong>');
    // resp.end();

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.end(htmlFile);
    }else{
        resp.writeHead(404, {'Content-Type': 'text/html'});
        resp.end();
    }

});

server.listen(8080, ()=>{
    console.log('server runnig on port 8080');
});