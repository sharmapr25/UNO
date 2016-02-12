var stateOfGame;

var send_request = function(dataToSend){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'successful'){
          		isVisibleChangeTurnButton = false;
	    		sendConnectionRequest();
	    		document.querySelector('#soundForPlayCard').play();
        	}else if(req.responseText == 'can_not_play_the_card')
        	{
	    		alert('Invalid Card..!!!');	
      			document.getElementById('change_turn').className = '';
      			document.querySelector('#soundForAlert').play();
        	}
	    	else if(req.responseText == 'not_your_turn')
	    		alert('Not Your Turn..!!');
		};
	};
	req.open('POST', 'play_card', true);
	req.send(dataToSend);
};

var doesThePlayerHaveSpecifiedColourCard = function(userCards, colour){
	return userCards.some(function(card){
		return (card.colour == colour)
	});
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
		if(doesThePlayerHaveSpecifiedColourCard(userCards, cardOnDeck)){
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
	var cookie = document.cookie.split(' ');
 	var name = cookie[0].substring(10,cookie[0].length-1);
 	var cookie = document.cookie.split(';');
 	var name;
 	if(cookie[0].substr(10).indexOf('%20') == -1){
 		name = cookie[0].substring(10,cookie[0].length);
 	}
 	else{
 		name = cookie[0].substr(10).split('%20').join(' ');
 	}
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	    	if(req.responseText == 'said_uno_sucessfully')
		    	console.log('said uno');
	    };
	};
	if(userCards.length == 1 || (userCards.length == 2 && comments.currentPlayer == name)){
		console.log('ewww in say uno req')
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
	    	if(req.responseText == 'not_your_turn'){
	    		alert('Not your turn\n You can not passs the turn');
	    		return;
	    	}
	    	else if(req.responseText == 'turn_passed'){
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

var saidUNOInfo = function(allInfo){
	var UNO_info = [];

	for (var i = 0; i < allInfo.UNOregistry.length; i++) {
		if(allInfo.UNOregistry[i].said_uno)
			UNO_info.push(allInfo.UNOregistry[i].name+' said UNO</br>')
	};
	
	return '<p class = "unoInfoOnMsgBox">'+UNO_info.join(' ')+'</p>'
};

var isVisibleChangeTurnButton;
var showedRanks = false;

var resetUnoField = function(unoList,cardLength,currentPlayer) {
	for (var i = 0; i < unoList.length; i++) {
		if(cardLength[i].noOfCards > 2 || (cardLength[i].noOfCards == 2 && currentPlayer !=unoList[i].name)){
			unoList[i].said_uno = false;
		}
	}
}

var opponentInfo = function(players){
	var playerPosition = [];
	var cookie = document.cookie.split(' ');
 	var name = cookie[0].substring(10,cookie[0].length-1);
 	var counter = 0,count = 0;
 	while(counter <= 2){
 		if(players[count].name == name)
 			counter++;
 		if(counter == 1 && players[count].name != name){
 			playerPosition.push(players[count].name+"("+players[count].noOfCards+"cards)");
 		}
 		count++;
 		if(count == players.length)
 			count = 0;
 	}
 	return playerPosition.reverse();
};

var selectDiv = function(playersInfo){
	switch(playersInfo.length){
		case 1: break;
		case 2:
			document.querySelector('#player_3 .other_name').innerHTML = opponentInfo(playersInfo)[0];
			document.querySelector('#player_3').className = 'player';
			break;
		case 3:
			document.querySelector('#player_2 .other_name').innerHTML = opponentInfo(playersInfo)[0];
			document.querySelector('#player_2').className = 'player';

			document.querySelector('#player_4 .other_name').innerHTML = opponentInfo(playersInfo)[1];
			document.querySelector('#player_4').className = 'player';
			break;
		case 4:
			document.querySelector('#player_2 .other_name').innerHTML = opponentInfo(playersInfo)[0];
			document.querySelector('#player_2').className = 'player';
			document.querySelector('#player_3 .other_name').innerHTML = opponentInfo(playersInfo)[1];
			document.querySelector('#player_3').className = 'player';
			document.querySelector('#player_4 .other_name').innerHTML = opponentInfo(playersInfo)[2];
			document.querySelector('#player_4').className = 'player';
			break;
		case 5: 
			document.querySelector('#player_1 .other_name').innerHTML = opponentInfo(playersInfo)[0];
			document.querySelector('#player_1').className = 'player';
			document.querySelector('#player_2 .other_name').innerHTML = opponentInfo(playersInfo)[1];
			document.querySelector('#player_2').className = 'player';
			document.querySelector('#player_4 .other_name').innerHTML = opponentInfo(playersInfo)[2];
			document.querySelector('#player_4').className = 'player';
			document.querySelector('#player_5 .other_name').innerHTML = opponentInfo(playersInfo)[3];
			document.querySelector('#player_5').className = 'player';
			break;
		case 6:
			document.querySelector('#player_1 .other_name').innerHTML = opponentInfo(playersInfo)[0];
			document.querySelector('#player_1').className = 'player';
			document.querySelector('#player_2 .other_name').innerHTML = opponentInfo(playersInfo)[1];
			document.querySelector('#player_2').className = 'player';
			document.querySelector('#player_3 .other_name').innerHTML = opponentInfo(playersInfo)[2];
			document.querySelector('#player_3').className = 'player';
			document.querySelector('#player_4 .other_name').innerHTML = opponentInfo(playersInfo)[3];
			document.querySelector('#player_4').className = 'player';
			document.querySelector('#player_5 .other_name').innerHTML = opponentInfo(playersInfo)[4];
			document.querySelector('#player_5').className = 'player';
			break;

	}
};

var showCurrentPlayer = function(currentPlayer){
	var cookie = document.cookie.split(' ');
 	var name = cookie[0].substring(10,cookie[0].length-1);
 	if(name == currentPlayer){
 		document.getElementById('user_cards').style.border = "5px solid #7ed097";
 	}
 	else{
 		document.getElementById('user_cards').style.border = "1px solid black";
 	}
	var divs = document.querySelectorAll('.player');
 	for(var i = 1; i <= 6; i++){
 		var value = document.querySelector('#player_'+i+' .other_name');
 		if(value){
 			value = value.textContent;
		var name = value.split("(")[0];
	 		if(name == currentPlayer){
	 			document.querySelector('#player_'+i).style.border = "5px solid #7ed097";
	 		}
	 		else{
	 			document.querySelector('#player_'+i).style.border = "5px solid white";
	 		}
 		}
 	}
}

var checkTheNoOfuser = function(info){
	if(info.length == 1){
		$('.table_deck').attr('id','single_user');
		$('#user_cards').attr('class','single_user_cards');
		$('.button_container').attr('id','my_button');
	}

	else{
		$('.top_five').show();
		$('.table_deck').attr('id','multi_user'); 
		$('#user_cards').attr('class','multi_user_cards');
		$('.button_container').attr('id','multi_button');
	}
}

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
		        cardOnDeck = comments.runningColour;
				checkTheNoOfuser(comments.allUsersCardsLength);		        
		        if(comments.isEndOfGame){
		        	if(!showedRanks) {
		        		alert('Game End..!!');
		        		showedRanks = true;
			        	window.location = 'winners.html';
		        	};
		        };

		       	document.getElementById('say_UNO').onclick = function(){ sayUnoRequest(comments);};
		        document.getElementById('catch_UNO').onclick = function(){ catchUnoRequest(); };

			  	document.getElementById('RunningColorContainer').innerHTML = comments.runningColour;
			  	document.getElementById('RunningColorContainer').className = comments.runningColour;

			  	document.getElementsByClassName("discard_Pile")[0].innerHTML = createCard(comments.cardOnTable);
			  	resetUnoField(comments.UNOregistry,comments.allUsersCardsLength,comments.currentPlayer);

		    	var imgRef = '';
		    	for(var i=0; i < comments.userCards.length; i++){
		    		var num = comments.userCards[i].number ? ' '+comments.userCards[i].number : '#';
		    		var colour = comments.userCards[i].colour ? comments.userCards[i].colour : 'gray'
		    		imgRef += '<div id="card_num:'+i+'" height="270px" width="200px" class="user_cards" onclick="make_request_to_play_the_card(this.id)" >' + createCard(comments.userCards[i]) + '</div>';
		    	};			

			  	document.getElementById('user_cards').innerHTML = imgRef;
			  	selectDiv(comments.allUsersCardsLength);
			  	showCurrentPlayer(comments.currentPlayer);
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
				num = '⊘';break;
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

window.addEventListener("keypress", checkKeyPressed, false);
 
function checkKeyPressed(e) {
	var data = JSON.parse(stateOfGame);
    switch(e.charCode){
     	case 115:
     		//sayUNO
     		sayUnoRequest(data);
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

var interval = setInterval(sendConnectionRequest, 500);