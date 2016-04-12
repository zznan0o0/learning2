var cheerio = require('cheerio');
var http = require('http');
var html
var url = 'http://www.imooc.com/video/11551';

function getPageAsync(url){
	return new Promise(function(resolve, reject){
		console.log('正在爬' + url);

		http.get(url, function(req){
			req.on('data', function(data){
				html += data;
			});

			req.on('end',function(){
				resolve(html);
			})
		}).on('error', function(e){
			reject(e);
		});
	});
}

var fetchCourseArray = [];

Promise.all()