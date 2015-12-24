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
    describe('/',function(){
      // it('should give the login page if game is not started', function(done){
      //   var game = { isGameStarted : false };
      //   request(controller(game))
      //     .get('/')
      //     .expect(/WELCOME TO UNO/)
      //     .expect(200, done)
      // });

      it('should redirect to page not found if game is already started', function(done){
        var game = { isGameStarted : true }
        request(controller(game))
          .get('/')
          .expect(/Game has already been started..!/)
          .expect(404, done)
      });
    });

    // describe('/favicon.ico',function(){  
    // });

    describe('/updated_login_data',function(){
      it('should give an information of is game started and number of players', function(done){
        game = { usersInformation : [] }
        request(controller(game))
          .get('/updated_login_data')
          .expect(/numberOfPlayers/)
          .expect(200, done)
      });
    });

    // describe('unoTable',function(){
    //   it('should redirect to the login page if game is not started', function(done){
    //     var game = { isGameStarted : false }
    //     request(controller(game))
    //       .get('/public/htmlFiles/unoTable.html')
    //       .expect(/WELCOME TO UNO/)
    //       .expect(302, done)
    //   });
    // });

    describe('/all_information_on_table',function(){
      it('should give all required information to updated the table', function(done){
        var game = {
          user_cards : { Raviraj : [{}]},
          no_of_players : 1,
          usersInformation : [{ name : 'Raviraj'}],
          isGameStarted : true,
          runningColour : 'Red',
          discard_pile : {getTopMostCard : function(){return {}}},
          said_UNO_registry : [],
          user_names : ['Raviraj'],
          players : {currentPlayer : 'Raviraj'}
        };
        request(controller(game))
          .get('/public/htmlFiles/all_information_on_table')
          .set('Cookie', 'Raviraj') 
          .expect(/runningColour/)
          .expect(200, done)
      });

      it('should not give information if player is not login ', function(done){
        var game = {
          usersInformation : [],
          isGameStarted : true,
        };
        request(controller(game))
            .get('/public/htmlFiles/all_information_on_table')
            .expect(/Oops..!!Something went wrong..!/)
            .expect(404, done)
      });
    });

    // describe('close deck',function(done){
    //     // /close_face.png
    // });

    // describe('open deck',function(){
    //   //cover svg images..
    // });

    // describe('/all_information_on_table',function(){
    // });

    describe('winers page',function(){
      it.skip('should give winers page if user is login and game is over', function(done) {
          var game = {
            user_cards : { Kalidas : []},
            no_of_players : 1,
            usersInformation : [{ name : 'Kalidas'}],
            isGameStarted : true
          };
        request(controller(game))
            .get('/public/htmlFiles/winners.html')
            .set('Cookie', 'Kalidas') 
            .expect(/<table id='table'>/)
            .expect(200, done)
      });

      it('should not give winers page if user is not login', function(done) {
         var game = {
          usersInformation : [],
          isGameStarted : true,
        };
        request(controller(game))
            .get('/public/htmlFiles/winners.html')
            .expect(/Sorry.. Login First..!!/)
            .expect(404, done)
      });
    });
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
