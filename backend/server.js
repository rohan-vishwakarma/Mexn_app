require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// routes
const crud = require('./routes/crud');

app.use(crud);

app.use((req, res, next) => {
  console.log("Path: ", req.path, ", Method:  ", req.method);
  next();
})


app.use

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${port}`);
});
