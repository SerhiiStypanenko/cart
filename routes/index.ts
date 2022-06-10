
var express = require('express');
//const session = require('express-session');
var router = express.Router();

var fs = require('fs');

var Cart = require('../models/cart.ts');
var Favourite = require('../models/favourite.ts');


var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next) {
  res.render('index.hbs', 
  { 
    title: 'Cart',
    products: products,

  }
  );
});


router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/');
});

router.get('/add/:id/:favourite', function(req, res, next) {
  var productId = req.params.id;
  var favourite = new Favourite(req.session.favourite ? req.session.favourite : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  favourite.add(product[0], productId);
  req.session.favourite = favourite;
  res.redirect('/');
});

router.get('/addFromFavourite/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/favourites');
});

router.get('/favourites', function(req,res,next){
  if(!req.session.favourite) {
    return res.render('favourites.hbs', {
      products: null
    });
  }
  var favourite = new Favourite(req.session.favourite);
  res.render('favourites.hbs', {
    title: 'Favourites',
    products: favourite.getItems(),
    
  });
});

router.get('/increase/:id', function(req,res,nex){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increase(productId);
  req.session.cart = cart;
  res.redirect('/cart');
  
});

router.get('/decrease/:id', function(req,res,nex){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.decrease(productId);
  req.session.cart = cart;
  res.redirect('/cart');
  
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart.hbs', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart.hbs', {
    title: 'Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice,
    
  });
});


router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.get('/remove/:id/:favourite', function(req, res, next) {
  var productId = req.params.id;
  var favourite = new Favourite(req.session.favourite ? req.session.favourite : {});

  favourite.remove(productId);
  req.session.favourite = favourite;
  res.redirect('/favourites');
});

module.exports = router;
