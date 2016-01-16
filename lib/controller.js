var express = require('express');
var fs = require('fs');
var lib = require('./controllerLib.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var game = require('../entities/gameEntity.js').game;
var listOfGame  = {};
var app = express();
app.use(express.static('./public'));
app.game = game;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());


app.get('/',function(req, res){
	res.redirect('/htmlFiles/login.html');
});

app.get('/htmlFiles/reset_cookie',function(req, res){
	res.clearCookie('user_name');
	res.clearCookie('user_game_id');
	res.send('/');

});

app.post('/htmlFiles/login_user',function(req, res){
	var gameId = lib.genrateId(listOfGame);
	var user = JSON.parse(req.body);
	lib.createdNewGameId(user,gameId,listOfGame,app.game );
	res.cookie("user_name",user.name);
	res.cookie("user_game_id",gameId);
	res.send('/htmlFiles/loadingPage.html');		
});

app.get('/htmlFiles/updated_login_data',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.sendUpdatedData(req, res, listOfGame[gameId]);
});

app.get('/htmlFiles/all_information_on_table',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.sendAllInformationOfTable(req, res, listOfGame[gameId]);
});

app.post('/htmlFiles/play_card',function(req, res){
	var gameId = req.cookies.user_game_id;
	var userPlay = JSON.parse(req.body);
	lib.handle_play_card_request(req, res, listOfGame[gameId], userPlay);
});

app.post('/htmlFiles/draw_card',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_draw_card_request(req, res, listOfGame[gameId]);
});

app.post('/htmlFiles/pass_turn',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_pass_turn_request(req, res, listOfGame[gameId]);
});

app.post('/htmlFiles/catch_uno',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_catch_uno(req, res, listOfGame[gameId]);
});

app.post('/htmlFiles/say_uno',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_say_uno(req, res, listOfGame[gameId]);
});

app.post('/htmlFiles/join_game',function(req, res){
	console.log("request to join game in controller",JSON.parse(req.body));
	var joinGame = JSON.parse(req.body);
	res.cookie("user_name",joinGame.name);
	res.cookie("user_game_id",joinGame.id);
	console.log("list of game in join game",listOfGame[joinGame.id]);

	lib.handle_join_game(req, res, listOfGame[joinGame.id], joinGame.name);
});



module.exports = app;