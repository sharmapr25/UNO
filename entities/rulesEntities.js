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

var allRules = [ areSameColouredCards, 
			   	 areSameNumberedCards,
			   ];

exports.canPlayerPlayTheCard = function(cardPlayed, discardedCard){
	for(var i = 0; i < allRules.length; i++){
		if(allRules[i](cardPlayed, discardedCard)){
			return true;
		};
	};
	return false;
};
