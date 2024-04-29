require('dotenv/config');
const app = require('../app');
const server = require('http').createServer(app);

const PORT = process.env.PORT || '3008';

const onListening = () => {
  console.log(`Listening on port: ${PORT}`);
}

server.listen(PORT, '0.0.0.0', onListening);
