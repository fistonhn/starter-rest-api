const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const feedbackRoute = require("./routes/Feedback");
const stripeRoute = require("./routes/stripe");
var bodyParser = require('body-parser')
const cors = require("cors");
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
 //app.use(bodyParser.json())
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull!🎉"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/feedbacks", feedbackRoute);
app.use("/api/checkout", stripeRoute);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./build/', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running🏃");
});

