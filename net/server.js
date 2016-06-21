var net = require('net');

var chatServer = net.createServer();

chatServer.on('connection', function(client){
	client.write('connection ~~~~\n');
	client.end();
})

chatServer.listen(3000);
console.log('server start at 3000')