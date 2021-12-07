const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/**
 * RUTAS
 */
const users = require('./routes/userRoutes');

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.disable('x-powered-by');

/**
 * LLAMANDO A LAS RUTAS
 */
users(app);

server.listen(3000, '192.40.0.60' || 'localhost', function () {
  console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...');
});

//ERROR HANDLER

app.use((err, req, res, nexr) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server,
};

// 200- RESPUESTA EXITOSA
// 404 - LA URL NO EXISTE
//500  - ERROR INTERNO DEL SERVIDOR
