var areSameSpecialityCards = function(card1, card2){
	return ((card1.speciality == card2.speciality) && card1.speciality != null);
};

//-------------------------------------------------------------------------------------//

var allRules = {};

allRules.areSameColouredCards = function(cardPlayed, discardedCard){
	return ((cardPlayed.colour == discardedCard.colour) && (cardPlayed.colour != null));
};

allRules.areSameNumberedCards = function(cardPlayed, discardedCard){
	return ((cardPlayed.number == discardedCard.number) && (cardPlayed.number != null));	
};

allRules.isWildCardPlayed = function(cardPlayed, discardedCard){
	return (cardPlayed.speciality == 'Wild');
};

allRules.isWildCardOnDeck = function(cardPlayed, discardedCard, runningcolour){
	console.log(runningcolour, discardedCard);
	return ((discardedCard.speciality == 'Wild') && (cardPlayed.colour == runningcolour));
};

allRules.isReverseCardPlayed = function(cardPlayed, discardedCard){
	return ((cardPlayed.speciality == 'Reverse') && (discardedCard.speciality == 'Reverse'));
};

allRules.isSkipCardPlayed = function(cardPlayed, discardedCard){
	return ((cardPlayed.speciality == 'Skip') && (discardedCard.speciality == 'Skip'));
}

exports.allRules = allRules;

var all_rules =  [allRules.areSameColouredCards, 
			   	 allRules.areSameNumberedCards,
			   	 allRules.isWildCardPlayed,
			   	 allRules.isWildCardOnDeck
			   ];

exports.canPlayerPlayTheCard = function(cardPlayed, discardedCard, runningcolour){
	for(var i = 0; i < all_rules.length; i++){
		if(all_rules[i](cardPlayed, discardedCard, runningcolour)){
			return true;
		};
	};
	return false;
};