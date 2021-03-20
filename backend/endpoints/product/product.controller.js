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
    
    let product = req.body;
    product.id = uuidv4();
    product.dateCreated = Date.now();
    product.dateUpdated = Date.now();

    await DbService.insertNewProduct(product);
    res.status(200).send(new ResponseUtil(200, 'Product created successfully!!', product));
  }

  updateProductInStore = () => {}

  fetchAllProductsWithVendorData = () => {}


}

function getProductControllerInstance() {
  ProductControllerInstance = ProductControllerInstance || new ProductController();
  return ProductControllerInstance;
}

exports.getProductControllerInstance = getProductControllerInstance;