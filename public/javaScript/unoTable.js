var stateOfGame;

var send_request = function(dataToSend){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'successful'){
          		isVisibleChangeTurnButton = false;
	    		sendConnectionRequest();
        	}else if(req.responseText == 'can_not_play_the_card')
        	{
      			document.getElementById('change_turn').className = '';
	    		alert('Invalid Card..!!!');	
        	}
	    	else if(req.responseText == 'not_your_turn')
	    		alert('Not Your Turn..!!');
		};
	};
	req.open('POST', 'play_card', true);
	req.send(dataToSend);
};

var type_of_wild;
var make_request_to_play_the_card = function(id){	
	if(document.getElementById('change_turn').className == ''){
		if(isVisibleChangeTurnButton != false){
			document.getElementById('change_turn').className = 'hidden';
		}
		document.getElementById('change_colour_menu').className = 'hidden';
	}
	var indexOfPlayedcard = id.substr(9);
	var playedCard = userCards[indexOfPlayedcard];
	var dataToSend = {};
	dataToSend.playedCard = playedCard;
	if(playedCard.speciality == 'Wild'){
		document.getElementById('change_colour_menu').className = '';
		type_of_wild = playedCard;
	}
	else if(playedCard.speciality == 'WildDrawFour'){
		if(doesThePlayerHaveSpecifiedColourCard(userCards, cardOnDeck.colour)){
			alert('You Have Card To play..!!');
		}else{
			document.getElementById('change_colour_menu').className = '';
			type_of_wild = playedCard;
		}
	}else{
		dataToSend.colour = playedCard.colour;
		send_request(JSON.stringify(dataToSend));
	}
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
	document.getElementById('change_colour_menu').className = 'hidden';
};

var make_request_to_draw_a_card = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'not_your_turn')
	    		alert('Not Your Turn..!!');
	    	else if(req.responseText == 'out_of_cards'){
	    		alert('out of cards..!!');
	    	}
	    	else{
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
var sayUnoRequest = function(comments){
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
	    	if(req.responseText == 'uno_catched_successfully')
	    		console.log('catch uno');
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
	    		document.getElementById('change_turn').className = 'hidden';
	    	}


	    	else if(isVisibleChangeTurnButton == true){
      			document.getElementById('change_turn').className = '';
	    	}
	    		isVisibleChangeTurnButton = false;
				document.getElementById('change_turn').className = 'hidden';
	    };
	};
	req.open('POST', 'pass_turn', true);
	req.send();
};

var generateMessage = function(allInfo){
	var UNO_info = '';
	var playedCardInfo = '';
	var a=allInfo.allUsersCardsLength
	var user_info = a.map(function (eachUser) {
		console.log('confirm man',eachUser.name)
		return '<div id="'+eachUser.name+'">'+eachUser.name+' ('+eachUser.noOfCards+' cards)</div>';
	});
	if(allInfo.noOfDiscardCards > 1){
		playedCardInfo = allInfo.previousPlayer+' played '+
						(allInfo.cardOnTable.colour||'')+' '+
						(allInfo.cardOnTable.number||allInfo.cardOnTable.speciality);
	}
	for (var i = 0; i < allInfo.UNOregistry.length; i++) {
		if(allInfo.UNOregistry[i].said_uno)
			UNO_info+=allInfo.UNOregistry[i].name+' said UNO</br>'
	};
	
	var template = ['<div class="playerList">'+user_info.join('')+'</div>',
				   	playedCardInfo,
				   	'<p class = "unoInfoOnMsgBox">'+UNO_info+'</p>'
				   ].join('<br>')+'</br>';
	return template;
};

var isVisibleChangeTurnButton;
var showedRanks = false;

var sendConnectionRequest = function(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(stateOfGame != req.responseText || !stateOfGame){
	    		stateOfGame = req.responseText;	
		        var comments = JSON.parse(req.responseText);
		        if(comments.status == 500){
					window.location = comments.location;
				};
		        userCards = comments.userCards; 
		        cardOnDeck = comments.cardOnTable;
		        if(comments.isEndOfGame){
		        	if(!showedRanks) {
		        		alert('Game End..!!');
		        		showedRanks = true;
			        	window.location = 'winners.html';
		        	};
		        };

		       	document.getElementById('say_UNO').onclick = function(){ sayUnoRequest(userCards);};
		        document.getElementById('catch_UNO').onclick = function(){ catchUnoRequest(); };

			  	document.getElementById('RunningColorContainer').innerHTML = comments.runningColour;
			  	document.getElementById('RunningColorContainer').className = comments.runningColour;
		        
			  	// document.getElementById('draw_pile_deck').innerHTML = '<img id="draw_pile" width="131px" height="181px" src="/images/allCards/close_face.png" onclick="make_request_to_draw_a_card()">';
			  	document.getElementById('discard_pile_deck').innerHTML = createCard(comments.cardOnTable);

		    	var imgRef = '';
		    	for(var i=0; i < comments.userCards.length; i++){
		    		var num = comments.userCards[i].number ? ' '+comments.userCards[i].number : '#';
		    		var colour = comments.userCards[i].colour ? comments.userCards[i].colour : 'gray'
		    		imgRef += '<div id="card_num:'+i+'" height="270px" width="200px" class="user_cards" onclick="make_request_to_play_the_card(this.id)" >' + createCard(comments.userCards[i]) + '</div>';
		    	};			

			  	document.getElementById('cards').innerHTML = imgRef;
			  	document.getElementById('message_box').innerHTML = generateMessage(comments);

		        document.getElementById(comments.currentPlayer).className = 'current_player';
				previous_player = comments.currentPlayer;
		    };

			if(req.status == 404){
			    document.getElementById('UNO_Table').innerHTML = req.responseText;
			};
		};

	};

	req.open('GET', 'all_information_on_table', true);
	req.send();
};


var createCard = function(card){
	var num;
	var colour = card.colour ? card.colour : 'lightgray'

	if(card.number != null){
		num = ' ' + card.number;
	}else{
		switch(card.speciality){
			case 'Reverse':
				num = ' R';break;
			case 'Skip':
				num = ' S';break;
			case 'DrawTwo':
				num = '+2';break;
			case 'Wild':
				num = 'W';break;
			case 'WildDrawFour':
				num = '+4';break;
		};
	};
	return '<div class = "'+ colour +' myCards"><div id="num">'+num+'</div></div>';
};

var interval = setInterval(sendConnectionRequest, 500);
