const path = require("path");
const express = require("express");
const index = require("./src/index");
const app = express(); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 5000");
});

/*
const http = require('http'),
index        = require('./src/index'),
app = express();

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(index);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/