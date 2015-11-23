var expect = require('chai').expect;
var lodash = require('lodash');
var allCards = require('../../entities/cardEntities.js').allCards;

//-------------------------------------------------------------------------------------------------------------//

describe('allCards', function(){
	describe('Deck_Of_Cards', function(){
		it('should contain 108 cards', function(){
			expect(allCards.length).to.equal(108);
		});
	});
	
	describe('A_Single_Pack_Of_All_Cards', function(){
		it('should contain all cards in a single array', function(){
			expect(allCards).to.be.an('array');
		});
	});
	
	describe('Card', function(){
		it('should be an object', function(){
			allCards.forEach(function(card){
				expect(card).to.be.an('object');
			});
		});
		it('should contain only three fields that are colour, number and speciality', function(){
			allCards.forEach(function(card){
				expect(card).to.include.keys('colour', 'number', 'speciality');
				/*
				The number of fields in a card are tested along with the fields that it have..
				As because the test will pass only if the array has same number of and same elements..
				*/
			});
		});
	});

	describe('Number_Cards', function(){
		describe('All_Number_Cards', function(){
			it('there should be 76 numbered cards', function(){
				var numberCards = lodash.filter(allCards, lodash.matches({ speciality: null}));;
				expect(numberCards.length).to.equal(76);
			});
		});

		describe('Red_Number_cards', function(){

			it('there should be 19 red number cards', function(){
				var redNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Red'}));;
				expect(redNumberCards.length).to.equal(19);
			});

			it('there should be only 1 ZERO number card', function(){
				var redNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Red'}));;
				expect(redNumberCards).to.deep.include.members([{colour : 'Red', number : 0, speciality : null, points: 0}]);
				var redZero = 0;
				redNumberCards.forEach(function(card){
					if(card.number == 0)
						redZero++;
				});
				expect(redZero).to.equal(1);
			});

			it('there should be 2 cards of each number from 1 to 9', function(){
				var redNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Red'}));;
				for(var i =1; i <= 9; i++){
					var count = 0;
					redNumberCards.forEach(function(card){
						if(card.number == i)
							count++;
					});
					expect(count).to.equal(2);
				};
			});

		});

		describe('Blue_Number_cards', function(){

			it('there should be 19 Blue number cards', function(){
				var blueNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Blue'}));;
				expect(blueNumberCards.length).to.equal(19);
			});

			it('there should be only 1 ZERO number card', function(){
				var blueNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Blue'}));;

				expect(blueNumberCards).to.deep.include.members([{colour : 'Blue', number : 0, speciality : null, points: 0}]);
				var blueZero = 0;
				blueNumberCards.forEach(function(card){
					if(card.number == 0)
						blueZero++;
				});
				expect(blueZero).to.equal(1);
			});

			it('there should be 2 cards of each number from 1 to 9', function(){
				var blueNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Blue'}));;

				for(var i =1; i <= 9; i++){
					var count = 0;
					blueNumberCards.forEach(function(card){
						if(card.number == i)
							count++;
					});
					expect(count).to.equal(2);
				};
			});

		});

		describe('Green_Number_cards', function(){

			it('there should be 19 Green number cards', function(){
				var greenNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Green'}));;
				expect(greenNumberCards.length).to.equal(19);
			});

			it('there should be only 1 ZERO number card', function(){
				var greenNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Green'}));;
				expect(greenNumberCards).to.deep.include.members([{colour : 'Green', number : 0, speciality : null, points: 0}]);
				var greenZero = 0;
				greenNumberCards.forEach(function(card){
					if(card.number == 0)
						greenZero++;
				});
				expect(greenZero).to.equal(1);
			});

			it('there should be 2 cards of each number from 1 to 9', function(){
				var greenNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Green'}));;
				for(var i =1; i <= 9; i++){
					var count = 0;
					greenNumberCards.forEach(function(card){
						if(card.number == i)
							count++;
					});
					expect(count).to.equal(2);
				};
			});

		});

		describe('Yellow_Number_cards', function(){

			it('there should be 19 Yellow number cards', function(){
				var yellowNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Yellow'}));;
				expect(yellowNumberCards.length).to.equal(19);
			});

			it('there should be only 1 ZERO number card', function(){
				var yellowNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Yellow'}));;
				expect(yellowNumberCards).to.deep.include.members([{colour : 'Yellow', number : 0, speciality : null, points: 0}]);
				var yellowZero = 0;
				yellowNumberCards.forEach(function(card){
					if(card.number == 0)
						yellowZero++;
				});
				expect(yellowZero).to.equal(1);
			});

			it('there should be 2 cards of each number from 1 to 9', function(){
				var yellowNumberCards = lodash.filter(allCards, lodash.matches({ speciality: null, colour: 'Yellow'}));;
				for(var i =1; i <= 9; i++){
					var count = 0;
					yellowNumberCards.forEach(function(card){
						if(card.number == i)
							count++;
					});
					expect(count).to.equal(2);
				};
			});

		});
	});
	
	describe('Special_Cards', function(){
		describe('Reverse', function(){
			it('there should be 8 reverse cards in a pack', function(){
				var allReverseCards = lodash.filter(allCards, lodash.matches({ speciality: 'Reverse', number: null}));;
				expect(allReverseCards.length).to.equal(8);
			});

			it('should contain 2 reverse cards of each colour', function(){
				var allReverseCards = lodash.filter(allCards, lodash.matches({ speciality: 'Reverse', number: null}));;
				var allColours = ['Red', 'Green', 'Yellow', 'Red'];

				allColours.forEach(function(cardColour){
					var count = 0;
					allReverseCards.forEach(function(reverseCard){
						if(reverseCard.colour == cardColour)
							count++;
					});
					expect(count).to.equal(2);
				});
			});
		});


		describe('Skip', function(){
			it('there should be 8 skip cards in a pack', function(){
				var allSkipCards = lodash.filter(allCards, lodash.matches({ speciality: 'Skip', number: null}));;
				expect(allSkipCards.length).to.equal(8);
			});

			it('should contain 2 Skip cards of each colour', function(){
				var allSkipCards = lodash.filter(allCards, lodash.matches({ speciality: 'Skip', number: null}));;
				var allColours = ['Red', 'Green', 'Yellow', 'Red'];

				allColours.forEach(function(cardColour){
					var count = 0;
					allSkipCards.forEach(function(skipCard){
						if(skipCard.colour == cardColour)
							count++;
					});
					expect(count).to.equal(2);
				});
			});
		});

		describe('DrawTwo', function(){
			it('there should be 8 DrawTwo cards in a pack', function(){
				var allDrawTwoCards = lodash.filter(allCards, lodash.matches({ speciality: 'DrawTwo', number: null}));;
				expect(allDrawTwoCards.length).to.equal(8);
			});

			it('should contain 2 DrawTwo cards of each colour', function(){
				var allDrawTwoCards = lodash.filter(allCards, lodash.matches({ speciality: 'DrawTwo', number: null}));;
				var allColours = ['Red', 'Green', 'Yellow', 'Red'];

				allColours.forEach(function(cardColour){
					var count = 0;
					allDrawTwoCards.forEach(function(drawTwo){
						if(drawTwo.colour == cardColour)
							count++;
					});
					expect(count).to.equal(2);
				});
			});
		});
	});
	
	describe('Wild_Cards', function(){
		describe('Wild', function(){
			it('should be total 4 wild cards', function(){
				var wildCards = lodash.filter(allCards, lodash.matches({ speciality:'Wild'}));;
				expect(wildCards.length).to.equal(4);
			});

			it('wild cards should contain colour field as null', function(){
				var wildCards = lodash.filter(allCards, lodash.matches({ speciality:'Wild'}));;
				wildCards.forEach(function(wildCard){
					expect(wildCard.colour).to.be.a('null');
				});
			});
		});

		describe('WildDrawFour', function(){
			it('should be total 4 WildDrawFour cards', function(){
				var wildDrawFourCards = lodash.filter(allCards, lodash.matches({ speciality:'WildDrawFour'}));;
				expect(wildDrawFourCards.length).to.equal(4);
			});

			it('wildDrawFour cards should contain colour field as null', function(){
				var wildDrawFourCards = lodash.filter(allCards, lodash.matches({ speciality:'WildDrawFour'}));;
				wildDrawFourCards.forEach(function(wildCard){
					expect(wildCard.colour).to.be.a('null');
				});
			});
		});
	});
});