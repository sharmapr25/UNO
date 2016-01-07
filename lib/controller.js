var express = require('express');
var fs = require('fs');
var lodash = require('lodash');
var cookieParser = require('cookie-parser');

var gameObject = require('../entities/gameEntity.js').game;

// var loadUser = function(req, res, next){
// 	if(req.cookie.user_name)
// 		req.user = {name:req.cookies.user_name};
// 		next();
// };

// var ensureLogin = function(req, res, next){
// 	if(req.user) next();
// 	else res.redirect('htmlFiles/login.html');
// };

var app = express();
app.use(express.static('./public'));
// app.use(cookieParser());
// app.use(loadUser);

app.get('/',function(req, res){
	res.redirect('/htmlFiles/login.html');
});

app.get('/public/css/login.css',function(req,res){
	res.redirect('/css/login.css');
});

app.get('/public/javaScript/login.js',function(req,res){
	res.redirect('/javaScript/login.js');
});

// app.get('/updated_login_data',function(req, res){});

module.exports = app;