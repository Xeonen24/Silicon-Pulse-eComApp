const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const USER = require("../model/user");
const Product = require("../model/product");
const Category = require("../model/category");
const auth = require("../midddleware/auth");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if (!username || !email || !password || !password2) {
      return res.status(403).json({ error: "Fill in fields missing" });
    }
    try {
      const userExists = await USER.findOne({ email: email });
      if (userExists) {
        return res.status(422).json({ error: "User already exists" });
      } else if (password !== password2) {
        return res.status(422).json({ error: "Password do not match" });
      } else {
        const user = new USER({
          username,
          email,
          password,
          password2,
        });
        await user.save();
      }
      res.status(201).json({ message: "User registered" });
    } catch (err) {
      console.log(err);
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      let token;
      const { username, password } = req.body;
      let userSignin = await USER.findOne({ username });
      if (userSignin) {
        if (password !== userSignin.password) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        token = await userSignin.generateAuthToken();
        userSignin.tokens.push({ token });
        await userSignin.save();
        res.header("Access-Control-Allow-Credentials", true);
        res.cookie("jwtoken", token, {
          maxAge: 99999999999,
          httpOnly: false,
          SameSite: "Lax",
          secure: false,
        });
        res.status(200).json({ message: "User signed in" });
        console.log("User signed in");
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to sign in" });
    }
  })
);

router.post('/logout', async (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).json({ message: "User signed out" });
})



router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/products/:id", asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const categoryName = product.category.title;
    const productWithCategory = { ...product.toObject(), category: categoryName };

    res.json(productWithCategory);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));

router.get("/user",auth, async (req, res) => {
  try {
    const user = await USER.findById(req.userID).select('-password -password2');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/update-password",auth, asyncHandler(async (req, res) => {
    try {
      const finduser = await USER.findById(req.userID);
      if (finduser) {
        const { password, password2 } = req.body;
        if (password !== password2) {
          return res.status(422).json({ error: "Password do not match" });
        } else {
          finduser.password = password;
          finduser.password2 = password2;
          await finduser.save();
          res.status(201).send("Password updated successfully");
          console.log("User updated password");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update password" });
    }
  })
);

router.get("/categories", (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(error => {
      res.status(500).json({ error: "Error fetching categories" });
    });
});


module.exports = router;
