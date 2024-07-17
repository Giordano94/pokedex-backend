import Express from 'express';
import { hostname, port } from './config/infra/environment.js';
import { setupMiddlewareRoutes } from './config/infra/middleware/setupRoutes.js';
import cors from 'cors';

(async () => {
  const server = Express();
  server.use(cors('*'));
  setupMiddlewareRoutes(server);

  server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();
