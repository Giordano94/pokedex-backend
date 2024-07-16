import Express from 'express';

(async () => {
  const server = Express();

  server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();
