import express from 'express'
import path from 'path';

interface Options {
    port: number,
    puiblic_path?: string;
}

export class Server {

    private app = express();
    private port: number;
    private puiblic_path: string;

    constructor(options: Options){
        const { port, puiblic_path = 'public' } = options;
        this.port = port;
        this.puiblic_path = puiblic_path;
        // this.port = options.port;
        // this.puiblic_path = options?.puiblic_path ?? 'public';
    }

    async start(){

        // ** Middleware
        this.app.use(express.static(this.puiblic_path));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.puiblic_path}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        });
    }
}