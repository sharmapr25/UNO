var lodash = require('lodash');

var Card = function (colour,number,speciality,points) {
	this.colour = colour;
	this.number = number;
	this.speciality = speciality;
	this.points = points;
};

var generateNumberedCard = function (colour) {
	var pilesOfCard = [];
	for (var index = 0; index < 10; index++) {
		pilesOfCard.push(new Card(colour,index,null,index));
		if (index)
			pilesOfCard.push(new Card(colour,index,null,index));
	};
	return pilesOfCard;
};

var genrateSpecialCard = function(colour,specialities,points) {
	return specialities.map(function(speciality){
		var array = [];
		for (var i = 0; i < 2; i++) {
			array.push(new Card(colour,null,speciality,points));
		};
		return array;
	});
};

var genrateWildCard = function (speciality,points) {
	var pilesOfCard = [];
	for (var i = 0; i < 4; i++) {
		pilesOfCard.push(new Card(null,null,speciality,points));
	};
	return pilesOfCard;
};

var genrateAllCard = function (cardsInfo) {
	var collectionOfAllCards = [];

	cardsInfo.coloursOfCard.forEach(function (colour) {
		collectionOfAllCards.push(generateNumberedCard(colour));
	})

	cardsInfo.coloursOfCard.forEach(function (colour) {
			collectionOfAllCards.push(genrateSpecialCard(colour,cardsInfo.specialCard.speciality,cardsInfo.specialCard.points))
	});

	cardsInfo.wildCard.speciality.forEach(function (wildName) {
		collectionOfAllCards.push(genrateWildCard(wildName,cardsInfo.wildCard.points));
	});

	return lodash.flattenDeep(collectionOfAllCards);
};

var cardsInfo = {
	coloursOfCard:['Red','Blue','Green','Yellow'],
	specialCard:{speciality:['Reverse','Skip','DrawTwo'],points:20},
	wildCard:{speciality:['Wild','WildDrawFour'],points:50}
};

exports.allCards = genrateAllCard(cardsInfo);

//--------------------------------------------------------------------------------------------------------------//

var DiscardPile = function(cards) {
	this.cards = cards;
};

DiscardPile.prototype = {
	addCard : function(card){
		this.cards.unshift(card);
	},

	getTopMostCard : function() {
		return this.cards[0];
	}
};

exports.DiscardPile = DiscardPile;

//----------------------------------------------GenerateDeck-----------------------------------------------//

var GenerateDeck = function (allCards) {
	this.cards = allCards;
};

GenerateDeck.prototype = {
	isFull:function () {
		return (this.cards.length == 108);
	},
	isEmpty:function () {
		return (this.cards.length == 0);
	},
	shuffleCards:function () {
		return new GenerateDeck(lodash.shuffle(this.cards));
	},
	drawCard:function () {
		return this.cards.shift();
	}
};

exports.GenerateDeck = GenerateDeck;

//----------------------------------------------DrawPile------------------------------------------------------//

var DrawPile = function (allCards) {
	this.cards = allCards;
};

DrawPile.prototype ={
	drawCards : function (number) {
		var drawnCard = [];
		for (var i = 0; i < number; i++) {
			drawnCard.push(this.cards.shift());
		};
		return drawnCard;
	},
	isEmpty : function () {
		return (this.cards.length == 0);
	}
};

exports.DrawPile = DrawPile;
