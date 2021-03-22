const getDevices = require('usb-barcode-scanner').getDevices;
const UsbScanner = require('usb-barcode-scanner').UsbScanner;
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 4001;

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);


  barCodeScannerInit(socket);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

const barCodeScannerInit = (socket) => {
  const devices = getDevices();
  const target = devices.find(({product}) => product === 'Barcode Scanner');
  console.log({target})
  let scanner = new UsbScanner({
      vendorId: target.vendorId,
      productId: target.productId
  });
  
  scanner.on('data', (data) => {
      socket.emit("BARCODE", {barcode: data});
  });
  
  scanner.startScanning();
}

server.listen(port, () => console.log(`Listening on port ${port}`));
 

// const devices = getDevices();
// const target = devices.find(({product}) => product === 'Barcode Scanner');
// console.log({target})
// let scanner = new UsbScanner({
//     vendorId: target.vendorId,
//     productId: target.productId
// });
 
// scanner.on('data', (data) => {
//     console.log(data);
// });
 
// scanner.startScanning();
