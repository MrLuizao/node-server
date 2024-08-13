import express, { Router } from 'express'
import path from 'path';

interface Options {
    routes: Router;
    port: number,
    puiblic_path?: string;
}

export class Server {

    private app = express();
    private port: number;
    private puiblic_path: string;
    private routes: Router;

    constructor(options: Options){
        const { routes, port, puiblic_path = 'public' } = options;
        this.routes = routes;
        this.port = port;
        this.puiblic_path = puiblic_path;
        // this.port = options.port;
        // this.puiblic_path = options?.puiblic_path ?? 'public';
    }

    async start(){

        // ** Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        // ** Public Folder
        this.app.use(express.static(this.puiblic_path));

        // ** ROUTES
        this.app.use(this.routes)

        // ** SPA (app-routing)
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.puiblic_path}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        });
    }
}