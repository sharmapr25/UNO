var calculate_point = require('../entities.js').calculatePoint;
var allCards = require('../entities.js').allCards;
var expect = require('chai').expect;
var lodash = require('lodash');

describe('calculatePoint', function(){
	describe('special', function(){
		it('should calculate points for one special card', function(){
			var sampleCard = [{colour:'Red',number:null,speciality:'Skip'}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(20);
		});

		it('should calculate points for two differnt special cards', function(){
			var sampleCards = [{colour:'Green',number:null,speciality:'Reverse'},
							   {colour:'Yellow',number:null,speciality:'DrawTwo'}];
			var points = calculate_point(sampleCards);
			expect(points).to.equal(40);
		});
	});
	
	describe('wild', function(){
		it('should calculate points for one wild card', function(){
			var sampleCard = [{colour:null,number:null,speciality:'Wild'}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(50)
		});

		it('should calculate points for two differnt wild cards', function(){
			var sampleCards = [{colour:null,number:null,speciality:'Wild'},
							   {colour:null,number:null,speciality:'WildDrawFour'}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(100);
		});

		it('should calculate points for one WildDrawFour card', function(){
			var sampleCard = [{colour:null,number:null,speciality:'WildDrawFour'}];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(50)
		});
	});
	
	describe('numberd', function(){
		it('should calculate points for one number card', function(){
			var sampleCard = [{colour:"Yellow",number:0,speciality:null},];
			var points = calculate_point(sampleCard)
			expect(points).to.equal(0)
		});

		it('should calculate points for two differnt number cards', function(){
			var sampleCards = [{colour:"Red",number:2,speciality:null},
							   {colour:"Yellow",number:7,speciality:null}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(9);
		});

		it('should calculate points for more than 2 number cards', function(){
			var sampleCards = [{colour:"Red",number:2,speciality:null},
							   {colour:"Blue",number:9,speciality:null},
							   {colour:"Green",number:0,speciality:null},
							   {colour:"Yellow",number:3,speciality:null}];
			var points = calculate_point(sampleCards)
			expect(points).to.equal(14);
		});
	});

	describe('combination of all cards', function(){
		
		it('should calculate points for two differnt cards', function(){
			var sampleCards = [{colour:"Red",number:null,speciality:'Skip'},
							   {colour:"Yellow",number:7,speciality:null}];
			var points = calculate_point(sampleCards)
				expect(points).to.equal(27);
		});

		it('should calculate points for more than 2 differnt cards', function(){
			var sampleCards = [{colour:"Red",number:null,speciality:'Reverse'},
							   {colour:"Blue",number:9,speciality:null},
							   {colour:null,number:0,speciality:'Wild'},
							   {colour:"Yellow",number:null,speciality:'DrawTwo'}];
			var points = calculate_point(sampleCards)
			expect(points).to.equal(99);
		});
	});
});