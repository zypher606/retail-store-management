const { ResponseUtil } = require('../../utils/response.util');
const { DbService } = require('../../services/db.service');
const { v4: uuidv4 } = require('uuid');

let ProductControllerInstance;

class ProductController {

  add = async (req, res) => {
        
    const library = await userService.getMyLibrary(req);
    
    let board = req.body;
    board.library_id = library.id;

    board = new this.boardModel(board);
    board = await board.save();

    res.status(200).send(new ResponseUtil(200, 'Board created successfully!!', board));
  }

  addProductWithVendorDetails = async (req, res) => {
    
    const payload = req.body;

    if (!payload.barcode) {
      res.status(401).send(new ResponseUtil(401, 'Invalid barcide!!'));
      return;
    }

    const product = {
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
      quantity: payload.quantity,
      price: payload.mrp,
      barcode: payload.barcode,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    }
    
    const purchase = {
      id: uuidv4(),
      vendorFullName: payload.vendorName,
      vendorMobile: payload.vendorMobile,
      vendorAddress: payload.vendorAddress,
      quantity: payload.quantity,
      price: payload.buyingPrice,
      barcode: payload.barcode,
      dateCreated: Date.now(),
    } 

    await DbService.insertNewPurchase(purchase);
    const existingProduct = await DbService.findProductByBarcde(product.barcode);
    if (existingProduct) {
      await DbService.updateProductByBarcode({
         ...existingProduct,
         quantity: existingProduct.quantity + purchase.quantity,
         dateUpdated: Date.now()
      })
    } else {
      await DbService.insertNewProduct(product);
    }
    res.status(200).send(new ResponseUtil(200, 'Product created successfully!!'));
  }

  addPurchase = async (req, res) => {
    const product = req.body;
  }

  updateProductInStore = () => {}

  fetchAllProductsWithVendorData = () => {}

  fetchAllProduct = async (req, res) => {
    let result = await DbService.fetchAllProduct();
    if (result) {
      result = await Promise.all(result.map(async (product) => {
        product.vendors = [];
        const vendors = await DbService.findPurchasesByBarcode(product.barcode);
        if (vendors && vendors.length) {
          product.vendors = vendors;
        }
        return product;
      }));
    }
    res.status(200).send(new ResponseUtil(200, 'Results fetched successfully!!', result));
  }

}

function getProductControllerInstance() {
  ProductControllerInstance = ProductControllerInstance || new ProductController();
  return ProductControllerInstance;
}

exports.getProductControllerInstance = getProductControllerInstance;