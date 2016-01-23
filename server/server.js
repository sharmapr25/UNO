var http = require('http');
var controller = require('../lib/controller.js');
var PORT = process.env.OPENSHIFT_NODEJS_PORT|| 3000;
var IP = process.env.OPENSHIFT_NODEJS_IP;
var server = http.createServer(controller).listen(PORT,IP); 
