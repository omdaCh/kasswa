const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const itemData = require('../server/data/items');

server.get('/api/items', (req, res, next) => {
  res.status(200).send(itemData.getItems);
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});