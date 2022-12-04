const express = require("express");

const port = 8000
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require('/routes/users');
const bookRoutes = require("/routes/books");
const issuedRoutes = require("/routes/issued_book");




mongoose.connect('mongodb://localhost:27017/nodeprojectDB');
server.use(morgan("dev"));
server.use('/uploads',express.static('uploads'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use( cors() );


server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

server.use('/auth', authRoutes);

server.use(check_auth);

server.use("/books", bookRoutes);
server.use("/user", userRoutes);
server.use("/issue", issuedRoutes);


server.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

server.listen(port);
