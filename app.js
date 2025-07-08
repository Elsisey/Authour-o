const express = require('express');
const authorsPath = require('./authors');
const mongoose = require('mongoose');

// connect to mongodb
mongoose
   .connect('mongodb://localhost/bookstore')
   .then(() => console.log('connected to mongodb'))
   .catch((error) => console.log('error connecting to mongodb',error))
//init express
const app = express();
// Apply middleware 
app.use(express.json())


    app.use("/api/authors",authorsPath)
// run server
const PORT = 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))