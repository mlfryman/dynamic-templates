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
  res.render('sum', req.params);
});

var port = process.env.PORT; // creates variable to dynamically assign PORT.  

// dynamically assign PORT by starting 'supervisor' in the command line

app.listen(port, function(){ //tells Express to listen for http requests on PORT x.
  console.log('Express.js is listening, on PORT' + port);
});
