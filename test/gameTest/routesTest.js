var controller = require('../../server/server.js');
// var game = {
  // no_of_players : 1,
  // usersInformation : [],
  // user_names : undefined,
  // user_cards : undefined,
  // discard_pile : undefined,
  // draw_pile : undefined,
  // isGameStarted : false,
  // players : undefined,
  // runningColour : undefined,
  // currentPlayer : undefined,
  // plus_two_cards_count : 0,
  // said_UNO_registry : []
// };


var request = require('supertest');

describe('Routes', function(){
  describe('GET', function(){
  });

  describe('POST', function(){
    describe('/login_user', function(){ 
      it('should notify the player when the player is already connected', function(done){
        var user_credentials = {name : 'Ram'};

        var game = {
          no_of_players : 2,
          usersInformation : [{ name : 'Ram'}],
          isGameStarted : false,
        };

        request(controller(game))
          .post('/login_user')
          .set('Cookie', user_credentials.name)
          .send(user_credentials)  
          .expect(/alreadyConnected/)
          .expect(/true/)
          .expect(200, done);
      });

      it('should tell the new user that game has started if so..', function(done){
         var user_credentials = {name : 'Ram'};

        var game = {
          no_of_players : 2,
          usersInformation : [{ name : 'Sayan'}, { name : 'Ching Chong' }],
          isGameStarted : true,
        };

        request(controller(game))
          .post('/login_user')
          .send(user_credentials)  
          .expect(/isGameStarted/)
          .expect(/true/)
          .expect(200, done);
      });
      
      it('should add the new user in a game and returns the game status', function(done){
        var user_credentials = {name : 'Ram'};

        var game = {
          no_of_players : 2,
          usersInformation : [{ name : 'R'}],
          isGameStarted : false,
        };

        request(controller(game))
          .post('/login_user')
          .send(user_credentials)  
          .expect(/isGameStarted/)
          .expect(/false/)
          .expect(/"numberOfPlayers":2/)
          .expect(200, done);
      }); 
    });
    
    describe('/play_card', function(){
      it('plays the card if the card that the player plays is allowed', function(done){
        var play_card_info = {playedCard : {colour : 'Red', number : 10, speciality : null, points : 10}};  
        done();
      });
    });
  });
});
