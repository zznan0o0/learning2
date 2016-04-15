var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var media = path.join(__dirname, '../public/music');

/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readdir(media, function(err, names){
		if(err){
			console.log(err);
		}
		else{
    		res.render('index', { title: 'Passionate Music', music: names });			
		}
	})
});

module.exports = router;
