const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const Product = require("./models/product");
const cors = require("cors");
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");

app.use(cors());
app.options("*", cors());

require("dotenv/config");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(errorHandler);

//Routes to user
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");

const api = process.env.API_URL;

app.get("/", (req, res) => {
  console.log("Hi");
  res.send("App is ok");
});
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
console.log("hi");
app.listen(8000, () => {
  console.log(api);
  console.log("server is running on http://localhost:3000");
});
