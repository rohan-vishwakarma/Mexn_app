require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
// routes
const crud = require('./routes/crud');

app.use(express.json());

app.use((req, res, next) => {
  console.log("Path: ", req.path, ", Method:  ", req.method);
  next();
})


app.use(crud);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Mongo Db connected")})
.catch(()=>{
  console.log("Error Connecting Db");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${port}`);
});
