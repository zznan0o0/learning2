var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');
var medio = path.join(__dirname, '../public/medio')
/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readdir(medio, function(err, names){
		if(err) console.log(err);
    	res.render('index', { title: 'music', fileNames: names });
	})
});

module.exports = router;
