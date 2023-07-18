const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const USER = require("../model/user");
const Product = require("../model/product");
const Category = require("../model/category");
const auth = require("../midddleware/auth");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");
const validator = require('validator');
router.use(cookieParser());

router.post("/signup", asyncHandler(async (req, res) => {
  const { username, email, password, password2 } = req.body;
  if (!username || !email || !password || !password2) {
    return res.status(403).json({ error: "Please fill in all details" });
  }
  try {
    const userExists = await USER.findOne({ username: username });
    const emailExists = await USER.findOne({ email: email });
    if (userExists || emailExists) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password !== password2) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else if (!email || validator.isEmail.email){
      return res.status(422).json({ error: "Email address is not valid" });
    } else {
      const user = new USER({
        username,
        email,
        password,
        password2,
      });
      await user.save();
      res.status(201).json({ message: "User registered" });
    }
  } catch (err) {
    const errors = {};
    if (err.errors) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
    }
    console.log(errors);
    res.status(422).json({ errors });
  }
}));


router.post("/login",
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
  res.clearCookie("jwtoken", {
    path: '/',
    domain: 'localhost'
  });
  res.status(200).json({ message: "User signed out" });
});

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

router.post("/update-profile", auth, asyncHandler(async (req, res) => {
  try {
    const finduser = await USER.findById(req.userID);
    if (finduser) {
      const { newusername, previousPassword, newPassword } = req.body;

      const existingUser = await USER.findOne({ username: newusername });
      if (existingUser) {
        return res.status(422).json({ error: "Username already exists" });
      }

      if (previousPassword !== finduser.password) {
        return res.status(422).json({ error: "Incorrect previous password" });
      } else {
        finduser.username = newusername;
        finduser.password = newPassword;
        finduser.password2 = newPassword;
        await finduser.save();
        res.status(201).send("Profile updated successfully");
        console.log("User profile updated");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}));

router.put("/update-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    const user = await USER.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await USER.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/categories", (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(error => {
      res.status(500).json({ error: "Error fetching categories" });
    });
});

router.post('/cart/add', auth, asyncHandler(async (req, res) => {
  try {

    const { productId , quantity} = req.body;
    const user = await USER.findById(req.userID);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const myid = new mongoose.Types.ObjectId(productId);
    const existingCartItem = user.cart.find((item) => item.product.equals(myid));

    if (existingCartItem) {
      await USER.findByIdAndUpdate(req.userID, {
        $inc: { "cart.$[elem].quantity": quantity }
      }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
    } else {
      user.cart.push({ product: productId, quantity });
      await user.save();
    }

    const updatedUser = await USER.findById(req.userID);

    res.json({ message: 'Product added to cart', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.post('/cart/inc', auth, asyncHandler(async (req, res) => {
  try {

    const { productId , quantity} = req.body;

    const user = await USER.findById(req.userID);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const myid = new mongoose.Types.ObjectId(productId);

    const existingCartItem = user.cart.find((item) => item.product.equals(myid));

    console.log("yolo", existingCartItem);

    if (existingCartItem) {
      await USER.findByIdAndUpdate(req.userID, {
        $inc: { "cart.$[elem].quantity": quantity }
      }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
    } else {
      user.cart.push({ product: productId, quantity });
      await user.save();
    }

    const updatedUser = await USER.findById(req.userID);

    res.json({ message: 'Product added to cart', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.post('/cart/dec', auth, asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await USER.findById(req.userID);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const myid = new mongoose.Types.ObjectId(productId);


    const existingCartItem = user.cart.find((item) => item.product.equals(myid));

    console.log("yolo", existingCartItem);

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity - 1;
      if (newQuantity <= 0) {
        // Remove the item from the cart if the new quantity is zero or negative
        await USER.findByIdAndUpdate(req.userID, {
          $pull: { cart: { product: existingCartItem.product } }
        });
      } else {
        // Update the quantity of the existing item
        await USER.findByIdAndUpdate(req.userID, {
          $set: { "cart.$[elem].quantity": newQuantity }
        }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
      }
    } else {
      // Add the item to the cart
      user.cart.push({ product: productId, quantity: 1 });
      await user.save();
    }

    const updatedUser = await USER.findById(req.userID);

    res.json({ message: 'Product added to cart', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));


router.get('/cart',auth , asyncHandler(async (req, res) => {
  try {
    const user = await USER.findById(req.userID).populate('cart.product');

    res.json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.delete('/cart/remove/:productId', auth, asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await USER.findById(req.userID);
    const productIndex = user.cart.findIndex(item => item.product._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    user.cart.splice(productIndex, 1);
    await user.save();

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.delete('/cart/remove-all', auth, asyncHandler(async (req, res) => {
  try {
    const user = await USER.findById(req.userID);

    if (user.cart.length === 0) {
      return res.status(404).json({ error: 'Cart is already empty' });
    }

    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.post('/cart/add', auth, asyncHandler(async (req, res) => {
  try {

    const { productId , quantity} = req.body;

    const user = await USER.findById(req.userID);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const myid = new mongoose.Types.ObjectId(productId);

    const existingCartItem = user.cart.find((item) => item.product.equals(myid));

    console.log("yolo", existingCartItem);

    if (existingCartItem) {
      await USER.findByIdAndUpdate(req.userID, {
        $inc: { "cart.$[elem].quantity": quantity }
      }, { arrayFilters: [{ "elem.product": existingCartItem.product }] });
    } else {
      user.cart.push({ product: productId, quantity });
      await user.save();
    }

    const updatedUser = await USER.findById(req.userID);

    res.json({ message: 'Product added to cart', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.post('/add-product', asyncHandler(async (req, res) => {
  try {
    const { title , description , price , available , 
      category , manufacturer , discountprice , productCode , imagePath ,  } = req.body;

    if( !title || !description || !price || !available || !category || !manufacturer 
      || !discountprice || !productCode || !imagePath){
        return res.status(422).json({ error: 'Please add all the fields' });
      }

    const newproduct = new Product({
      title , description , price , available ,
      category , manufacturer , discountprice , productCode , imagePath
    });

    const product = await newproduct.save();

    return res.status(201).json({ message: 'Product added successfully' , product });


  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error in add cart' });
  }
}));

router.put('/update-product/:productId', async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/user-role', auth, (req, res) => {
  try {
    const userRole = req.rootUser.role;
    res.status(200).json({ role: userRole });
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch user role' });
    console.log(err);
  }
});

router.get('/get-users', auth, asyncHandler(async (req, res) => {
  try {
    const users = await USER.find();

    res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Unable to fetch users' });
  }
}))

router.delete('/cart/remove-all', auth, asyncHandler(async (req, res) => {
  try {
    const user = await USER.findById(req.userID);

    if (user.cart.length === 0) {
      return res.status(404).json({ error: 'Cart is already empty' });
    }

    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

module.exports = router;
