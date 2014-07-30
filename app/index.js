'use strict';

var express = require('express'); // imports Express.js node module
var morgan = require('morgan'); // imports Morgan.js node module

var app = express();

app.set('view engine', 'ejs'); // configures express server as the view engine
app.set('views', __dirname + '/views'); // configures express server

app.use(morgan('dev')); // first thing a request does: log request
app.use(express.static(__dirname + '/static')); // looks to see if request can be met in static dir first; static routes

// 'app.get' sets your dynamic routes
app.get('/', function(req, res){ // if not in static, then looks under / dir.
  res.render('index');
});

app.get('/checkers', function(req, res){ // if not in home dir, then looks for matching sub-dir.
  res.render('checkers'); // renders view file 'checkers'
});

app.get('/add/:a/:b/:c/:d', function(req, res){
  req.params.a *= 1;
  req.params.b *= 1;
  req.params.c *= 1;
  req.params.d *= 1;

  req.params.f = req.query.fontsize;
  req.params.r = req.query.color;
  req.params.w = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sumlist/:nums', function(req, res){
  var nums = req.params.nums.split(',');

  nums = nums.map(function(n){
    return n * 1;
  });

  var sum = 0;
  for(var i = 0; i < nums.length; i++){
    sum += nums[i];
  }

  res.render('sumlist', {nums:nums, sum:sum, even:req.query.even, odd:req.query.odd});
});

var port = process.env.PORT; // creates variable to dynamically assign PORT.  

// dynamically assign PORT by starting 'supervisor' in the command line

app.listen(port, function(){ //tells Express to listen for http requests on PORT x.
  console.log('Express.js is listening, on PORT' + port);
});
