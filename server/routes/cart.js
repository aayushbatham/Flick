const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

//Import Modules
const Cart = require('../models/cart');
const Product = require('../models/product');

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
      await cart.save();
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      // If product exists in the cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If product is not in the cart, add it
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    return res.status(200).json({ message: 'Product added to cart successfully',cart });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.post('/remove', authMiddleware, async (req, res) => {
  try{
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res.status(200).json({ message: 'Product removed from cart successfully', cart });

  }catch(error){
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;