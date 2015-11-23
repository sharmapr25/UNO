var calculate_point = require('../../serverUtilities.js').server.calculatePoints;
console.log(calculate_point);
var allCards = require('../../cardEntities.js').allCards;
var expect = require('chai').expect;
var lodash = require('lodash');

describe('calculatePoint', function(){
	describe('special', function(){
		it('should calculate points for one special card', function(){
			var sampleCard = [{colour:'Red',number:null,speciality:'Skip',points:20}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(20);
		});

		it('should calculate points for two differnt special cards', function(){
			var sampleCards = [{colour:'Green',number:null,speciality:'Reverse',points:20},
							   {colour:'Yellow',number:null,speciality:'DrawTwo',points:20}];
			var points = calculate_point(sampleCards);
			expect(points).to.equal(40);
		});
	});
	
	describe('wild', function(){
		it('should calculate points for one wild card', function(){
			var sampleCard = [{colour:null,number:null,speciality:'Wild',points:50}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(50)
		});

		it('should calculate points for two differnt wild cards', function(){
			var sampleCards = [{colour:null,number:null,speciality:'Wild',points:50},
							   {colour:null,number:null,speciality:'WildDrawFour',points:50}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(100);
		});

		it('should calculate points for one WildDrawFour card', function(){
			var sampleCard = [{colour:null,number:null,speciality:'WildDrawFour',points:50}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(50)
		});
	});
	
	describe('numberd', function(){
		it('should calculate points for one number card', function(){
			var sampleCard = [{colour:"Yellow",number:0,speciality:null,points:0},];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(0)
		});

		it('should calculate points for two differnt number cards', function(){
			var sampleCards = [{colour:"Red",number:2,speciality:null,points:2},
							   {colour:"Yellow",number:7,speciality:null,points:7}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(9);
		});

		it('should calculate points for more than 2 number cards', function(){
			var sampleCards = [{colour:"Red",number:2,speciality:null,points:2},
							   {colour:"Blue",number:9,speciality:null,points:9},
							   {colour:"Green",number:0,speciality:null,points:0},
							   {colour:"Yellow",number:3,speciality:null,points:3}];
			var points = calculate_point(sampleCards)
			expect(points).to.equal(14);
		});
	});

	describe('combination of all cards', function(){
		
		it('should calculate points for two differnt cards', function(){
			var sampleCards = [{colour:"Red",number:null,speciality:'Skip',points:20},
							   {colour:"Yellow",number:7,speciality:null,points:7}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(27);
		});

		it('should calculate points for more than 2 differnt cards', function(){
			var sampleCards = [{colour:"Red",number:null,speciality:'Reverse',points:20},
							   {colour:"Blue",number:9,speciality:null,points:9},
							   {colour:null,number:0,speciality:'Wild',points:50},
							   {colour:"Yellow",number:null,speciality:'DrawTwo',points:20}];
			var points = calculate_point(sampleCards)
			expect(points).to.equal(99);
		});
	});
});