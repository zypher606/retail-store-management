const { Router } = require("express");
const product = require("./endpoints/product/product.router");

const routes = Router();

routes.use("/product", product);

module.exports = routes;