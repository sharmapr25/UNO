var addressGenrator = function (card) {
	var type,colour;
	(card.speciality) ? (type = card.speciality.toLowerCase()) : (type = card.number);
	(card.colour) ? (colour = card.colour.toLowerCase()+"_") : (colour = "");
	return "/public/images/allCards/"+colour+type+".png";
};

var generateTable  = function(userInfo) {
	var user_info = userInfo.map(function (eachUser) {
		return "<tr><td>"+eachUser.name+"</td><td>"+eachUser.noOfCards+"</td></tr>";
	});
	var tableHead = "<tr><th>Name&nbsp;&nbsp;&nbsp;</th><th>Number Of Card</th></tr>"
	return "<table id='table'>"+tableHead+user_info.join('')+"</table>";
};

var createDiv = function(nameOfDiv){
	var iDiv = document.createElement('div');
	iDiv.id = nameOfDiv;
	document.body.appendChild(iDiv);
};

var make_request_to_play_the_card = function(id){
	var indexOfPlayedcard = id.substr(9);
	var playedCard = userCards[indexOfPlayedcard];
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	    	if(req.responseText == 'successful')
	    		sendConnectionRequest();
	    	else if(req.responseText == 'can_not_play_the_card')
	    		alert('Invalid Card..!!!');
	    };
	};
	req.open('POST', 'play_card', true);
	req.send(JSON.stringify(playedCard));
};

var make_request_to_draw_a_card = function(){
	alert('drw');
	//send a request to draw the card..
};

var make_request_to_say_uno = function(){
	alert('said UNO');
	//request to say UNO
};

var make_request_to_catch_uno = function(){
	alert('catch UNO');
	//request to catch uno
};

var userCards;
var flag = true;
var showedRanks = false;
var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	        var comments = JSON.parse(req.responseText);
	        console.log('whole response is', comments);
	        userCards = comments.userCards;
	        
	        if(comments.isEndOfGame){
	        	if(!showedRanks) {
	        		alert('Game End..!!');
	        		showedRanks = true;
		        	window.location = 'winners.html';
	        	};
	        };

	        if(flag){
	        	var e = document.getElementById('loading');
	        	document.body.removeChild(e);

		  		createDiv('all_user_cards_info');
		  		createDiv('All_pile');
		  		createDiv('current_player');
		  		createDiv('next_player');
		  		createDiv('previous_player');
		  		createDiv('running_colour');
		  		createDiv('User_Cards_Name');
		  		createDiv('my_cards');
		  		createDiv('say_UNO');
		  		createDiv('catch_UNO');
		  		createDiv('running_colour');

	        	document.getElementById('say_UNO').onclick = function(){ 
	        		alert('said UNO');
			  		//will make a request to say the uno
			  	};
			  	document.getElementById('say_UNO').innerHTML = 'SAY UNO';
		    
	        	document.getElementById('catch_UNO').onclick = function(){ 
			  		//will make a request to catch the uno
			  	};
			  	document.getElementById('catch_UNO').innerHTML = 'CATCH UNO';

	        	flag = false;
	        };
	        
		  	document.getElementById('all_user_cards_info').innerHTML = generateTable(comments.allUsersCardsLength);
	        
	        var cardRef = '<img id="draw_pile" src="/public/images/allCards/close_face.png" onclick="make_request_to_draw_a_card()">';
	        cardRef += '<img id="discard_pile" src="'+addressGenrator(comments.cardOnTable)+'">';

		  	document.getElementById('All_pile').innerHTML = cardRef;
		  	
		  	document.getElementById('User_Cards_Name').innerHTML = '<h3>'+'Players Cards :'+'</h3>'

	    	var imgRef = '';
	    	for(var i=0; i < comments.userCards.length; i++){
	    		imgRef += '<img id="card_num:'+i+'" onclick="make_request_to_play_the_card(this.id)" src="'+addressGenrator(comments.userCards[i])+'">';
	    	};			
		  	document.getElementById('my_cards').innerHTML = imgRef;

			document.getElementById('current_player').innerHTML = "<h3>"+"Current Player :"+comments.currentPlayer+"</h3>";
			document.getElementById('next_player').innerHTML = "<h3>"+"Next Player :"+comments.nextPlayer+"</h3>";
			document.getElementById('previous_player').innerHTML = "<h3>"+"Previous Player :"+comments.previousPlayer+"</h3>";
			document.getElementById('running_colour').innerHTML = "<h3>"+"running colour :"+comments.runningColour+"</h3>";

	    };

		if(req.status == 404){
				var e = document.getElementById('loading');
		       	e.innerHTML = req.responseText;
		};
	};

	req.open('GET', 'all_information_on_table', true);
	req.send();
};

var interval = setInterval(sendConnectionRequest, 5000);

exports.addressGenrator = addressGenrator;