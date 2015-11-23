var http = require('http');
var fs = require('fs');

var main = function(){
	var usersInformation = [];
	var isGameStarted = false;

	//-----------------------------------------------------------------------------------------------//

	var handle_get_request = function(request, response){
		console.log('requested files', request.url);
		if(request.url == '/') 
			filePath = './public/htmlFiles/login.html';
		else
			filePath = '.' + request.url;
		
		fs.readFile(filePath, function(err, data){
			if(data){
				response.statusCode = 200;
				console.log(response.statusCode);
				response.end(data);
			}else if(err){
				console.log('file not found..!',request.url);
				response.statusCode = 404;
				response.end();
			};

		});
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
					console.log('user sent the following:',data);

					usersInformation.push({name : data.substr(5), ip : request.connection.remoteAddress});
					var dataToBeSent =  { isGameStarted : isGameStarted,
										  numberOfPlayers : usersInformation.length,
										};
					response.end(JSON.stringify(dataToBeSent));
					if(usersInformation.length == 3) isGameStarted = true;
					console.log(usersInformation);
				});
			};
		};

	};

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