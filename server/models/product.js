const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  fabric: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;