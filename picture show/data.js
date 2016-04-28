var data = [];
var dataStr = '1、a<br>\
<br>\
2<br>\
3<br>\
4<br>\
5<br>\
<br>\
<br>\
1、a<br>\
<br>\
2<br>\
3<br>\
4<br>\
5<br>\
<br>\
<br>\
1、a<br>\
<br>\
2<br>\
3<br>\
4<br>\
5<br>\
<br>\
<br>\
1、a<br>\
<br>\
2<br>\
3<br>\
4<br>\
5<br>\
<br>\
<br>\
2、b<br>\
<br>\
3<br>\
3<br>\
4<br>\
5<br>\
'

var d = dataStr.split('<br><br><br>');
for(var i = 0; i < d.length; i++){
	var c = d[i].split('<br><br>');
	data.push({
		img: c[0].split('、')[1] + '.jpg',
		caption: c[0].split('<br>')[0],
		desc : c[1]
	});
}
