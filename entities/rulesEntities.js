var areSameSpecialityCards = function(card1, card2){
	return ((card1.speciality == card2.speciality) && card1.speciality != null);
};

//-------------------------------------------------------------------------------------//

var areSameColouredCards = function(cardPlayed, discardedCard){
	return ((cardPlayed.colour == discardedCard.colour) && (cardPlayed.colour != null));
};

var areSameNumberedCards = function(cardPlayed, discardedCard){
	return ((cardPlayed.number == discardedCard.number) && (cardPlayed.number != null));	
};

var isWildCardPlayed = function(cardPlayed, discardedCard){
	return (cardPlayed.speciality == 'Wild');
};

var isWildCardOnDeck = function(cardPlayed, discardedCard, runningcolour){
	console.log(runningcolour, discardedCard);
	return ((discardedCard.speciality == 'Wild') && (cardPlayed.colour == runningcolour));
};

var allRules = [ areSameColouredCards, 
			   	 areSameNumberedCards,
			   	 isWildCardPlayed,
			   	 isWildCardOnDeck
			   ];

exports.canPlayerPlayTheCard = function(cardPlayed, discardedCard, runningcolour){
	for(var i = 0; i < allRules.length; i++){
		if(allRules[i](cardPlayed, discardedCard, runningcolour)){
			return true;
		};
	};
	return false;
};
