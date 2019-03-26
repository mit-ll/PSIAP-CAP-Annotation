// Node libraries.
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var app = express();

// Custom libraries.
var index = require('./routes/index');
var api = require('./routes/api.route');
var config = require('config');
var mongoose = require('mongoose');

// Mongodb database name.
var databaseName = config.get('database') 

// Confirming a database name is set for application.
if(!databaseName) {
  console.log('Database not defined in config file.');
  console.log('Terminating program.');
  process.exit();
}

// Setting up mongodb.
mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName, { useNewUrlParser: true } )
.then(() => { console.log('Succesfully connected to the mongodb database at: mongodb://127.0.0.1:27017/'  + databaseName)})
.catch(() => { console.log('Error connecting to the mongodb database at: mongodb://127.0.0.1:27017/'  + databaseName)});

// Sets the access control values for the server.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Sets up express configurations.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api', api);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler.
app.use(function(err, req, res, next) {
  
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page.
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
