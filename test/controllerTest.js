var chai = require('chai').assert;
var controller = require('../lib/controller.js');
var request = require('supertest');

describe('/',function(){
	it('should redirect to login page',function(done){
		request(controller)
		.get('/')
		.expect('location','/htmlFiles/login.html')
		.expect(302,done)
	});
});


