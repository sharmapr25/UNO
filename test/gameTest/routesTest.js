var controller = require('../../server/server.js');

var request = require('supertest');

describe('Routes', function(){
  describe('GET', function(){
  });
  describe('POST', function(){
    describe('/login_user', function(){
      it('should add the new user in a game and returns the game status', function(done){
        var user_credentials = {name : 'Ganesh'};
        request(controller)
          .post('/login_user')
          .send(user_credentials)
          .expect(/isGameStarted/) 
          .expect(/numberOfPlayers/) 
          .expect(/false/) 
          .expect(/1/) 
          .expect(200, done);
      });
   });
  });
});
