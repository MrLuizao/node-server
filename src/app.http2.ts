
import http2 from 'http2';
import fs from 'fs';


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
} ,(req, resp)=>{
    
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