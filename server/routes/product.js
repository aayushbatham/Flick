const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Product = require('../models/product');

router.post('/product', authMiddleware, async (req, res) => {
  try {
    const { name, price, fabric, color, catagory, size, brand, description, imageURL } = req.body;

    if (!name || !description || !imageURL || !price || !fabric || !color || !catagory || !size || !brand) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    if (!imageURL.startsWith('http') && !imageURL.startsWith('https')) {
      return res.status(400).json({ message: 'Invalid image URL' });
    }

    const newProduct = new Product({
      name,
      price,
      fabric,
      color,
      catagory,
      size,
      brand,
      description,
      imageURL,

    });

    await newProduct.save();
    return res.status(200).json({ message: 'Product created successfully' });

  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
