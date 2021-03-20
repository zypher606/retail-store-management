const { Router } = require("express");
const { getProductControllerInstance } = require('./product.controller')

const routes = Router();
const productControllerInstance = getProductControllerInstance();

routes.use("/add", productControllerInstance.add);
routes.post("/addNewProduct", productControllerInstance.addProductWithVendorDetails);

module.exports = routes;