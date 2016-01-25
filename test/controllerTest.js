var chai = require('chai').assert;
var app = require('../lib/controller.js');
var request = require('supertest');

describe('/',function(){
	it('should redirect to login page',function(done){
		request(app)
		.get('/')
		.expect('location','/htmlFiles/login.html')
		.expect(302,done)
	});
});

describe("/login_user",function(){
	it('should set cookie when request received',function(done){
		var cookie = {name:'brindaban'};
		request(app)
			.post('/htmlFiles/login_user')
			.send('name=brindaban')
			.end(done)
	});
});


