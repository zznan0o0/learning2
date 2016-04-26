var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path')
var url = 'http://tieba.baidu.com/p/4500671196';
var $;

var imgCrawler = function(url){
	if(!fs.existsSync('img')){
		fs.mkdirSync('img');
	}
	var date = new Date();
	var fileName = date.getFullYear().toString() + (date.getMonth()+1) + date.getDate() + date.getHours() +date.getMinutes() + date.getSeconds() + date.getMilliseconds();
	fs.mkdirSync('img/' + fileName);
	console.log('succeed create ' + fileName);
	var html = ''
	http.get(url, function(req){
		console.log('正在爬取 ' + url + '...........');
		req.on('data', function(data){
			html += data;
		});

		req.on('end', function(){
			$ = cheerio.load(html);
			
			$('img').each(function(index){
				var imgUrl = $(this).attr('src');
				var imgName = imgUrl.split('/').pop();
				var imgType = imgName.split('.').pop();
				var imgUrlName = path.join(__dirname, 'img/' + fileName + '/' + index + '.' + imgType);
				if(imgType == 'png' || imgType == 'jpg' || imgType == 'gif'){
					http.get(imgUrl, function(req){
						req.setEncoding("binary");
						var chunk = '';
						req.on('data', function(data){
							chunk += data;
						});

						req.on('end', function(){
							fs.writeFileSync(imgUrlName, chunk, "binary");
						});
					});
				}
			});

		});
	});
	console.log('succeed')
}

var urlCrawler = function(url){
	if(!fs.existsSync('url')){
		fs.mkdirSync('url');
	}
	var date = new Date();
	var fileName = date.getFullYear().toString() + (date.getMonth()+1) + date.getDate() + date.getHours() +date.getMinutes() + date.getSeconds() + date.getMilliseconds();
	fs.mkdirSync('url/' + fileName);
	console.log('succeed create ' + fileName);
	var html = ''
	http.get(url, function(req){
		console.log('正在爬取 ' + url + '...........');
		req.on('data', function(data){
			html += data;
		});

		req.on('end', function(){
			$ = cheerio.load(html);

			var urlAll = ''
			var src = $('[src]');
			var href = $('[href]');
			src.each(function(index){
				urlAll += ($(this).attr('src') + '\r\n');
			});

			href.each(function(index){
				urlAll += ($(this).attr('href') + '\r\n');
			});

			fs.writeFileSync('url/' + fileName + '/' + 'urlAll.txt', urlAll);

		});
	});
}

urlCrawler(url);