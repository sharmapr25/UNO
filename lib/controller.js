var express = require('express');
var fs = require('fs');
var lodash = require('lodash');
var cookieParser = require('cookie-parser');
var lib = require('./controllerLib.js');
var game = require('../entities/gameEntity.js').game;
var listOfGame  = {};
var bodyParser = require('body-parser');

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
// app.use(bodyParser());
// app.use(cookieParser());
// app.use(loadUser);

app.get('/',function(req, res){
	res.redirect('/htmlFiles/login.html');
});

app.post('/htmlFiles/login_user',function(req, res){
	// var gameId = lib.genrateId(listOfGame);
	// var data = '';
	// var addUser;
	// req.on('data', function(d){
	//     data += d;
	// });
	// req.on('end', function(){
	// 	addUser = JSON.parse(data);
	//     console.log("mera nam hai",addUser);
	//  	console.log("no of player",addUser.setNoOfPlayer)
	// 	listOfGame[gameId] = new game(gameId,addUser.setNoOfPlayer);
	// 	console.log("list of game object",listOfGame[gameId]);
	// 	res.send(JSON.stringify(listOfGame[gameId]));
	// });
});

// app.get('/updated_login_data',function(req, res){});

module.exports = app;