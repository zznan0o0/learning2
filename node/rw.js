var fs = require('fs');

/*fs.readFile('1.txt', function(err, data){
	if(err) throw err;

	fs.writeFile('./text/2.txt', data, function(err){
		if(err){
			throw err;
		}
		else{
			console.log('success');
		}
	});
});*/

//fs.writeFileSync('./text/2.txt', fs.readFileSync('1.txt'));

//stream
//fs.createReadStream('1.txt').pipe(fs.createWriteStream('text/2.txt'));

//---------------------------------------------

/*var read = fs.createReadStream('1.EXE');
var write = fs.createWriteStream('text/2.EXE');

read.on('data', function(chunk){
	if(write.write(chunk) === false){
		read.pause();
		console.log('stop')
	}
})

write.on('drain', function(){
	read.resume();
	console.log('recovery')
})

read.on('end', function(){
	write.end();
})*/

//---------------------------------------------

var readstream = fs.createReadStream('1.EXE');
var writestream = fs.createWriteStream('text/2.EXE');
var size = fs.statSync('1.EXE').size;
var completedLength = 0;

readstream.on('data', function(chunk){
	completedLength += chunk.length;

	if(writestream.write(chunk) === false){
		readstream.pause();
	}
});

writestream.on('drain', function(){
	console.log('已上传' + completedLength + '总共' + size);
	readstream.resume();
});

readstream.on('end', function(){
	writestream.end();
});

