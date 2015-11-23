var http = require('http');
var fs = require('fs');

var main = function(){
	var usersInformation = [];
	var isGameStarted = false;

	//-------------------------------------------------------------------------------------------//
	var sendUpdatedData = function(request, response){
		if(usersInformation.length != 3){
			var data =  { isGameStarted : isGameStarted,
						  numberOfPlayers : usersInformation.length,
						};
			sendResponse(response, data);
		}else{
			response.statusCode = 200;
			console.log('dummy data sent');
			response.end('public/htmlFiles/unoTable.html');
		}
	};

	var serveFile = function(fileName, request, response){
		fs.readFile(filePath, function(err, data){
			if(data){
				response.statusCode = 200;
				console.log(response.statusCode);
				response.end(data);
			}else if(err){
				console.log('file not found..!',request.url);
				response.statusCode = 404;
				response.end('File Not Found..!');
			};
		});
	};


	var handle_get_request = function(request, response){
		console.log('requested files', request.url);
		filePath = (request.url == '/') ? '../public/htmlFiles/login.html' : '../' + request.url;
		if(request.url == '/updated_data'){
			sendUpdatedData(request, response);
		}else{
			serveFile(filePath, request, response);
		}
	};

	//---------------------------------------POST_HANDLER---------------------------------------//

	var addUser = function(name, ip){
		usersInformation.push({name : name, ip : ip});
	};

	var isUserExists = function(request){
		var currentIP = request.connection.remoteAddress;
		console.log('Checking for', currentIP);
		return usersInformation.some(function(user){
			return (user.ip == currentIP);
		});
	};

	var sendResponse = function(response, data){
		response.end(JSON.stringify(data));
	};

	var handle_post_request = function(request, response){
		console.log('post request', request.url, request.method);
		if(request.url == '/login_user'){
			if(isGameStarted){
				response.end('{"isGameStarted" : true}');
			}else{
				console.log('User requested to log in..!');
				var data = '';
				request.on('data', function(d){
					data += d;
				});
				request.on('end', function(){
					if(!isUserExists(request)){
						addUser(data.substr(5), request.connection.remoteAddress);
						var dataToBeSent =  { isGameStarted : isGameStarted,
										  	  numberOfPlayers : usersInformation.length,
											};
						sendResponse(response, dataToBeSent);
					}else{
						var dataToBeSent =  { alreadyConnected : true };
						sendResponse(response, dataToBeSent);
					};
					
					if(usersInformation.length == 3) isGameStarted = true;
					console.log(usersInformation);
				});
			};
		};

	};

	//-------------------------------------------------------------------------------------------//

	var requestHandler = function(request, response){
		console.log(request.method, request.url);
		if(request.method == 'GET')
			handle_get_request(request, response);
		else if(request.method == 'POST')
			handle_post_request(request, response);
	};

	var server = http.createServer(requestHandler);
	server.listen(3000);
};

main();