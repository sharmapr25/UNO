var http = require('http');
var fs = require('fs');
var lodash = require('lodash');

//-------------------------------------------------------------------------------------//

var allCards = require('../entities/cardEntities.js').allCards;
var GenerateDeck = require('../entities/cardEntities.js').GenerateDeck;
var distributeCards = require('./serverUtilities.js').server.distributeCards;
var DiscardPile = require('../entities/cardEntities.js').DiscardPile;
var DrawPile = require('../entities/cardEntities.js').DrawPile;
var InitializePlayers = require('../entities/playerEntities.js').InitializePlayers;
var canPlayerPlayTheCard = require('../entities/rulesEntities.js').canPlayerPlayTheCard;
var calculatePoints = require('./serverUtilities.js').server.calculatePoints;

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
		}else if(isUserExists(request)){
			startUno();
			response.statusCode = 200;
			response.end('public/htmlFiles/unoTable.html');
		}else{
			var data =  { isGameStarted : true};
			sendResponse(response, data);
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

	var generateTable  = function(userInfo) {
		var user_info = userInfo.map(function (eachUser) {
			return "<tr><td>"+eachUser.name+"</td><td>"+eachUser.points+"</td></tr>";
		});
		var greetText = '<tr><td colspan="2"><h1>Congratulation!!!!</h1></td></tr>';
		var tableHead = "<tr><th>Name</th><th>Points</th></tr>"
		var endData = '</body></html>';
		return "<table id='table'>"+greetText+tableHead+user_info.join('')+"</table>" + endData;
	};

	var storeRankOfPlayers = function(ranks){
		var dataToWrite = generateTable(ranks);
		var fileName = '../public/htmlFiles/winners.html';
		var data = fs.readFileSync(fileName,'UTF-8');
		var startIndex = data.indexOf('<table');
		var dataAfter = data.substring(0,startIndex) + dataToWrite;
		fs.writeFileSync(fileName, dataAfter);
	};

	var sendAllInformationOfTable = function(request,response){
		var dataToSend = {};
		dataToSend.cardOnTable = discard_pile.getTopMostCard();
		dataToSend.userCards = getUserCards(request.connection.remoteAddress);
		dataToSend.allUsersCardsLength = getAllUserCardsLength();
		dataToSend.currentPlayer = players.currentPlayer;
		dataToSend.nextPlayer = players.nextPlayer;
		dataToSend.previousPlayer = players.previousPlayer;
		dataToSend.runningColour = runningColour;
		var end = isEndOfGame();
		if(end){
			dataToSend.isEndOfGame = isEndOfGame();
			dataToSend.ranks = calculateRanking();
			storeRankOfPlayers(dataToSend.ranks);
		};

		sendResponse(response, dataToSend);
	};

	var serveFile = function(filePath, request, response){
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
		}else if(request.url == '/public/htmlFiles/all_information_on_table' && !isUserExists(request)){
			response.statusCode = 404;
			response.end('Oops..!! Something went wrong..!! GO TO LOGIN PAGE');
		}else if(request.url == '/updated_login_data'){
			sendUpdatedData(request, response);
		}else if(request.url == '/public/htmlFiles/winners.html' && !isUserExists(request)){
			response.statusCode = 404;
			response.end('Sorry..!!! Login First..!!!');
		}else if(request.url == '/public/htmlFiles/all_information_on_table'){
			sendAllInformationOfTable(request,response);
		}else{
			serveFile(filePath, request, response);
		};


		// switch(request.url){
		// 	case '/' :
		// 		if(isGameStarted){
		// 			response.statusCode = 404;
		// 			response.end('Game has already been started..!');
		// 		}else{
		// 			serveFile(filePath, request, response);
		// 		}break;
		// 	case '/public/htmlFiles/all_information_on_table':
		// 		if(!isUserExists(request)){
		// 			response.statusCode = 404;
		// 			response.end('Oops..!! Something went wrong..!! GO TO LOGIN PAGE');
		// 		}else{
		// 			sendAllInformationOfTable(request,response);
		// 		}break;
		// 	case '/updated_login_data':
		// 		sendUpdatedData(request, response);
		// 		break;
		// 	case '/public/htmlFiles/winners.html':
		// 		if(!isUserExists(request)){
		// 			response.statusCode = 404;
		// 			response.end('Sorry..!!! Login First..!!!');
		// 		}else{
		// 			serveFile(filePath, request, response);
		// 		}break;
		// 	default:
		// 		serveFile(filePath, request, response);
		// };
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

	var isEndOfGame = function(){
		var end = false;
		user_names.forEach(function(name){
			if(user_cards[name].length == 0) end = true;
		});
		return end;
	};

	var calculateRanking = function(){
		var ranks = [];
		user_names.forEach(function(name){
			ranks.push({name : name, points : calculatePoints(user_cards[name])});
		});
		ranks.sort(function(player1, player2){
			return (player1.points > player2.points)
				? 1
				: (player1.points < player2.points) ? -1 : 0
		});
		return ranks;
	};

	var checkForEndOfTheGameAndRespond = function(request, response){
		if(isEndOfGame()){
			var dataToSend = {};
			dataToSend.status = 'Game end';
			dataToSend.ranks = calculateRanking();
			sendResponse(response, dataToSend);	
		}else{
			var dataToSend = {};
			dataToSend.status = 'successful';
			sendResponse(response, dataToSend);	
		};
	};

	var sendResponse = function(response, data){
		response.end(JSON.stringify(data));
	};

//---------------------------------LOGIN_USER_REQUEST---------------------------------//

	var handle_login_user_request = function(request, response){
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
					
					if(usersInformation.length == 1) isGameStarted = true;
					console.log(usersInformation);
				});
			};
	};

//---------------------------------PLAY_CARD_REQUEST---------------------------------//

	var canNotPlayTheCard = function(response){
		response.end('can_not_play_the_card');
	};

	var playTheCardThatUserRequested = function(cardPlayed, userHand ){

	};

	var handle_play_card_request = function(request, response){
		if(currentPlayer == mapName(request.connection.remoteAddress)){
			var data = '';
			request.on('data', function(d){
				data += d;
			});
			request.on('end', function(){
				var cardPlayed = JSON.parse(data);
				var discardedCard = discard_pile.getTopMostCard();
				console.log('card played is', cardPlayed);
				if(canPlayerPlayTheCard(cardPlayed, discardedCard)){
					// playTheCardThatUserRequested(cardPlayed, userHand, discard_pile, );
					response.statusCode = 200;
					response.end('successful');
				}else{
					canNotPlayTheCard(response);
				}

			});
		};
	}

	//-----------------------------------------------------------------------------//

	var handle_post_request = function(request, response){
		console.log('post request', request.url, request.method);
		switch(request.url){
			case '/login_user':
				handle_login_user_request(request, response);
				break;
			case '/public/htmlFiles/play_card':
				handle_play_card_request(request, response);
				break;
			default :
				response.statusCode = 405;
				response.end('Method NOT allowed..!!');
		};
	};

	var removeSelectedCard = function(card, allCards){
		for(var i = 0; i < allCards.length; i++){
			if(JSON.stringify(allCards[i]) == JSON.stringify(card)){
				allCards.splice(i,1);
				return allCards;
			};
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

	var runningColour;

	var currentPlayer;

	var plus_two_cards_count = 0;

	var startUno = function(){
		var shuffledCards = lodash.shuffle(allCards);
		var deck = new GenerateDeck(shuffledCards);
		user_names = getUserName(usersInformation);
		players = new InitializePlayers(user_names);
		user_names = players.players;
		currentPlayer = players.currentPlayer;
		var dataAfterDistribution = distributeCards(user_names,shuffledCards);
		user_cards = dataAfterDistribution[0];
		var remainingCards = dataAfterDistribution[1];
		var cardForDiscardPile = remainingCards.shift();
		discard_pile = new DiscardPile([cardForDiscardPile]);
		runningColour = (discard_pile.getTopMostCard().colour) ? (discard_pile.getTopMostCard().colour) : '';
		draw_pile = new DrawPile(remainingCards);
	};

	//-------------------------------------------------------------------------------------------//

	var server = http.createServer(requestHandler);
	server.listen(3000);
};

main();