var fs = require('fs');

var a = fs.readFileSync('a.js', 'utf-8');
console.log(typeof(a))