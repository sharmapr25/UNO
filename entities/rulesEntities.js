var areSameSpecialityCards = function(card1, card2){
	return ((card1.speciality == card2.speciality) && card1.speciality != null);
};

//-------------------------------------------------------------------------------------//

var areSameColouredCards = function(cardPlayed, discardedCard, colour, penalty){
	return ((cardPlayed.colour == discardedCard.colour) 
		&& (cardPlayed.colour != null)
		&& (penalty == 0));
};

var areSameNumberedCards = function(cardPlayed, discardedCard){
	return ((cardPlayed.number == discardedCard.number) && (cardPlayed.number != null));	
};

var isWildCardPlayed = function(cardPlayed, discardedCard){
	return ((cardPlayed.speciality == 'Wild') || (cardPlayed.speciality == 'WildDrawFour'));
};

var isWildCardOnDeck = function(cardPlayed, discardedCard, runningcolour){
	return (((discardedCard.speciality == 'Wild')
		|| (discardedCard.speciality == 'WildDrawFour')) 
		&& (cardPlayed.colour == runningcolour));
};

var canPlayerPlayPlusTwo = function(cardPlayed, discardedCard){
	return ((cardPlayed.speciality == discardedCard.speciality) 
		&& (cardPlayed.speciality != null));
};

var allRules = [ areSameColouredCards, 
			   	 areSameNumberedCards,
			   	 isWildCardPlayed,
			   	 isWildCardOnDeck,
			   	 canPlayerPlayPlusTwo
			   ];

exports.canPlayerPlayTheCard = function(cardPlayed, discardedCard, runningcolour, penalty){
	for(var i = 0; i < allRules.length; i++){
		if(allRules[i](cardPlayed, discardedCard, runningcolour, penalty)){
			return true;
		};
	};
	return false;
};
