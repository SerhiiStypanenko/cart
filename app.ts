var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hbs = require('hbs');
var handlebars = require('handlebars');
var session = require('express-session');

var index = require("./routes/index.ts");
var http = require("http");
var app = express();


app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  next(err);
});

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app);
console.log(`PORT = ${port}`);
server.listen(port);
module.exports = app;
