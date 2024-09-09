const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'products', required: true }, // Reference to Product
      quantity: { type: Number, required: true, default: 1 } // Quantity of the product
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
