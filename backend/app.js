const path = require('path')
// const Loki = require('lokijs');
const bodyParser = require('body-parser');
const express = require("express");
const { config } = require('./config/config');
const routes  = require('./app.routes') ;
// const { loadDatabase } = require('./utils/database-helpers');

// const db = new Loki(path.resolve(__dirname, './database.json'));
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/", routes);

app.listen(config.server.port, config.server.host, () => {
  console.log(`==============> Server started at ${config.server.host} on port ${config.server.port}!`);
});

module.exports = app;