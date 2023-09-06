const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const auth = require('../midddleware/auth');
const Product = require('../model/product');
const Rating = require('../model/ratingAndReviews');
const USER = require('../model/user');
const Category = require('../model/category');

const router = express.Router();

router.get("/categories", (req, res) => {
  Category.find()
    .then(categories => {
      res.json(categories);
    })
    .catch(error => {
      res.status(500).json({ error: "Error fetching categories" });
    });
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('ratingAndReviews');

    const productsWithAverage = products.map(product => {
      const ratings = product.ratingAndReviews.map(review => review.rating);
      const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

      return {
        ...product.toObject(),
        averageRating: isNaN(averageRating) ? 0 : averageRating,
      };
    });

    res.json(productsWithAverage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getSpecRating/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate('ratingAndReviews');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const ratings = product.ratingAndReviews.map(review => review.rating);
    const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;

    const productWithAverage = {
      ...product.toObject(),
      averageRating: isNaN(averageRating) ? 0 : averageRating,
    };

    res.json(productWithAverage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/products/:id", asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).populate("category").populate('ratingAndReviews');

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let categoryName = "";
    if (product.category) {
      categoryName = product.category.title;
    }

    const productWithCategory = { ...product.toObject(), category: categoryName };

    res.json(productWithCategory);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));

router.get("/product-with-ratings/:id", asyncHandler(async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate('ratingAndReviews');

    if (!product) {
      return res.status(409).json({ error: "Product not found" });
    }
    const categoryName = product.category.title;
    const productWithCategory = { ...product.toObject(), category: categoryName };

    const updatedRatingsAndReviews = [];

    for (const review of product.ratingAndReviews) {
      const user = await USER.findById(review.user);

      if (user) {
        const newReview = {
          rating: review.rating,
          review: review.review,
          user: user.username,
          date: review.createdAt
        };

        updatedRatingsAndReviews.push(newReview);
      }
    }

    productWithCategory.ratingsAndReviews = updatedRatingsAndReviews;
    delete productWithCategory.ratingAndReviews;

    res.json(productWithCategory);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}));

router.post('/post-rating/:productId', auth, asyncHandler(async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { productId } = req.params;

    const user = await USER.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingRating = await Rating.findOne({ product: productId, user: user._id });

    if (existingRating) {
      return res.status(409).json({ error: 'You have already reviewed this product' });
    }

    const newRating = new Rating({
      rating,
      review,
      product: productId,
      user: user._id
    });

    const savedRating = await newRating.save();

    if (!savedRating) {
      return res.status(500).json({ error: 'Failed to save rating' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      $push: { ratingAndReviews: savedRating._id }
    });

    if (!updatedProduct) {
      return res.status(500).json({ error: 'Failed to update product with review' });
    }

    res.json({ message: 'Review added successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.put('/update-rating/:productId', auth, asyncHandler(async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { productId } = req.params;

    const user = await USER.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingRating = await Rating.findOne({ product: productId, user: user._id });

    if (!existingRating) {
      return res.status(409).json({ error: 'You have not reviewed this product' });
    }

    const updatedRating = await Rating.findByIdAndUpdate(existingRating._id, {
      rating,
      review
    });

    if (!updatedRating) {
      return res.status(500).json({ error: 'Failed to update rating' });
    }

    res.json({ success: true, message: 'Review updated successfully' });

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}));

router.get('/discounted-product', asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find().populate('ratingAndReviews');

    const discountedProducts = allProducts.filter(product => product.discountprice > 0);

    const sortedProducts = discountedProducts.sort((a, b) =>
      (a.price - a.discountprice) - (b.price - b.discountprice));

    const sortByRating = sortedProducts.sort((a, b) =>
      b.ratingAndReviews.rating - a.ratingAndReviews.rating);

    return res.json(sortByRating.slice(0, 8));

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
));
module.exports = router;
