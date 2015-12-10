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

var send_request = function(dataToSend){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	    	if(req.responseText == 'successful')
	    		sendConnectionRequest();
	    	else if(req.responseText == 'can_not_play_the_card')
	    		alert('Invalid Card..!!!');
	    	else if(req.responseText == 'not_your_turn')
	    		alert('Not Your Turn..!!');
	    };
	};
	req.open('POST', 'play_card', true);
	req.send(dataToSend);
};

var type_of_wild;
var make_request_to_play_the_card = function(id){
	document.getElementById('change_colour_menu').className = 'hidden';
	var indexOfPlayedcard = id.substr(9);
	var playedCard = userCards[indexOfPlayedcard];
	var dataToSend = {};
	dataToSend.playedCard = playedCard;

	if(playedCard.speciality == 'Wild'){
		document.getElementById('change_colour_menu').className = '';
		type_of_wild = playedCard;
	}else if(playedCard.speciality == 'WildDrawFour'){
		if(doesThePlayerHaveSpecifiedColourCard(userCards, cardOnDeck.colour)){
			alert('You Have Card To play..!!');
		}else{
			document.getElementById('change_colour_menu').className = '';
			type_of_wild = playedCard;
		}
	}else{
		send_request(JSON.stringify(dataToSend));
	};
	
};

var doesThePlayerHaveSpecifiedColourCard = function(userCards, colour){
	return userCards.some(function(card){
		return (card.colour == colour)
	});
};

var send_request_for_wild_card = function(){
	var e = document.getElementById("colour_group");
	var colour = e.options[e.selectedIndex].value;

	dataToSend = {};
	dataToSend.colour = colour;
	dataToSend.playedCard = type_of_wild;
	type_of_wild = undefined;
	send_request(JSON.stringify(dataToSend));
	console.log('colour is',colour);
	document.getElementById('change_colour_menu').className = 'hidden';
};

var make_request_to_draw_a_card = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	console.log(req.responseText);
	    	if(req.responseText == 'not_your_turn')
	    		alert('Not Your Turn..!!');
	    	else if(req.responseText == 'out_of_cards'){
	    		alert('out of cards..!!');
	    	}
	    	else
	    		sendConnectionRequest();
	    };
	};
	req.open('POST', 'draw_card', true);
	req.send();
};

var sayUnoRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'said_uno_sucessfully')
		    	console.log('said uno');
	    };
	};
	if(userCards.length == 1){
		req.open('POST', 'say_uno', true);
		req.send();
	};
};

var catchUnoRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'uno_catched_successfully'){
	    		console.log('catch uno');
	    	}
	    };
	};
	req.open('POST', 'catch_uno', true);
	req.send();
};

var generateMessage = function(allInfo){
	var runningColour = allInfo.runningColour;
	var currentPlayer = allInfo.currentPlayer;
	var nextPlayer = allInfo.nextPlayer;
	
	var template = [ '<b>'+'Running Colour : '+'</b>'+ runningColour,
				   	 '<b>'+'CurrentPlayer  : '+'</b>'+ currentPlayer,
				   	 '<b>'+'Next Player    : '+'</b>'+ nextPlayer,
				   ].join('<br>');
	return template;
};

var userCards;
var cardOnDeck;
var showedRanks = false;
var previous_player;
var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	        var comments = JSON.parse(req.responseText);
	        console.log('whole response is', comments);
	        userCards = comments.userCards;
	        cardOnDeck = comments.cardOnTable;
	        if(comments.isEndOfGame){
	        	if(!showedRanks) {
	        		alert('Game End..!!');
	        		showedRanks = true;
		        	window.location = 'winners.html';
	        	};
	        };

	       	document.getElementById('say_UNO').onclick = function(){ sayUnoRequest();};
	        document.getElementById('catch_UNO').onclick = function(){ catchUnoRequest(); };
	        
		  	document.getElementById('user_card_information').innerHTML = generateTable(comments.allUsersCardsLength);
	        
		  	document.getElementById('draw_pile_deck').innerHTML = '<img id="draw_pile" src="/public/images/allCards/close_face.png" onclick="make_request_to_draw_a_card()">';
		  	document.getElementById('discard_pile_deck').innerHTML = '<img id="discard_pile" src="'+addressGenrator(comments.cardOnTable)+'">'

	    	var imgRef = '';
	    	for(var i=0; i < comments.userCards.length; i++){
<<<<<<< HEAD
	    		imgRef += '<img id="card_num:'+i+'" class="user_cards" onclick="make_request_to_play_the_card(this.id)" src="'+addressGenrator(comments.userCards[i])+'">';
=======
	    		var num = comments.userCards[i].number ? comments.userCards[i].number : '#';
	    		var colour = comments.userCards[i].colour ? comments.userCards[i].colour : '#fff'
	    		// imgRef += '<div id="card_num:"'+i+' onclick="make_request_to_play_the_card(this.id)" >' + createCard(1,'#00ff00') + '</div>'

	    		imgRef += '<img id="card_num:'+i+'" onclick="make_request_to_play_the_card(this.id)" src="'+addressGenrator(comments.userCards[i])+'">';
>>>>>>> 120a08848d25ef751da8ba973748a1c7109a371b
	    	};			

		  	document.getElementById('cards').innerHTML = imgRef;
			document.getElementById('message_box').innerHTML = generateMessage(comments);

			previous_player = comments.currentPlayer;
	    };

		if(req.status == 404){
			var e = document.getElementById('loading');
		    e.innerHTML = req.responseText;
		};
	};

	req.open('GET', 'all_information_on_table', true);
	req.send();
};


var createCard = function(num, colour){
		return [
		'<svg width="150" height="200" xmlns="http://www.w3.org/2000/svg">',
		 '<!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->',
		 '<g>',
		  '<title>Layer 1</title>',
		  '<rect id="svg_1" height="196" width="125" y="4" x="5" stroke-width="5" stroke="#000000" fill="#7fff00"/>',
		  '<text transform="matrix(4.947136402130127,0,0,2.5357143878936768,-380.15857473015785,-213.46429991722107) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_2" y="133" x="91" stroke-width="0" stroke="#000000" fill="#000000"/>',
		  '<text transform="matrix(4.352551213660601,0,0,3.119748044353794,-186.42177813880252,-157.05883804006075) " xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_3" y="92" x="58" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">+4</text>',
		 '</g>',
		'</svg>'
		].join('');
};

var interval = setInterval(sendConnectionRequest, 500);

window.addEventListener("keypress", checkKeyPressed, false);

function checkKeyPressed(e) {
    switch(e.charCode){
    	case 115:
    		//sayUNO
    		sayUnoRequest();
    		break;
    	case 99:
    		//catch UNO
    		catchUnoRequest();	
    		break;
    	case 100:
    		//draw
    		make_request_to_draw_a_card();
    		break;
    };
};

exports.addressGenrator = addressGenrator;
