var canPlayerPlayTheCard = require('../uno/canPlayerPlayTheCard.js').canPlayerPlayTheCard;
var allCards = require('../uno/generateAllCards.js').allCards;
var expect = require('chai').expect;

describe('canPlayerPlayTheCard', function(){

	describe('for colour', function(){

		it('should return false if both cards are of not same colour', function(){
		var user_card = {colour:"Red",number:3,speciality:null};
		var card_on_deck = {colour:"Yellow",number:9,speciality:null};
		var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(false);
		});

		it('should return true if both cards are of red colour', function(){
		var user_card = {colour:"Red",number:2,speciality:null};
		var card_on_deck = {colour:"Red",number:6,speciality:null};
		var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both cards are of yellow colour', function(){
		var user_card = {colour:"Yellow",number:0,speciality:null};
		var card_on_deck = {colour:"Yellow",number:6,speciality:null};
		var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both cards are of green colour', function(){
		var user_card = {colour:"Green",number:4,speciality:null};
		var card_on_deck = {colour:"Green",number:5,speciality:null};
		var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both cards are of blue colour', function(){
		var user_card = {colour:"Blue",number:8,speciality:null};
		var card_on_deck = {colour:"Blue",number:6,speciality:null};
		var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});
	});

	describe('for number', function(){

		it('should return false for both differnt numbers and differnt colours', function(){
			var user_card_1 = {colour:"Yellow",number:8,speciality:null};
			var card_on_deck_1 = {colour:"Blue",number:1,speciality:null};
			var user_card_2 = {colour:"Red",number:0,speciality:null};
			var card_on_deck_2 = {colour:"Green",number:6,speciality:null};
			var can_play_the_card_1 = canPlayerPlayTheCard (user_card_1,card_on_deck_1);
			var can_play_the_card_2 = canPlayerPlayTheCard (user_card_2,card_on_deck_2);
			expect(can_play_the_card_1).to.equal(false);
			expect(can_play_the_card_2).to.equal(false);
		});

		it('should return true if both card have number 0 and differnt colours', function(){
			var user_card = {colour:"Yellow",number:0,speciality:null};
			var card_on_deck = {colour:"Blue",number:0,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 1 and differnt colours', function(){
			var user_card = {colour:"Green",number:1,speciality:null};
			var card_on_deck = {colour:"Blue",number:1,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 2 and differnt colours', function(){
			var user_card = {colour:"Red",number:2,speciality:null};
			var card_on_deck = {colour:"Blue",number:2,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 3 and differnt colours', function(){
			var user_card = {colour:"Yellow",number:3,speciality:null};
			var card_on_deck = {colour:"Blue",number:3,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 4 and differnt colours', function(){
			var user_card = {colour:"Yellow",number:4,speciality:null};
			var card_on_deck = {colour:"Red",number:4,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 5 and differnt colours', function(){
			var user_card = {colour:"Green",number:5,speciality:null};
			var card_on_deck = {colour:"Blue",number:5,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 6 and differnt colours', function(){
			var user_card = {colour:"Yellow",number:6,speciality:null};
			var card_on_deck = {colour:"Green",number:6,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 7 and differnt colours', function(){
			var user_card = {colour:"Red",number:7,speciality:null};
			var card_on_deck = {colour:"Yellow",number:7,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 8 and differnt colours', function(){
			var user_card = {colour:"Green",number:8,speciality:null};
			var card_on_deck = {colour:"Red",number:8,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

		it('should return true if both card have number 9 and differnt colours', function(){
			var user_card = {colour:"Yellow",number:9,speciality:null};
			var card_on_deck = {colour:"Blue",number:9,speciality:null};
			var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
			expect(can_play_the_card).to.equal(true);
		});

	});

	describe('for special', function(){

		describe('for DrawTwo', function(){

			it('should return true if both cards are draw two cards', function(){
				var user_card = {colour:"Red",number:null,speciality:"DrawTwo"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"DrawTwo"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return false if card on deck is draw card and user card is noraml colour card', function(){
				var user_card = {colour:"Blue",number:3,speciality:null};
				var card_on_deck = {colour:"Green",number:null,speciality:"DrawTwo"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});

			it('should return false if card on deck is draw card and user card is any special card except DrawTwo card', function(){
				var user_card = {colour:"Blue",number:null,speciality:"Reverse"};
				var card_on_deck = {colour:"Red",number:null,speciality:"DrawTwo"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});
		});

		describe('for Skip', function(){

			it('should return true if both cards are Skip cards', function(){
				var user_card = {colour:"Green",number:null,speciality:"Skip"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"Skip"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return true if card on deck is Skip card and user card is same colour card of any number', function(){
				var user_card = {colour:"Red",number:7,speciality:null};
				var card_on_deck = {colour:"Red",number:null,speciality:"Skip"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return false if card on deck is Skip card and user card is differnt colour card than the colour of Skip card', function(){
				var user_card = {colour:"Red",number:7,speciality:null};
				var card_on_deck = {colour:"Green",number:null,speciality:"Skip"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});

			it('should return false if card on deck is Skip card and user card is any special card of differnt colour', function(){
				var user_card = {colour:"Green",number:null,speciality:"Reverse"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"Skip"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});
		});

		describe('for Reverse', function(){

				it('should return true if both cards are Reverse cards', function(){
				var user_card = {colour:"Red",number:null,speciality:"Reverse"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"Reverse"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return true if card on deck is Reverse card and user card is same colour card of any number', function(){
				var user_card = {colour:"Red",number:7,speciality:null};
				var card_on_deck = {colour:"Red",number:null,speciality:"Reverse"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return false if card on deck is Reverse card and user card is differnt colour card than the colour of Skip card', function(){
				var user_card = {colour:"Red",number:7,speciality:null};
				var card_on_deck = {colour:"Green",number:null,speciality:"Reverse"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});

			it('should return true if card on deck is Reverse card and user card is any special card of same colour', function(){
				var user_card = {colour:"Blue",number:null,speciality:"DrawTwo"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"Reverse"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(true);
			});

			it('should return false if card on deck is Reverse card and user card is any special card of differnt colour', function(){
				var user_card = {colour:"Green",number:null,speciality:"Skip"};
				var card_on_deck = {colour:"Blue",number:null,speciality:"Reverse"};
				var can_play_the_card = canPlayerPlayTheCard (user_card,card_on_deck);
				expect(can_play_the_card).to.equal(false);
			});
		});
	});
});