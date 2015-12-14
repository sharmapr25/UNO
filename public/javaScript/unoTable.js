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
	    	if(req.responseText == 'successful'){
	    		sendConnectionRequest();
          isVisibleChangeTurnButton = false;
        }
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
	if(document.getElementById('change_turn').className == '')
		document.getElementById('change_turn').className = 'hidden';
	document.getElementById('change_colour_menu').className = 'hidden';
	var indexOfPlayedcard = id.substr(9);
	var playedCard = userCards[indexOfPlayedcard];
	console.log('I played  thsi', id, playedCard);
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
	    	else{
	    		sendConnectionRequest();
		  		document.getElementById('change_turn').className = '';
		  		isVisibleChangeTurnButton = true;
        };
	    };
	};
  if(isVisibleChangeTurnButton) 
    alert('Play the Card or Pass Turn..!!')
  else{
    req.open('POST', 'draw_card', true);
  	req.send();
  };
}
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

var make_request_to_pass_turn = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'turn_passed'){
	    		console.log('passed turn to next player');
	    	};
			document.getElementById('change_turn').className = 'hidden';
      isVisibleChangeTurnButton = false;
	    };
	};
	req.open('POST', 'pass_turn', true);
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

var isVisibleChangeTurnButton;
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
	    		var num = comments.userCards[i].number ? ' '+comments.userCards[i].number : '#';
	    		var colour = comments.userCards[i].colour ? comments.userCards[i].colour : 'gray'
	    		// imgRef += '<div id="card_num:'+i+'" height="270px" width="200px" onclick="make_request_to_play_the_card(this.id)" >' + createCard(num,colour) + '</div>'
	    		imgRef += '<img id="card_num:'+i+'" class="user_cards" onclick="make_request_to_play_the_card(this.id)" src="'+addressGenrator(comments.userCards[i])+'">';
	    	};			

		  	document.getElementById('cards').innerHTML = imgRef;
			document.getElementById('message_box').innerHTML = generateMessage(comments);

			previous_player = comments.currentPlayer;
	    };

		if(req.status == 404){
		    document.getElementById('UNO_Table').innerHTML = req.responseText;
		};
	};

	req.open('GET', 'all_information_on_table', true);
	req.send();
};


var createCard = function(num, colour){
		colour = colour.toLowerCase();

		return [
		'<svg width="187" height="262" xmlns="http://www.w3.org/2000/svg">',
		 '<g>',
		  '<title>background</title>',
		  '<rect fill="#fff" id="canvas_background" height="264" width="189" y="-1" x="-1"/>',
		  '<g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">',
		   '<rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>',
		  '</g>',
		 '</g>',
		 '<g>',
		  '<title>Layer 1</title>',
		  '<rect id="svg_1" height="224" width="152" y="22" x="17.5" stroke-width="1.5" stroke="#000" fill="'+colour+'"/>',
		  '<text stroke="#000" transform="matrix(4.747072696685791,0,0,3.642857074737549,-256.6744797229767,-216.714280128479) " xml:space="preserve" text-anchor="left" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_3" y="104" x="66" stroke-width="0" fill="#000000"/>',
		  '<text xml:space="preserve" text-anchor="left" font-family="Helvetica, Arial, sans-serif" font-size="111" id="svg_4" y="166" x="27" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000">'+num+'</text>',
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
