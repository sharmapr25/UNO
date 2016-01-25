var http = require('http');
var controller = require('../lib/controller.js');
var IP = process.env.OPENSHIFT_NODEJS_IP;
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server = http.createServer(controller);
server.listen(PORT,IP);