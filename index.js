const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const {AuthRouter} = require("./routes/auth.routes");
const {CartRouter} = require("./routes/cart.routes");
const {ProductRouter} = require("./routes/product.routes");



const app = express();
const port = 3005;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

app.use("/users", AuthRouter);
app.use("/cart", CartRouter);
app.use("/products", ProductRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
