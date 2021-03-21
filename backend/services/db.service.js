const path = require('path');
const sqlite = require('sqlite3');
const util = require('util');
const minimist = require('minimist');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'retail-store-sqlite3.db');

class DbService {
  
  static instance;
  static SQL3;

  constructor() {
    const myDb = new sqlite.Database(DB_PATH);
    this.SQL3 = {
      run(...args) {
        return new Promise(function (resolve, reject) {
          myDb.run(...args, function (err) {
            if (err) reject(err);
            resolve(this);
          });
        });
      },
      get: util.promisify(myDb.get.bind(myDb)),
      all: util.promisify(myDb.all.bind(myDb)),
      exec: util.promisify(myDb.exec.bind(myDb)),
    };

    this.initDb();
  }

  static getInstance() {
    if (!DbService.instance) DbService.instance = new DbService();
    return DbService.instance;
  }

  async insertOrLookupCustomer(fullName) {
    const GET_CUSTOMER_QUERY = `SELECT id from Customer WHERE fullName = ?`;
    const INSERT_CUSTOMER_QUERY = `INSERT into Customer (fullName) VALUES(?)`;

    let result = await this.SQL3.get(GET_CUSTOMER_QUERY, fullName);
    if (result && result.id) {
      return result.id;
    } else {
      result = await this.SQL3.run(INSERT_CUSTOMER_QUERY, fullName);
      if (result && result.lastID) {
        return result.lastID;
      }
    }
  }

  async insertPurchase(customerId, itemName, price) {
    const INSERT_PURCHASE_QUERY = `INSERT into Purchase (customerId, itemName, price) VALUES(?,?,?)`;
    const result = await this.SQL3.run(
      INSERT_PURCHASE_QUERY,
      customerId,
      itemName,
      price
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }

  async getAllRecords() {
    const GET_ALL_RECORDS_QUERY = `
    SELECT
        Customer.id as 'customerId',
        Customer.fullName as 'customerName',
        Purchase.itemName as 'item',
        Purchase.price as 'price',
        Purchase.id as 'purchaseId' 
    FROM
        Customer 
        JOIN
          Purchase 
          ON (Customer.id = Purchase.customerId) 
    ORDER BY
        Purchase.id ASC
  `;

    const results = await this.SQL3.all(GET_ALL_RECORDS_QUERY);
    if (results && results.length) {
      return results;
    }
  }

  async initDb() {
    const BRANDS_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Brands(
        id VARCHAR(200),
        name INT(50),
        dateCreated TIMESTAMP
      );
    `;
    await this.SQL3.run(BRANDS_NEW_TABLE_QUERY);

    const TAGS_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Tags(
        id VARCHAR(200),
        name INT(50),
        dateCreated TIMESTAMP
      );
    `;
    await this.SQL3.run(TAGS_NEW_TABLE_QUERY);

    const PRODUCTS_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Products(
        id VARCHAR(200),
        name VARCHAR(500),
        description VARCHAR(500),
        quantity INT(50),
        price INT(50),
        barcode VARCHAR(200),
        brandId VARCHAR(200),
        dateCreated TIMESTAMP,
        dateUpdated TIMESTAMP,
        CONSTRAINT fk_brands
          FOREIGN KEY (brandId)
          REFERENCES Brands(id)

      );
    `;
    
    await this.SQL3.run(PRODUCTS_NEW_TABLE_QUERY);
    
    const PURCHASES_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Purchases(
        id VARCHAR(200),
        vendorFullName VARCHAR(500),
        vendorMobile VARCHAR(100),
        vendorAddress VARCHAR(500),
        quantity INT(50),
        price INT(50),
        barcode VARCHAR(200),
        dateCreated TIMESTAMP
      );
    `;
    await this.SQL3.run(PURCHASES_NEW_TABLE_QUERY);

    const INVOICES_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Invoices(
        id VARCHAR(200),
        userFullName VARCHAR(500),
        userMobile VARCHAR(500),
        userAddress VARCHAR(500),
        itemCount INT(50),
        discount INT(50),
        total INT(50),
        dateCreated TIMESTAMP
      );
    `;
    await this.SQL3.run(INVOICES_NEW_TABLE_QUERY);

    const SALES_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS Sales(
        id VARCHAR(200),
        invoiceId VARCHAR(200),
        productId VARCHAR(200),
        quantity INT(50),
        price INT(50),
        barcode VARCHAR(200),
        dateCreated TIMESTAMP,
        CONSTRAINT fk_invoices
          FOREIGN KEY (invoiceId)
          REFERENCES Invoices(id),
        CONSTRAINT fk_products
          FOREIGN KEY (productId)
          REFERENCES Products(id)
      );
    `;
    await this.SQL3.run(SALES_NEW_TABLE_QUERY);

    const PRODUCT_TAG_MAPS_NEW_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS ProductTagMaps(
        id VARCHAR(200),
        productId VARCHAR(200),
        tagId VARCHAR(200),
        dateCreated TIMESTAMP,
        CONSTRAINT fk_invoices
          FOREIGN KEY (tagId)
          REFERENCES Tags(id),
        CONSTRAINT fk_products
          FOREIGN KEY (productId)
          REFERENCES Products(id)
      );
    `;
    await this.SQL3.run(PRODUCT_TAG_MAPS_NEW_TABLE_QUERY);

    
  }

  // Products
  async insertNewProduct({id, name, quantity, price, barcode, dateCreated, dateUpdated}) {
    const INSERT_NEW_PRODUCT_QUERY = `
      INSERT into Products 
        (id, name, quantity, price, barcode, dateCreated, dateUpdated) 
        VALUES(?,?,?, ?, ?, ?, ?)
    `;
    const result = await this.SQL3.run(
      INSERT_NEW_PRODUCT_QUERY,
      id, 
      name, 
      quantity, 
      price, 
      barcode, 
      dateCreated, 
      dateUpdated,
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }

  async fetchAllProduct() {
    const PRODUCT_ALL_QUERY = `
      SELECT * FROM Products 
    `;
    const result = await this.SQL3.all(
      PRODUCT_ALL_QUERY
    );
    if (result && result.length) {
      return result;
    }
  }

  async findProductByBarcde(barcode) {
    const GET_PRODUCT_QUERY = `SELECT * from Products WHERE barcode = ?`;
    let result = await this.SQL3.get(GET_PRODUCT_QUERY, barcode);
    return result;
  }

  async updateProductByBarcode({id, name, description, quantity, price, barcode, brandId, dateUpdated}) {
    const UPDATE_PRODUCT_QUERY = `
      UPDATE Products
      SET name=?, description=?, quantity=?, price=?, brandId=?, dateUpdated=?
      WHERE barcode=?;
    `;
    let result = await this.SQL3.run(UPDATE_PRODUCT_QUERY, name, description, quantity, price, brandId, dateUpdated, barcode);
    
    if (result && result.lastID) {
      return result.lastID;
    }
    return result;
  }

  // Products
  async insertNewPurchase({id, vendorFullName, vendorMobile, vendorAddress, quantity, price, barcode, dateCreated}) {
    const INSERT_NEW_PURCHASE_QUERY = `
      INSERT into Purchases 
        (id, vendorFullName, vendorMobile, vendorAddress, quantity, price, barcode, dateCreated) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await this.SQL3.run(
      INSERT_NEW_PURCHASE_QUERY,
      id, 
      vendorFullName,
      vendorMobile,
      vendorAddress,
      quantity, 
      price, 
      barcode, 
      dateCreated
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }

  async fetchAllPurchases() {
    const PURCAHSES_ALL_QUERY = `
      SELECT * FROM Purchases 
    `;
    const result = await this.SQL3.all(
      PURCAHSES_ALL_QUERY
    );
    if (result && result.length) {
      return result;
    }
  }

  async findPurchasesByBarcode(barcode) {
    const GET_PURCHASES_BY_BARCODE_QUERY = `SELECT * from PURCHASES WHERE barcode = ?`;
    let result = await this.SQL3.all(GET_PURCHASES_BY_BARCODE_QUERY, barcode);
    return result;
  }

  async insertNewInvoice({id, userFullName, userMobile, userAddress, itemCount, grossTotal, gst, discount, netTotal, dateCreated}) {
    const INSERT_NEW_INVOICE_QUERY = `
      INSERT into Invoices 
        (id, userFullName, userMobile, userAddress, itemCount, grossTotal, gst, discount, netTotal, dateCreated) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await this.SQL3.run(
      INSERT_NEW_INVOICE_QUERY,
      id, 
      userFullName,
      userMobile,
      userAddress,
      itemCount, 
      grossTotal, 
      gst,
      discount,
      netTotal,
      dateCreated
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }

  async insertNewSalesEntry({id, invoiceId, productId, quantity, price, barcode, dateCreated}) {
    const INSERT_NEW_INVOICE_QUERY = `
      INSERT into Invoices 
        (id, invoiceId, productId, quantity, price, barcode, dateCreated) 
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await this.SQL3.run(
      INSERT_NEW_INVOICE_QUERY,
      id, 
      invoiceId,
      productId, 
      quantity, 
      price, 
      barcode, 
      dateCreated
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }
}

const dbServiceInstance = DbService.getInstance();

module.exports.DbService = dbServiceInstance;