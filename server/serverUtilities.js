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

server.validateCard = function (player_card,card_on_deck) {
	var matches = [ ((player_card.number == card_on_deck.number) && (player_card.number != null)), 
					((player_card.colour == card_on_deck.colour) && (player_card.colour != null)),
					((player_card.speciality == card_on_deck.speciality) && (player_card.speciality != null)),
					player_card.speciality == 'Wild',
					player_card.speciality == 'WildDrawFour'						
				  ];
	return (matches.indexOf(true) >= 0);
};

exports.server = server;