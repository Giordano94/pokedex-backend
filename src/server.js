import Express from 'express';
import { hostname, port } from './config/infra/environment.js'
import { setupMiddlewareRoutes } from './config/infra/middleware/setupRoutes.js'

(async () => {
    const server = Express();

    setupMiddlewareRoutes(server);

    server.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})();
