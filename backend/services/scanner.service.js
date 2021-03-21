const getDevices = require('usb-barcode-scanner').getDevices;
const UsbScanner = require('usb-barcode-scanner').UsbScanner;
const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const port = 4001;
let connected = false;
let scanner;
const barCodeScannerInit = (socket) => {
  const devices = getDevices();
  const target = devices.find(({product}) => product === 'Barcode Scanner');

  try {
    scanner = new UsbScanner({
        vendorId: target.vendorId,
        productId: target.productId
    });
    
    scanner.on('data', (data) => {
      console.log("Scanner data: ", {data})
      socket.emit("BARCODE", {barcode: data});
    });
    
    scanner.startScanning();
    socket.emit("BARCODE", {isConnected: true});
  } catch (error) {
    socket.emit("BARCODE", {isConnected: false});
    setTimeout(() => {
      if (!connected) {
        console.log("======> clearing callbakcs as disconnected");
        return;
      }
      console.log(" ======> reconnecting to USB scanner")
      barCodeScannerInit(socket);
    }, 5000)
  }
  
}

function initSocketConnection() {
  const app = express();

  const server = http.createServer(app);

  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");
    connected = true;
    barCodeScannerInit(socket);
    
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      connected = false;
      scanner.stopScanning();
    });
  });

  server.listen(port, () => console.log(`==============> Socket Server listening on port ${port}`));
}

exports.initSocketConnection = initSocketConnection