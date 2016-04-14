var p = document.getElementById('font');
var content = ['跳', '动', '的', '脉', '搏', ',', '年', '轻', '的', '生', '命'];
var timer = null;

function append(flag, tag){
	return flag.appendChild(document.createElement(tag));
}

for(var i = 0; i < content.length; i++){
	var font = append(p, 'span');
	font.innerText = content[i];
}

var i = 0;
var fontTag = p.getElementsByTagName('span');

timer = setInterval(function(){
	if(i > content.length || i == content.length){
		clearInterval(timer);
		setTimeout(function(){
			p.innerText = '跳动的脉搏,年轻的生命';
		}, 800);
	}
	else{
		fontTag[i].className = 'play';
		i++;
	}
}, 500);