var addressGenrator = require('../../server/serverUtilities.js').server.addressGenrator;
var lodash = require('lodash');
var expect = require('chai').expect;

describe('addressGenrator', function(){
	it('should return a string that is the path of the image',function () {
		expect(addressGenrator({colour :'Yellow', number : 0, speciality : null, points: 0})).to.be.a('string');
	});

	describe('numberCard',function () {
		it('should return a path for numberCard',function () {
			expect(addressGenrator({colour :'Red', number : 3, speciality : null, points: 3})).to.equal('/public/images/allCards/red_3.png');
		});
	});

	describe('specialCard',function () {
		it('should return a path for specialCard',function () {
			expect(addressGenrator({colour :'Red', number : null, speciality : 'Skip', points: 20})).to.equal('/public/images/allCards/red_skip.png');
			expect(addressGenrator({colour :'Blue', number : null, speciality : 'Reverse', points: 20})).to.equal('/public/images/allCards/blue_reverse.png');
			expect(addressGenrator({colour :'Green', number : null, speciality : 'DrawTwo', points: 20})).to.equal('/public/images/allCards/green_drawtwo.png');
		});
	});

	describe('wildCard',function () {
		it('should return a path for wildCard',function () {
			expect(addressGenrator({colour : null, number : null, speciality : 'wild', points: 50})).to.equal('/public/images/allCards/wild.png');
			expect(addressGenrator({colour : null, number : null, speciality : 'wildDrawFour', points: 50})).to.equal('/public/images/allCards/wilddrawfour.png');
		});
	});
});