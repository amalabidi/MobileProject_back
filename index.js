const express = require('express');
const mongoose = require('mongoose');
const categories = require('./routes/categories');
const products = require('./routes/products');
const users = require('./routes/users');
const auth = require('./routes/authentification');
const bag = require('./routes/bag');
const images = require('./routes/images');
const app = express();
var cors = require('cors');

// middleware to parse json to javascript objects
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-auth-token, Content-Type, Accept");
  next();
});

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//app.use(cors());

// connecting to mongodb

/*'mongodb+srv://flutter-team:flutter-junior@cluster0.o7rlv.mongodb.net/flutter_ecommerce_project' */
const DB_USER = process.env.DB_USER ;
const DB_PASSWORD = process.env.DB_PASSWORD; 
mongoose.connect( `mongodb+srv://flutter-team:flutter-junior@cluster0.o7rlv.mongodb.net/flutter_ecommerce_project `,{ useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("connected to mongodb successfully"))
    .catch((err) => console.log('couldnt connect to mongodb' + err));

//delegating a router to a given url
// all request to /api/categories will be handled by the categories router
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/bag", bag);
app.use("/api/images", images);

//choose the backend port 
  const port = process.env.PORT || 3001;

//starting the backend server
app.listen(port, () => console.log("listening on port:" + port));




