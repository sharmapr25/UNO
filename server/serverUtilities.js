var server = {};

var makePlayersField = function (players) {
	var playersCard = {};
	players.forEach(function (singlePlayer) {
		playersCard[singlePlayer] = [];
	});
	return playersCard;
};

server.distributeCards = function (playersName,allcards) {
	var remainingCards = allcards;
	var presentPlayers = makePlayersField(playersName);

	for (var i = 0; i < 7; i++) {
		for(var prop in presentPlayers){
			presentPlayers[prop].push(remainingCards.shift());
		};
	};

	return [presentPlayers,remainingCards];
};

server.calculatePoints = function (playersCard) {
	if(playersCard.length == 0) return 0;
	if (playersCard.length == 1) {return playersCard[0].points}
	else{
		var result = playersCard.reduce(function (card1,card2) {
			return {points: card1.points + card2.points};
		});
		return result.points;
	};
};

server.removeCardFromTheUsersCards = function (cardToremove,userCards) {
	return userCards.filter(function(card){ 
		return !(JSON.stringify(card) == JSON.stringify(cardToremove));
	});
};

exports.server = server;