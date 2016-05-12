var http = require('http');
var fs =require('fs');
var url = require('url');
var querystring = require('querystring')


http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	if(pathname == '/upload' && req.method == 'POST'){
		var chunkAll;
		
		req.on('data', function(chunk){
			console.log(chunk);
			chunkAll += chunk;
		});

		req.on('end', function(){
			console.log(chunkAll);
			console.log(querystring.parse(chunkAll));
		});

	}

	res.writeHead('200', {'content-type': 'text/html'});
	res.write(fs.readFileSync('./index.html'));
	res.end();
}).listen(3000)

console.log('starting at 3000');