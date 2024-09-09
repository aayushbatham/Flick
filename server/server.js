const express = require('express');
const CORS = require('cors');
require('dotenv').config();
const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const user = require('./models/user');
const app = express();
app.use(express.json());
app.use(CORS());
// port
const PORT = process.env.PORT;

//db connection
require('./db/db');

//all routes
app.use('/',auth);
app.use('/',product);
app.use('/cart',cart);
app.use ('/',user);

app.get('/',(req,res)=>{
  res.send('hello');
})

app.listen(PORT,()=>{
  console.log('Server Running on port', PORT);
})