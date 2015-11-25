var http = require('http');
var fs = require('fs');
var lodash = require('lodash');

//-------------------------------------------------------------------------------------//

var allCards = require('../entities/cardEntities.js').allCards;
var GenerateDeck = require('../entities/cardEntities.js').GenerateDeck;
var distributeCards =  require('./serverUtilities.js').server.distributeCards;
var DiscardPile = require('../entities/cardEntities.js').DiscardPile;
var DrawPile = require('../entities/cardEntities.js').DrawPile;
var InitializePlayers = require('../entities/playerEntities.js').InitializePlayers;

//-------------------------------------------------------------------------------------//

var main = function(){
	var usersInformation = [];
	var isGameStarted = false;

	//-------------------------------------------------------------------------------------------//
	var sendUpdatedData = function(request, response){
		if(usersInformation.length != 1){
			var data =  { isGameStarted : isGameStarted,
						  numberOfPlayers : usersInformation.length,
						};
			sendResponse(response, data);
		}else{
			startUno();
			response.statusCode = 200;
			response.end('public/htmlFiles/unoTable.html');
		}
	};
	var mapName = function(ip){
		var name;
		usersInformation.forEach(function(user){
			if(user.ip.toString() == ip.toString()) name = user.name;
		});
		return name;
	};

	var getUserCards = function(ip){
		var name = mapName(ip);
		return user_cards[name];
	};

	var getAllUserCardsLength = function(){
		var cardInfo = [];
		user_names.forEach(function(userName){
			cardInfo.push({name : userName, noOfCards : user_cards[userName].length});
		});
		return cardInfo;
	};

	var sendAllInformationOfTable = function(request,response){
		var dataToSend = {};
		dataToSend.cardOnTable = discard_pile.getTopMostCard();
		dataToSend.userCards = getUserCards(request.connection.remoteAddress);
		dataToSend.allUsersCardsLength = getAllUserCardsLength();
		dataToSend.currentPlayer = players.currentPlayer;
		dataToSend.nextPlayer = players.nextPlayer;
		dataToSend.previousPlayer = players.previousPlayer;
		sendResponse(response, dataToSend);
	};

	var serveFile = function(filePath, request, response){
		console.log('Gaurav is requesting', filePath);
		fs.readFile(filePath, function(err, data){
			if(data){
				response.statusCode = 200;
				response.end(data);
			}else if(err){
				console.log('file not found..!',request.url);
				response.statusCode = 404;
				response.end('File Not Found..!');
			};
		});
	};


	var handle_get_request = function(request, response){
		console.log('requested files', request.url);
		filePath = (request.url == '/') ? '../public/htmlFiles/login.html' : '..' + request.url;
		if(request.url == '/' && isGameStarted){
			response.statusCode = 404;
			response.end('Game has already been started..!');
		}
		else if(request.url == '/updated_login_data'){
			sendUpdatedData(request, response);
		}else if(request.url == '/public/htmlFiles/all_information_on_table'){
			sendAllInformationOfTable(request,response);
		}else{
			serveFile(filePath, request, response);
		};
	};
	//-----------------------------------POST_HANDLER---------------------------------------//

	var addUser = function(name, ip){
		usersInformation.push({name : name, ip : ip});
	};

	var isUserExists = function(request){
		var currentIP = request.connection.remoteAddress;
		console.log('Checking for', currentIP);
		return usersInformation.some(function(user){
			return (user.ip == currentIP);
		});
	};

	var sendResponse = function(response, data){
		response.end(JSON.stringify(data));
	};

	var handle_post_request = function(request, response){
		console.log('post request', request.url, request.method);
		if(request.url == '/login_user'){
			if(isGameStarted){
				response.end('{"isGameStarted" : true}');
			}else{
				console.log('User requested to log in..!');
				var data = '';
				request.on('data', function(d){
					data += d;
				});
				request.on('end', function(){
					if(!isUserExists(request)){
						addUser(data.substr(5), request.connection.remoteAddress);
						var dataToBeSent =  { isGameStarted : isGameStarted,
										  	  numberOfPlayers : usersInformation.length,
											};
						sendResponse(response, dataToBeSent);
					}else{
						var dataToBeSent =  { alreadyConnected : true };
						sendResponse(response, dataToBeSent);
					};
					
					if(usersInformation.length == 3) isGameStarted = true;
					console.log(usersInformation);
				});
			};
		}else if(request.url == '/public/htmlFiles/play_card'){
			console.log('user requested to play the card..!!');
			var data = '';
				request.on('data', function(d){
					data += d;
				});
				request.on('end', function(){
					console.log(JSON.parse(data));
				});
				sendAllInformationOfTable(request, response);
		};

	};

	//-------------------------------------------------------------------------------------------//

	var requestHandler = function(request, response){
		console.log(request.method, request.url);
		if(request.method == 'GET')
			handle_get_request(request, response);
		else if(request.method == 'POST')
			handle_post_request(request, response);
	};

	//-------------------------------------------------------------------------------------------//
	var getUserName = function(allInformation){
		return allInformation.map(function(user){
			return user.name;
		});
	};

	//-------------------------------------UNO_DECK DATA---------------------------------------------//

	var user_names;
	var user_cards;
	var discard_pile;
	var draw_pile;

	var players;

	var startUno = function(){
		var shuffledCards = lodash.shuffle(allCards);
		var deck = new GenerateDeck(shuffledCards);
		user_names = getUserName(usersInformation);
		players = new InitializePlayers(user_names);
		user_names = players.players;
		var dataAfterDistribution = distributeCards(user_names,shuffledCards);
		user_cards = dataAfterDistribution[0];
		var remainingCards = dataAfterDistribution[1];
		var cardForDiscardPile = remainingCards.shift();
		discard_pile = new DiscardPile([cardForDiscardPile]);
		draw_pile = new DrawPile(remainingCards);
		console.log("user cards is here.....",user_cards);
		console.log("draw pile is herreee...", draw_pile.cards);
		console.log("discard pile is remaining ", discard_pile.cards);
	};


	//-------------------------------------------------------------------------------------------//

	var server = http.createServer(requestHandler);
	server.listen(3000);
};

main();