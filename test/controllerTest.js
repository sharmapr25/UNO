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

describe('/public/css/login.css',function(){
	it('should gives css for login page',function(done){
		request(controller)
		.get('/public/css/login.css')
		.expect('location','/css/login.css')
		.expect(302,done)
	});
});

describe('/public/javaScript/login.js',function(){
	it('should gives javaScript for login page',function(done){
		request(controller)
		.get('/public/javaScript/login.js')
		.expect('location','/javaScript/login.js')
		.expect(302,done)
	});
});
