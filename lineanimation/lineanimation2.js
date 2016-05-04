var getByClass = function(classname){
	var classTag = [];
	var tagAll = document.getElementsByTagName('*');
	for(var i = 0; i < tagAll.length; i++){
		var allClassName = tagAll[i].className.split(' ');
		for(var j = 0; j < allClassName.length; j++){
			if(allClassName[j] == classname){
				classTag.push(tagAll[i]);
				break;
			}
		}
	}
	return classTag;
}

var obj = getByClass('line_body');

var init = function(obj){
	for(var i = 0; i < obj.length; i++){
		obj[i].style.position = 'relative';
		obj[i].line = [];
		for(var j = 0; j < 6; j++){
			var div = document.createElement('div');
			obj[i].appendChild(div);
			obj[i].line[j] = div;
		}
	}
	for(var i = 0; i < obj.length; i++){
		obj[i].timer = null;
		obj[i].line[0].style.cssText = 'position:absolute; left:100%; top: 0; background:red; height:2px; width:0%;'
		obj[i].line[1].style.cssText = 'position:absolute; left:0; top: 100%; background:red; height:2px; width:0;'
		obj[i].line[2].style.cssText = 'position:absolute; left:50%; top: 0; background:red; height:2px; width:0;'
		obj[i].line[3].style.cssText = 'position:absolute; left:50%; top: 100%; background:red; height:2px; width:0;'
		obj[i].line[4].style.cssText = 'position:absolute; left:0; top: 0; background:red; height:0; width:2px;'
		obj[i].line[5].style.cssText = 'position:absolute; left:100%; top: 100%; background:red; height:0; width:2px;'
	}
}

var play = function(obj){
	for(var i = 0; i < obj.length; i++){
		obj[i].index = i;
		obj[i].timer = null
		obj[i].onmouseover = function(){
			clearInterval(this.timer);
			var that = this;
			that.timer = setInterval(function(){
			if(parseInt(obj[that.index].line[2].style.width) < 50){
				obj[that.index].line[2].style.width = (parseInt(obj[that.index].line[2].style.width) + 2) + '%';
				obj[that.index].line[2].style.left = (parseInt(obj[that.index].line[2].style.left) - 2) + '%';
				obj[that.index].line[3].style.width = (parseInt(obj[that.index].line[3].style.width) + 2) + '%';
			}
			else if(parseInt(obj[that.index].line[2].style.width) >= 50 && parseInt(obj[that.index].line[4].style.height) < 100){
				obj[that.index].line[4].style.height = (parseInt(obj[that.index].line[5].style.height) + 2) + '%';
				obj[that.index].line[5].style.height = (parseInt(obj[that.index].line[5].style.height) + 2) + '%';
				obj[that.index].line[5].style.top = (parseInt(obj[that.index].line[5].style.top) - 2) + '%';
			}
			else if(parseInt(obj[that.index].line[2].style.width) >= 50 && parseInt(obj[that.index].line[0].style.width) < 50 && parseInt(obj[that.index].line[4].style.height) >= 100){
				obj[that.index].line[0].style.width = (parseInt(obj[that.index].line[0].style.width) + 2) + '%';
				obj[that.index].line[0].style.left = (parseInt(obj[that.index].line[0].style.left) - 2) + '%';
				obj[that.index].line[1].style.width = (parseInt(obj[that.index].line[1].style.width) + 2) + '%';
			}
			else{
				clearInterval(obj[that.index].timer);
			}
		}, 13);
		}
	}
}

var over = function(obj){
	for(var i = 0; i < obj.length; i++){
		obj[i].onmouseout = function(){
			clearInterval(this.timer);
			var that = this;
			that.timer = setInterval(function(){
			if(parseInt(obj[that.index].line[2].style.width) == 0){
				clearInterval(obj[that.index].timer);
				obj[that.index].line[2].style.width = '0';
				obj[that.index].line[2].style.left = '50%';
				obj[that.index].line[3].style.width = '0';
				obj[that.index].line[4].style.height = '0';
				obj[that.index].line[5].style.height = '0';
				obj[that.index].line[5].style.top = '100%';
				obj[that.index].line[0].style.width = '0';
				obj[that.index].line[0].style.left = '100%'
				obj[that.index].line[1].style.width = '0';
			}
			else{
				obj[that.index].line[2].style.width = (parseInt(obj[that.index].line[2].style.width) - 2) + '%';
				obj[that.index].line[2].style.left = (parseInt(obj[that.index].line[2].style.left) + 2) + '%';
				obj[that.index].line[3].style.width = (parseInt(obj[that.index].line[3].style.width) - 2) + '%';
				obj[that.index].line[4].style.height = (parseInt(obj[that.index].line[5].style.height) - 4) + '%';
				obj[that.index].line[5].style.height = (parseInt(obj[that.index].line[5].style.height) - 4) + '%';
				obj[that.index].line[5].style.top = (parseInt(obj[that.index].line[5].style.top) + 4) + '%';
				obj[that.index].line[0].style.width = (parseInt(obj[that.index].line[0].style.width) - 2) + '%';
				obj[that.index].line[0].style.left = (parseInt(obj[that.index].line[0].style.left) + 2) + '%';
				obj[that.index].line[1].style.width = (parseInt(obj[that.index].line[1].style.width) - 2) + '%';
			}
		}, 13);
		}
	}
}

init(obj);
play(obj);
over(obj)