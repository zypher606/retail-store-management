const { Router } = require("express");
const { getProductControllerInstance } = require('./product.controller')

const routes = Router();
const productControllerInstance = getProductControllerInstance();

routes.use("/add", productControllerInstance.add);
routes.post("/addNewProduct", productControllerInstance.addProductWithVendorDetails);
routes.post("/addPurchase", productControllerInstance.addPurchase);
routes.get("/all", productControllerInstance.fetchAllProduct);

module.exports = routes;