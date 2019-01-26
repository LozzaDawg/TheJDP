const http = require('http')
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const logRoutes = require('./api/routes/logs');

mongoose.connect("mongodb://restful_user:" + process.env.MONGO_ATLAS_PW + "@restful-api-shard-00-00-clkr2.mongodb.net:27017,restful-api-shard-00-01-clkr2.mongodb.net:27017,restful-api-shard-00-02-clkr2.mongodb.net:27017/TheJDP?ssl=true&replicaSet=restful-api-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true});

app.set('view engine', 'ejs');

app.use(express.static('./public'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DEL");
    return res.status(200).json({});
  }
  next();
});

app.get('/home',function(req,res){ res.render('index') })
app.get('/about',function(req,res){ res.render('about') })
app.get('/creative',function(req,res){ res.render('creative') })
app.use('/logs', logRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
})

module.exports = app;
