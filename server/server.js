var http = require('http');

 
// //----------------------------------------------------------------------------------------//

// var gameObject = require('../entities/gameEntity.js').game;
// var allCards = require('../entities/cardEntities.js').allCards;
// var GenerateDeck = require('../entities/cardEntities.js').GenerateDeck;
// var distributeCards = require('./serverUtilities.js').server.distributeCards;
// var DiscardPile = require('../entities/cardEntities.js').DiscardPile;
// var DrawPile = require('../entities/cardEntities.js').DrawPile;
// var InitializePlayers = require('../entities/playerEntities.js').InitializePlayers;
// var canPlayerPlayTheCard = require('../entities/rulesEntities.js').canPlayerPlayTheCard;
// var calculatePoints = require('./serverUtilities.js').server.calculatePoints;

// //-------------------------------------------------------------------------------------------//
// var sendUpdatedData = function(request, response){
//   if(gamelist[0].usersInformation.length != gamelist[0].no_of_players){
//     var data =  {isGameStarted : gamelist[0].isGameStarted,
//             numberOfPlayers : gamelist[0].usersInformation.length,
//           };
//     sendResponse(response, data);
//   }else if(isUserExists(request)){
//     startUno();
//     response.statusCode = 200;
//     response.end('/public/htmlFiles/unoTable.html');
//   }
// else{
//     var data =  { isGameStarted : true};
//     sendResponse(response, data);
//   }
// };

// var getUserCards = function(cookie){
//   return gamelist[0].user_cards[cookie];
// };

//   var getAllUserCardsLength = function(){
//     var cardInfo = [];
//     gamelist[0].user_names.forEach(function(userName){
//       cardInfo.push({name : userName, noOfCards : gamelist[0].user_cards[userName].length});
//     });
//     return cardInfo;
//   };

// var generateTable  = function(userInfo) {
//   var user_info = userInfo.map(function (eachUser) {
//     return "<tr><td>"+eachUser.name+"</td><td>"+eachUser.points+"</td></tr>";
//   });
//   var greetText = '<tr><td colspan="2"><h1>Congratulation!!!!</h1></td></tr>';
//   var tableHead = "<tr><th>Name</th><th>Points</th></tr>"
//   var endData = '</body></html>';
//   return "<table id='table'>"+greetText+tableHead+user_info.join('')+"</table>" + endData;
// };

// var storeRankOfPlayers = function(ranks){
//   var dataToWrite = generateTable(ranks);
//   var fileName = './public/htmlFiles/winners.html';
//   var data = fs.readFileSync(fileName,'UTF-8');
//   var startIndex = data.indexOf('<table');
//   var dataAfter = data.substring(0,startIndex) + dataToWrite;
//   fs.writeFileSync(fileName, dataAfter);
// };

// var sendAllInformationOfTable = function(request,response){
//   var dataToSend = {};
//   dataToSend.cardOnTable = gamelist[0].discard_pile.getTopMostCard();
//   dataToSend.userCards = getUserCards(request.headers.cookie);
//   dataToSend.allUsersCardsLength = getAllUserCardsLength(); 
//   dataToSend.currentPlayer = gamelist[0].players.currentPlayer;
//   dataToSend.nextPlayer = gamelist[0].players.nextPlayer;
//   dataToSend.previousPlayer = gamelist[0].players.previousPlayer;
//   dataToSend.runningColour = gamelist[0].runningColour;
//   var end = isEndOfGame();
//   if(end){
//     dataToSend.isEndOfGame = isEndOfGame();
//     dataToSend.ranks = calculateRanking();
//     storeRankOfPlayers(dataToSend.ranks);
// //     //clear the variables..
    
// //     // gamelist[0].user_names = undefined;
// //     // gamelist[0].user_cards = undefined;
// //     // gamelist[0].discard_pile = undefined;
// //     // gamelist[0].draw_pile = undefined;

// //     // gamelist[0].players = undefined;

// //     // gamelist[0].runningColour = undefined;

// //     // gamelist[0].currentPlayer = undefined;

//     // gamelist[0].plus_two_cards_count = 0;

// //     // gamelist[0].said_UNO_registry = [];
// //     // gamelist[0].usersInformation = [];
// //     // gamelist[0].isGameStarted = false;
//   };

//   sendResponse(response, dataToSend);
// };

// var serveFile = function(filePath, request, response){
//   console.log('serving', filePath);

//   fs.readFile(filePath, function(err, data){
//     if(data){
//       response.statusCode = 200;
//       response.end(data);
//     }
//     else if(err){
//       response.statusCode = 200;
//       var data = fs.readFile('./public/images/favicon.ico')
//       response.end(data);
//     };
//   });
// };

// var handle_get_request = function(request, response){
//    if(request.url == '/'){
//     var filePath = './public/htmlFiles/login.html';
//     gamelist.push(new gameObject());
//    }else {var filePath = '.' + request.url};
//   if(request.url == '/' && gamelist[0].isGameStarted){
//     response.statusCode = 404;
//     response.end('Game has already been started..!');
//   }
//   else if(request.url == '/public/htmlFiles/all_information_on_table' && !isUserExists(request)){
//     response.statusCode = 404;
//     var info = [ 'Oops..!!',
//            'Something went wrong..!!',
//            ' GO TO ',
//            '<a href="/"> LOGIN PAGE </a>'
//           ].join('');
//     response.end(info);
//   }
//   else if(request.url == '/updated_login_data'){
//     sendUpdatedData(request, response);
//   }
//   else if(request.url == '/public/htmlFiles/winners.html' && !isUserExists(request)){
//     response.statusCode = 404;
//     var info = [ '<!DOCTYPE html><html><head><title></title></head><body>',
//            'Sorry..',
//            ' Login First..!!',
//            ' go to ',
//            '<a href="/"> LOGIN PAGE </a>',
//            '</body></html>'
//           ].join('');
//     response.end(info);
//   }
// else if(request.url == '/public/htmlFiles/all_information_on_table'){
//     sendAllInformationOfTable(request,response);
//   }
//   else{
//     serveFile(filePath, request, response);
//   };
// };

// // //-----------------------------------POST_HANDLER---------------------------------------//

// var addUser = function(name){
//   gamelist[0].usersInformation.push({name : name});
// };

// var isUserExists = function(request){
//   var cookies = request.headers.cookie;
//   return gamelist[0].usersInformation.some(function(user){
//     return (user.name == cookies);
//   });
// };

// var isEndOfGame = function(){
//   var end = false;
//   gamelist[0].user_names.forEach(function(name){
//     if(gamelist[0].user_cards[name].length == 0) end = true;
//   });
//   return end;
// };

// var calculateRanking = function(){
//   var ranks = [];
//   gamelist[0].user_names.forEach(function(name){
//     ranks.push({name : name, points : calculatePoints(gamelist[0].user_cards[name])});
//   });
//   ranks.sort(function(player1, player2){
//     return (player1.points > player2.points)
//       ? 1
//       : (player1.points < player2.points) ? -1 : 0
//   });
//   return ranks;
// };

// // var checkForEndOfTheGameAndRespond = function(request, response){
// //   if(isEndOfGame()){
// //     var dataToSend = {};
// //     dataToSend.status = 'Game end';
// //     dataToSend.ranks = calculateRanking();
// //     sendResponse(response, dataToSend);	
// //   }else{
// //     var dataToSend = {};
// //     dataToSend.status = 'successful';
// //     sendResponse(response, dataToSend);	
// //   };
// // };

// var sendResponse = function(response, data){
//   response.end(JSON.stringify(data));
// };

// // //---------------------------------LOGIN_USER_REQUEST---------------------------------//

// var handle_login_user_request = function(request, response){
//   if(gamelist[0].isGameStarted){
//       response.end('{"isGameStarted" : true}');
//     }else{
//       var data = '';
//       request.on('data', function(d){
//         data += d;
//       });
//       request.on('end', function(){
//         if(!isUserExists(request)){
//           addUser(data.substr(5));
//           var dataToBeSent =  { isGameStarted : gamelist[0].isGameStarted,
//                                 numberOfPlayers : gamelist[0].usersInformation.length,
//                               };
//           response.writeHead(200, {'Set-Cookie': data.substr(5)});
//           sendResponse(response, dataToBeSent);
//         }
//         else{
//           var dataToBeSent =  { alreadyConnected : true };
//           sendResponse(response, dataToBeSent);
//         };

//         if(gamelist[0].usersInformation.length == gamelist[0].no_of_players) gamelist[0].isGameStarted = true;
//       });
//     };
// };

// // //---------------------------------PLAY_CARD_REQUEST---------------------------------//

// var drawCardsFromDeck = function(noOfCards){
//   var cards = gamelist[0].draw_pile.drawCards(noOfCards);
//   if(gamelist[0].draw_pile.isEmpty()){
//     var topMostCard = gamelist[0].discard_pile.cards.shift();
//     var allDeckCards = gamelist[0].discard_pile.cards;
//     gamelist[0].draw_pile = new DrawPile(lodash.shuffle(allDeckCards));
//     gamelist[0].discard_pile = new DiscardPile([topMostCard]);
//   };
//   return cards;
// };


// var giveFourCardsToNextPlayer = function(){
//   var nextPlayer = gamelist[0].players.nextPlayer;
//   gamelist[0].user_cards[nextPlayer] = gamelist[0].user_cards[nextPlayer].concat(drawCardsFromDeck(4))
// };

// var doesNextPlayerHavePlustwo = function(){
//   return gamelist[0].user_cards[gamelist[0].players.nextPlayer].some(function(card){
//     return (card.speciality == 'DrawTwo');
//   });
// };

// var givePenaltyCardsTwoNextPlayer = function(penalty){
//   gamelist[0].user_cards[gamelist[0].players.nextPlayer] = gamelist[0].user_cards[gamelist[0].players.nextPlayer].concat(drawCardsFromDeck(penalty));
// };

// var playTheCardThatUserRequested = function(userPlay, request){
//   var cardPlayed = userPlay.playedCard;
//   var userName = request.headers.cookie;
//   var userHand = gamelist[0].user_cards[userName];
//   gamelist[0].user_cards[userName] = removeSelectedCard(cardPlayed, userHand);
//   gamelist[0].discard_pile.addCard(cardPlayed);
//   switch (cardPlayed.speciality){
//     case 'Wild':
//       gamelist[0].runningColour = userPlay.colour;
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//       break;
//     case 'WildDrawFour':
//       gamelist[0].runningColour = userPlay.colour;
//       giveFourCardsToNextPlayer();
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//       break;
//     case 'DrawTwo':
//       gamelist[0].plus_two_cards_count += 2;
//       if(!doesNextPlayerHavePlustwo()){
//         givePenaltyCardsTwoNextPlayer(gamelist[0].plus_two_cards_count);
//         gamelist[0].players.changePlayersTurn();
//         gamelist[0].plus_two_cards_count = 0;
//       };
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//       gamelist[0].runningColour = cardPlayed.colour;
//       break;
//     case null:
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//       gamelist[0].runningColour = cardPlayed.colour;
//       break;
//     case 'Skip':
//       gamelist[0].runningColour = cardPlayed.colour;
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//       break;
//     case 'Reverse':
//       gamelist[0].runningColour = cardPlayed.colour;
//       gamelist[0].players.changeDirection();
//       gamelist[0].players.changePlayersTurn();
//       gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//   };
// };

// var checkAndResetTheUnoField = function(){
//   gamelist[0].said_UNO_registry.forEach(function(player){
//     if(player.said_uno == true){
//       if(gamelist[0].user_cards[player.name].length != 1)
//         player.said_uno = false;
//     };
//   });
// };

// var handle_play_card_request = function(request, response){
//   if(gamelist[0].currentPlayer == request.headers.cookie){
//     var data = '';
//     request.on('data', function(d){
//       data += d;
//     });
//     request.on('end', function(){
//       var userPlay = JSON.parse(data);
//       var cardPlayed = userPlay.playedCard;
//       var discardedCard = gamelist[0].discard_pile.getTopMostCard();
//         if(canPlayerPlayTheCard(cardPlayed, discardedCard, gamelist[0].runningColour, gamelist[0].plus_two_cards_count)){
//           playTheCardThatUserRequested(userPlay, request);
//           checkAndResetTheUnoField();
//           response.statusCode = 200;
//           response.end('successful');
//         }else{
//           response.statusCode = 200;
//           response.end('can_not_play_the_card');
//         }
//     });
//   }else{
//     response.statusCode = 200;
//     response.end('not_your_turn');
//   };

// };

// var handle_draw_card_request = function(request, response){
//   var userName = request.headers.cookie;
//   if(gamelist[0].currentPlayer == userName){
//     var card = drawCardsFromDeck(1);
//     if(card[0] == undefined){
//       response.end('out_of_cards');
//       return;		
//     };
//     gamelist[0].user_cards[userName] = gamelist[0].user_cards[userName].concat(card);
//     response.statusCode = 200;
//     response.end();
      
//   }
//   else{
//     response.statusCode = 200;
//     response.end('not_your_turn');		
//   };
// };

// var handle_say_uno = function(request, response){
//   var playerName = request.headers.cookie;
//   gamelist[0].said_UNO_registry.forEach(function(user){
//     if(user.name == playerName) 
//       console.log('uno is here',user);
//       user.said_uno = true;
//   });
//   response.statusCode = 200;
//   response.end('said_uno_sucessfully')
// };

// var handle_pass_turn_request = function(request, response){
//   gamelist[0].players.changePlayersTurn();
//   gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//   response.statusCode = 200;
//   response.end('turn_passed');
// };

// var givePenalty = function(player, noOfCards){
//   gamelist[0].user_cards[player] = gamelist[0].user_cards[player].concat(drawCardsFromDeck(noOfCards));
//   checkAndResetTheUnoField();
// }

// var handle_catch_uno = function(request, response){
//   var playersCardInfo = getAllUserCardsLength();
//   for(var i = 0; i < playersCardInfo.length; i++){
//     if(playersCardInfo[i].noOfCards == 1){
//       for(var j = 0; j < gamelist[0].said_UNO_registry.length; j++){
//         if(gamelist[0].said_UNO_registry[j].said_uno == false && gamelist[0].said_UNO_registry[j].name == playersCardInfo[i].name){
//             givePenalty(gamelist[0].said_UNO_registry[j].name,2);
//             response.end("uno_catched_successfully");
//             break;
//           }
//       }	
//     }
//   };
//   response.statusCode = 200;
//   response.end("no_one_to_catch_uno");
// };

// //// -----------------------------------------------------------------------------//

// var handle_post_request = function(request, response){
//   switch(request.url){
//     case '/login_user':
//       handle_login_user_request(request, response);
//       break;
//     case '/public/htmlFiles/play_card':
//       handle_play_card_request(request, response);
//       break;
//     case '/public/htmlFiles/draw_card':
//       handle_draw_card_request(request, response);
//       break;
//     case '/public/htmlFiles/pass_turn':
//       handle_pass_turn_request(request, response);
//       break;
//     case '/public/htmlFiles/say_uno':
//       handle_say_uno(request, response);
//       break;
//     case '/public/htmlFiles/catch_uno':
//       handle_catch_uno(request, response);
//     default :
//       response.statusCode = 405;
//       response.end('Method NOT allowed..!!');
//   };
// };

// var removeSelectedCard = function(card, allCards){
//   for(var i = 0; i < allCards.length; i++){
//     if(JSON.stringify(allCards[i]) == JSON.stringify(card)){
//       allCards.splice(i,1);
//       return allCards;
//     };
//   };
// };

// //-------------------------------------------------------------------------------------------//
// var requestHandler = function(gameObject){
//   gamelist = [];
//   return function(request, response){
//     console.log(request.method, request.url);
//     if(request.method == 'GET')
//       handle_get_request(request, response);
//     else if(request.method == 'POST')
//       handle_post_request(request, response);
//   };
// };

// //-------------------------------------------------------------------------------------------//
// var getUserName = function(allInformation){
//   return allInformation.map(function(user){
//     return user.name;
//   });
// };

// // //-------------------------------------UNO_DECK DATA---------------------------------------------//

// var startUno = function(){
//   gamelist[0].said_UNO_registry = [];
//   var shuffledCards = lodash.shuffle(allCards);
//   var deck = new GenerateDeck(shuffledCards);
//   gamelist[0].user_names = getUserName(gamelist[0].usersInformation);
//   gamelist[0].players = new InitializePlayers(gamelist[0].user_names);
//   gamelist[0].currentPlayer = gamelist[0].players.currentPlayer;
//   var dataAfterDistribution = distributeCards(gamelist[0].user_names,shuffledCards);
//   gamelist[0].user_cards = dataAfterDistribution[0];
//   var remainingCards = dataAfterDistribution[1];
//   var cardForDiscardPile = remainingCards.shift();
//   gamelist[0].discard_pile = new DiscardPile([cardForDiscardPile]);
//   gamelist[0].runningColour = (gamelist[0].discard_pile.getTopMostCard().colour) ? (gamelist[0].discard_pile.getTopMostCard().colour) : '';
//   gamelist[0].draw_pile = new DrawPile(remainingCards);

//   gamelist[0].user_names.forEach(function(user){
//     gamelist[0].said_UNO_registry.push({name : user, said_uno : false});
//   });
// };

// //-------------------------------------------------------------------------------------------//
var controller = require('../lib/controller.js');
var server = http.createServer(controller);
// var server = http.createServer(requestHandler(gameObject));
server.listen(3000);

// module.exports = requestHandler; 
