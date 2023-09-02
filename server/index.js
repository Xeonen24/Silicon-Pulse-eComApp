require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authController = require('./routes/authcontroller');
const productController = require('./routes/productcontroller');
const cartController = require('./routes/cartcontroller');
const adminController = require('./routes/admincontroller');
const orderController = require('./routes/ordercontroller');
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const session = require('express-session');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

  
  const cloudinaryConnect = () => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
    } catch (error) {
      console.log(error);
    }
  };

  cloudinaryConnect();

  app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(express.json());

  app.use(
    cors({
      origin: ["http://localhost:3000","https://silicon-pulse-e-com-app-sxp4.vercel.app", "http://localhost:5000" , "https://silicon-pulse-e-com-app-mu.vercel.app"],
      credentials: true,
    })
  );

  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);



app.use('/auth', authController);
app.use('/products', productController);
app.use('/cart', cartController);
app.use('/admin', adminController);
app.use('/order', orderController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});