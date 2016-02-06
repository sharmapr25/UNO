var express = require('express');
var fs = require('fs');
var lib = require('./controllerLib.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var game = require('../entities/gameEntity.js').game;
var listOfGame  = {};
var app = express();

app.use(function(req,res,next){next();})
app.use(express.static('./public'));
app.game = game;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
// app.use(bodyParser.text());
app.use(cookieParser());


app.get('/',function(req, res){
	res.redirect('/index.html');
});

app.get('/reset_cookie',function(req, res){
	res.clearCookie('user_name');
	res.clearCookie('user_game_id');
	console.log(req.cookies.user_name)
	res.send('/');

});

app.post('/login_user',function(req, res){
	console.log('body is', req.body);
	var user = req.body;
	var gameId = lib.genrateId(listOfGame);
	// var user = Object.keys(req.body)[0].split('~/');
	lib.createdNewGameId(user,gameId,listOfGame,app.game );
	res.cookie("user_name",user.name);
	res.cookie("user_game_id",gameId);
	res.send('loadingPage.html');		
});

app.get('/updated_login_data',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.sendUpdatedData(req, res, listOfGame[gameId]);
});

app.get('/all_information_on_table',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.sendAllInformationOfTable(req, res, listOfGame[gameId]);
});

app.get('/give_list_of_game',function(req, res) {
	var waitingGames = Object.keys(listOfGame).filter(function(key){
		return !listOfGame[key].isGameStarted;
	})
	res.send(waitingGames);
});

app.post('/play_card',function(req, res){
	var gameId = req.cookies.user_game_id;
	var userPlay = JSON.parse(req.body);
	lib.handle_play_card_request(req, res, listOfGame[gameId], userPlay);
});

app.post('/draw_card',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_draw_card_request(req, res, listOfGame[gameId]);
});

app.post('/pass_turn',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_pass_turn_request(req, res, listOfGame[gameId]);
});

app.post('/catch_uno',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_catch_uno(req, res, listOfGame[gameId]);
});

app.post('/say_uno',function(req, res){
	var gameId = req.cookies.user_game_id;
	lib.handle_say_uno(req, res, listOfGame[gameId]);
});

app.post('/join_game',function(req, res){
	var joinGame = req.body;
	console.log('..........join',joinGame)
	res.cookie("user_name",joinGame.name);
	res.cookie("user_game_id",joinGame.id);
	lib.handle_join_game(req, res, listOfGame[joinGame.id], joinGame.name);
});

module.exports = app;