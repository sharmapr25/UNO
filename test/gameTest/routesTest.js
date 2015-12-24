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
        var play_card_info = {playedCard : {colour : 'Red', number : '5', speciality : null, points : 1}};  
        var game = {
          no_of_players : 1,
          usersInformation : [{name : 'Ram'}],
          user_cards : {'Ram' : [{number : '5', colour : 'Red', speciality : null, points : 1}]},
          isGameStarted : true,
          runningColour : 'Red',
          plus_two_cards_count : 0,
          discard_pile : { 
            getTopMostCard : function(){ 
              return {number : '3', colour : 'Red', speciality : null, points : 1}
            },
            addCard : function(card){}
          },
          players : { changePlayersTurn : function(){}},
          currentPlayer : 'Ram',
          said_UNO_registry : []
        };      
         
        request(controller(game))
          .post('/public/htmlFiles/play_card')
          .set('Cookie', 'Ram')
          .send(play_card_info)
          .expect(/successful/)
          .expect(200, done);
      });

      it('should notify the user about invalid_card if the player plays the card that is not valid', function(done){
        var play_card_info = {playedCard : {colour : 'Red', number : '5', speciality : null, points : 1}};  
        var game = {
          no_of_players : 1,
          usersInformation : [{name : 'Ram'}],
          user_cards : {'Ram' : [{number : '5', colour : 'Red', speciality : null, points : 1}]},
          isGameStarted : true,
          runningColour : 'Red',
          plus_two_cards_count : 0,
          discard_pile : { 
            getTopMostCard : function(){ 
              return {number : '3', colour : 'Blue', speciality : null, points : 1}
            },
            addCard : function(card){}
          },
          currentPlayer : 'Ram'
        };      
         
        request(controller(game))
          .post('/public/htmlFiles/play_card')
          .set('Cookie', 'Ram')
          .send(play_card_info)
          .expect(/can_not_play_the_card/)
          .expect(200, done);
      });

      it('should not allow the user to play the card if its not his turn', function(done){
        var play_card_info = {playedCard : {colour : 'Red', number : '5', speciality : null, points : 1}};  
        var game = {
          no_of_players : 2,
          usersInformation : [{name : 'Ram'}, {name : 'Shyam'}],
          user_cards : { 'Ram' : [{number : '5', colour : 'Red', speciality : null, points : 5}],
                         'Shyam' :  [{number : '6', colour : 'Red', speciality : null, points : 6}]

                       },
          currentPlayer : 'Shyam'
        };      
         
        request(controller(game))
          .post('/public/htmlFiles/play_card')
          .set('Cookie', 'Ram')
          .send(play_card_info)
          .expect(/not_your_turn/)
          .expect(200, done); 
      });
    });

    describe('/DrawCard', function(){
      it('should allow the user to draw a card if its his turn', function(done){ 
        var game = {
          currentPlayer : 'Ram',
          draw_pile : { drawCards : function(num){
                          return {number : '1', colour : 'Green', speciality : null, points : 1};
                        },
                        isEmpty : function(){return false;}
                      } 
        };

        request(controller(game))
          .post('/public/htmlFiles/draw_card')
          .set('Cookie', 'Ram')
          .send()
          .expect(200, done); 
      });

      it('should not allow the user to draw a card if its not his turn', function(done){
          var game = {
             currentPlayer : 'Ram'
          };

        request(controller(game))
          .post('/public/htmlFiles/draw_card')
          .set('Cookie', 'Shyam')
          .send()
          .expect('not_your_turn')
          .expect(200, done);  
      });
    });

    describe('/public/htmlFiles/pass_turn', function(){
      it('should allow the user to pass the turn to next player', function(done){
          var game = {
             players : { changePlayersTurn : function(){}}
          };

        request(controller(game))
          .post('/public/htmlFiles/pass_turn')
          .set('Cookie', 'Shyam')
          .expect('turn_passed')
          .expect(200, done);  
      });
    });
  
    describe('say_uno', function(){
      it('should consider the user\'s said_uno request', function(done){
        var game = {
          said_UNO_registry : [ {name : 'Ram', said_uno : false},
                                {name : 'Shyam', said_uno : false}
                              ],
        };

        request(controller(game))
          .post('/public/htmlFiles/say_uno')
          .set('Cookie', 'Ram')
          .expect('said_uno_sucessfully')
          .expect(200, done);

        //test whether the said uno field changed or not
      });
    });
  
    describe('/catch_uno', function(){
      it('should tell the user that he catched uno if any user have 1 card and he didnt say uno', function(done){
         var game = {
          user_names : ['Ram', 'Shyam'],
          user_cards : { Ram : [{}], Shyam : [{}, {}, {}] }, 
          said_UNO_registry : [ {name : 'Ram', said_uno : false},
                                {name : 'Shyam', said_uno : false}
                              ],
          draw_pile : { drawCards : function(num){ return [ {}, {}]},
                        isEmpty : function(){ return false;}
                      }
        };


        request(controller(game))
          .post('/public/htmlFiles/catch_uno')
          .set('Cookie', 'Shyam')
          .expect('uno_catched_successfully')
          .expect(200, done);

        //check whether 2 cards have been added to the player which didnt say uno

      });      
    
      it('should tell the user that no one to catch if the user has said uno', function(done){
          var game = {
          user_names : ['Ram', 'Shyam'],
          user_cards : { Ram : [{}], Shyam : [{}, {}, {}] }, 
          said_UNO_registry : [ {name : 'Ram', said_uno : true},
                                {name : 'Shyam', said_uno : false}
                              ],
          draw_pile : { drawCards : function(num){ return [ {}, {}]},
                        isEmpty : function(){ return false;}
                      }
        };


        request(controller(game))
          .post('/public/htmlFiles/catch_uno')
          .set('Cookie', 'Shyam')
          .expect('no_one_to_catch_uno')
          .expect(200, done); 
      });
    });
    describe('Invalid URL', function(){
      it('should notify the user that the invalid method is not allowed', function(done){
          var game = {};
          request(controller(game))
            .post('/hello')
            .expect('Method NOT allowed..!!')
            .expect(405, done);
      
      });
     });
  });
});
