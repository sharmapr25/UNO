var express = require('express');
var fs = require('fs');
var lodash = require('lodash');
var lib = require('./controllerLib.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var game = require('../entities/gameEntity.js').game;
var listOfGame  = {};

var app = express();
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.use(cookieParser());


app.get('/',function(req, res){
	console.log("cookies",req.cookies);
	res.redirect('/htmlFiles/login.html');
});

app.post('/htmlFiles/login_user',function(req, res){
		var gameId = lib.genrateId(listOfGame);
		var user = JSON.parse(req.body);
		listOfGame[gameId] = new game(gameId,user.setNoOfPlayer);

		console.log(listOfGame);

		res.cookie("user_name",user.name);
		res.cookie("user_game_id",gameId);

		lib.addUser(user.name,listOfGame[gameId]);

		// if(listOfGame[gameId].userInformation.length == listOfGame[gameId].NoOfPlayer)	{
			// listOfGame[gameId].isGameStarted = true;
			// lib.sendUpdatedData(req, res, listOfGame[gameId]);
			res.send(JSON.stringify(listOfGame[gameId]));			
		// };
		console.log("is game Started......",listOfGame[gameId].isGameStarted);
	// 	if(!lib.isUserExists(req)){
	// 		user = JSON.parse(data);
	// 		listOfGame[gameId] = new game(gameId,user.setNoOfPlayer);
	// 		response.writeHead(200, {'Set-Cookie': data.substr(5)});		
			// res.send( JSON.stringify(listOfGame[gameId]));	
	// 	};
	// 	else{

	// 	};
	// });
});

// app.get('/updated_login_data',function(req, res){
// 	// res.send('/htmlFiles/unoTable.html');
// 	// var gameId = req.cookie.user_game_id;
// 	// console.log(".............game cookies",gameId);
// 	// lib.sendUpdatedData(req,res,listOfGame.game_0)
// 	// if(listOfGame[gameId].isGameStarted == true){
// 	// 	res.redirect('/htmlFiles/unoTable.html');
// 	// }
// });

module.exports = app;