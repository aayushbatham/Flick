const express = require('express');
require('dotenv').config();
const auth = require('./routes/auth');
const app = express();
app.use(express.json());
// port
const PORT = process.env.PORT;

//db connection
require('./db/db');

app.use('/',auth);

app.get('/',(req,res)=>{
  res.send('hello');
})

app.listen(PORT,()=>{
  console.log('Server Running on port', PORT);
})