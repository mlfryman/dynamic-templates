'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('index');
});

app.listen(process.env.PORT, function(){
  console.log('Express.js is listening, on PORT', process.env.PORT);
});
