var allCards = require('../entities/cardEntities.js').allCards;
var GenerateDeck = require('../entities/cardEntities.js').GenerateDeck;
var distributeCards = require('../server/serverUtilities.js').server.distributeCards;
var DiscardPile = require('../entities/cardEntities.js').DiscardPile;
var DrawPile = require('../entities/cardEntities.js').DrawPile;
var InitializePlayers = require('../entities/playerEntities.js').InitializePlayers;
var canPlayerPlayTheCard = require('../entities/rulesEntities.js').canPlayerPlayTheCard;
var calculatePoints = require('../server/serverUtilities.js').server.calculatePoints;
var fs = require('fs');

var lodash = require('lodash');

exports.genrateId = function(games) {
	return "game_"+ Object.keys(games).length;
};

var addUser = function(name,game){
	game.usersInformation.push({name : name});
};

var startUno = function(game){
	game.said_UNO_registry = [];

	var shuffledCards = lodash.shuffle(allCards);
  var deck = new GenerateDeck(shuffledCards);

	game.user_names = getUserName(game.usersInformation);
	game.players = new InitializePlayers(game.user_names);

	game.currentPlayer = game.players.currentPlayer;
	var dataAfterDistribution = distributeCards(game.user_names,shuffledCards);
	
  game.user_cards = dataAfterDistribution[0];
	var remainingCards = dataAfterDistribution[1];

	var cardForDiscardPile = remainingCards.shift();
	game.discard_pile = new DiscardPile([cardForDiscardPile]);

	game.runningColour = (game.discard_pile.getTopMostCard().colour) ? (game.discard_pile.getTopMostCard().colour) : '';
	game.draw_pile = new DrawPile(remainingCards);

	game.user_names.forEach(function(user){
  	game.said_UNO_registry.push({name : user, said_uno : false});
	});
};

var gameStarted = function(game){
    if(game.usersInformation.length == game.no_of_players)
        game.isGameStarted = true;
    else
      game.isGameStarted = false;
};

exports.sendUpdatedData = function(request, response, game){
  if(game) {
    gameStarted(game);
    if(game.isGameStarted){
      startUno(game); 
      response.send(JSON.stringify({isStarted : true,location:'unoTable.html'}));
      return;
    };
    response.send(JSON.stringify({isStarted : game.isGameStarted ,noOfPlayers : game.usersInformation.length,total:game.no_of_players}))
    return;
  }
  response.send(JSON.stringify({location : '/' ,noOfPlayers : undefined}));
};

exports.createdNewGameId = function(userInfo, gameId, listOfGame, game){
	listOfGame[gameId] = new game(gameId,userInfo[1]);
	addUser(userInfo[0], listOfGame[gameId]);
};

var getUserName = function(allInformation){
	return allInformation.map(function(user){
    	return user.name;
    });
};

var getUserCards = function(cookie, game){
 	return game.user_cards[cookie];
};

var getAllUserCardsLength = function(game){
  var cardInfo = [];
  game.user_names.forEach(function(userName){
    cardInfo.push({name : userName, noOfCards : game.user_cards[userName].length});
  });
  return cardInfo;
};

var setCookie = function(cookieHeader){
  var cookie = cookieHeader.split(";");
  if(cookie[0].substr(10).indexOf('%20') == -1)
    return cookie[0].substr(10);
  return cookie[0].substr(10).split('%20').join(' ');
};

 var isEndOfGame = function(game){
  var end = false;
  game.user_names.forEach(function(name){
    if(game.user_cards[name].length == 0) end = true;
  });
  return end;
};

 var calculateRanking = function(game){
  var ranks = [];
  game.user_names.forEach(function(name){
    ranks.push({name : name, points : calculatePoints(game.user_cards[name])});
  });
  ranks.sort(function(player1, player2){
    return (player1.points > player2.points)
      ? 1
      : (player1.points < player2.points) ? -1 : 0
  });
  return ranks;
};  

var generateDiv = function(userInfo){
  var user_info = userInfo.map(function (eachUser) {
    return '<div class ="name inline">'+eachUser.name+'</div><div class = "points inline">'+eachUser.points+'</div>';
  });

  var headingOfList = "<div class = 'heading'>"
                      +"<div class = 'name_heading inline'>NAME </div>" 
                      +"<div class = 'points_heading inline'>PANALITY</div>"
                      +"</div>";

  var winner = userInfo.map(function(eachUser){
    if(eachUser.points == 0)
      return "<div id = 'winnerName'>"+eachUser.name+"</div>";
  });

  var greetText = '<div class = "congratulate spaceBetweenTwoClass">Congratulations!!!</div>';
  var message = '<div class = "message spaceBetweenTwoClass"> You won the game</div>';
  var list = '<div class= "listButton spaceBetweenTwoClass"><button onclick  = "showList()">list</button></div>';
  var linkToHome = "<div class = 'home'><button onclick = 'resetCookie()'>Play Again</button></div>";
  var endData = '</body></html>';
  return "<div id = 'winner'>"+greetText+winner+message+list+"</div>"+"<div id = 'list'>"+headingOfList+"<div class = 'userInfo'>"+user_info+"</div>"+"</div>"+linkToHome+endData;
}

 var storeRankOfPlayers = function(ranks){
  var dataToWrite = generateDiv(ranks);

  var fileName = './public/winners.html';
  var data = fs.readFileSync(fileName,'UTF-8');
  var startIndex = data.indexOf('<div');

  var dataAfter = data.substring(0,startIndex) + dataToWrite;
  fs.writeFileSync(fileName, dataAfter);
};

exports.sendAllInformationOfTable = function(request, response, game){
  if(!game)
    response.send(JSON.stringify({location : '/' ,status : 500}));
  else{
    var dataToSend = {};
    dataToSend.cardOnTable = game.discard_pile.getTopMostCard();
    dataToSend.userCards = getUserCards(setCookie(request.headers.cookie), game);

    dataToSend.allUsersCardsLength = getAllUserCardsLength(game); 
    dataToSend.currentPlayer = game.players.currentPlayer;
    dataToSend.nextPlayer = game.players.nextPlayer;
    dataToSend.previousPlayer = game.players.previousPlayer;
    dataToSend.runningColour = game.runningColour;
    dataToSend.UNOregistry = game.said_UNO_registry;
    dataToSend.noOfDiscardCards = game.discard_pile.cards.length;

    var end = isEndOfGame(game);  
    if(end){
      dataToSend.isEndOfGame = isEndOfGame(game);
      dataToSend.ranks = calculateRanking(game);
      storeRankOfPlayers(dataToSend.ranks); 
    };
    response.send(JSON.stringify(dataToSend)); 
  }
};

//============================play_card request=================================//

var removeSelectedCard = function(card, allCards){
  for(var i = 0; i < allCards.length; i++){
    if(JSON.stringify(allCards[i]) == JSON.stringify(card)){
      allCards.splice(i,1);
      return allCards;
    };
  };
};

var givePenaltyCardsTwoNextPlayer = function(penalty, game){
  if(game.user_cards[game.players.currentPlayer].length !=0)
    game.user_cards[game.players.nextPlayer] = game.user_cards[game.players.nextPlayer].concat(drawCardsFromDeck(penalty, game));
};

var doesNextPlayerHavePlustwo = function(game){
  return game.user_cards[game.players.nextPlayer].some(function(card){
    return (card.speciality == 'DrawTwo');
  });
};

var giveFourCardsToNextPlayer = function(game){
  var nextPlayer = game.players.nextPlayer;
  game.user_cards[nextPlayer] = game.user_cards[nextPlayer].concat(drawCardsFromDeck(4, game));
};

var playTheCardThatUserRequested = function(cardPlayed, request, game){
  var userName = setCookie(request.headers.cookie);
  var userHand = game.user_cards[userName];
  game.user_cards[userName] = removeSelectedCard(cardPlayed.playedCard, userHand);
  game.discard_pile.addCard(cardPlayed.playedCard);
  switch (cardPlayed.playedCard.speciality){
    case 'Wild':
      game.runningColour = cardPlayed.colour;
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
      break;
    case 'WildDrawFour':
      game.runningColour = cardPlayed.colour;
      giveFourCardsToNextPlayer(game);
      game.players.changePlayersTurn();
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
      break;
    case 'DrawTwo':
      game.plus_two_cards_count += 2;
      if(!doesNextPlayerHavePlustwo(game)){
        givePenaltyCardsTwoNextPlayer(game.plus_two_cards_count, game);
        game.players.changePlayersTurn();
        game.plus_two_cards_count = 0;
      };
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
      game.runningColour = cardPlayed.colour;
      break;
    case null:
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
      game.runningColour = cardPlayed.colour;
      break;
    case 'Skip':
      game.runningColour = cardPlayed.colour;
      game.players.changePlayersTurn();
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
      break;
    case 'Reverse':
      game.runningColour = cardPlayed.colour;
      game.players.changeDirection();
      game.players.changePlayersTurn();
      game.currentPlayer = game.players.currentPlayer;
  };
};


exports.handle_play_card_request = function(request, response, game, cardPlayed){
  if(game.currentPlayer == setCookie(request.headers.cookie)){
    var discardedCard = game.discard_pile.getTopMostCard();
    if(canPlayerPlayTheCard(cardPlayed.playedCard, discardedCard, game.runningColour, game.plus_two_cards_count)){
      playTheCardThatUserRequested(cardPlayed, request, game);
      checkAndResetTheUnoField(game);
      response.statusCode = 200;
      response.send('successful');
    } 
    else{
      response.statusCode = 200;
      response.send('can_not_play_the_card');
    }
  }else{
    response.statusCode = 200;
    response.send('not_your_turn');
  }
};

//===================================draw_card request==========================================//
 
var drawCardsFromDeck = function(noOfCards, game){
  var cards = game.draw_pile.drawCards(noOfCards);
  if(game.draw_pile.isEmpty()){
    var topMostCard = game.discard_pile.cards.shift();
    var allDeckCards = game.discard_pile.cards;
    game.draw_pile = new DrawPile(lodash.shuffle(allDeckCards));
    game.discard_pile = new DiscardPile([topMostCard]);
  };
  return cards;
};

exports.handle_draw_card_request = function(request, response, game){
  var userName = setCookie(request.headers.cookie);
  if(game.currentPlayer == userName){
    var card = drawCardsFromDeck(1, game);
    if(card[0] == undefined){
      response.send('out_of_cards');
      return;    
    };
    game.user_cards[userName] = game.user_cards[userName].concat(card);
    response.statusCode = 200;
    response.send();
      
  }
  else{
    response.statusCode = 200;
    response.send('not_your_turn');   
  };
};

//===================================pass turn request============================================//

exports.handle_pass_turn_request = function(request, response, game){
  game.players.changePlayersTurn();
  game.currentPlayer = game.players.currentPlayer;
  response.statusCode = 200;
  response.send('turn_passed');
};

//==================================== say_uno ===================================================//

exports.handle_say_uno = function(request, response, game){
  var playerName = setCookie(request.headers.cookie);
    game.said_UNO_registry.forEach(function(user){
      if(user.name == playerName) 
        user.said_uno = true;
    });
  response.statusCode = 200;
  response.send('said_uno_sucessfully')
};


//===================================catch_uno==================================================//

 var checkAndResetTheUnoField = function(game){
  game.said_UNO_registry.forEach(function(player){
    if(player.said_uno == true){
      if(game.user_cards[player.name].length != 1)
        player.said_uno = false;   
    };
  });
};

var givePenalty = function(player, noOfCards, game){
  game.user_cards[player] = game.user_cards[player].concat(drawCardsFromDeck(noOfCards, game));
  checkAndResetTheUnoField(game);
}

exports.handle_catch_uno = function(request, response, game){
  var playersCardInfo = getAllUserCardsLength(game);
  for(var i = 0; i < playersCardInfo.length; i++){
    if(playersCardInfo[i].noOfCards == 1){
        if(game.said_UNO_registry[i].said_uno == false) {
            givePenalty(game.said_UNO_registry[i].name, 2, game);
            response.send("uno_catched_successfully");
            return;
        }
    }
  }
  response.statusCode = 200;
  response.send("no_one_to_catch_uno");
};

//================================ join game =========================================//

exports.handle_join_game = function(request, response, game, joinUserName){
    addUser(joinUserName, game);
    response.send('loadingPage.html');   
};
