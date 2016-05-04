var lineAnimation = function(classname){
	this.obj = lineAnimation.prototype.getByClass(classname);
	for(var i = 0; i < this.obj.length; i++){
		this.obj[i].style.position = 'relative';
		this.obj[i].line = [];
		for(var j = 0; j < 6; j++){
			var div = document.createElement('div');
			this.obj[i].appendChild(div);
			this.obj[i].line[j] = div;
		}
	}
}

lineAnimation.prototype.getByClass = function(classname){
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

lineAnimation.prototype.init = function(){
	for(var i = 0; i < this.obj.length; i++){
		this.obj[i].timer = null;
		this.obj[i].line[0].style.cssText = 'position:absolute; left:100%; top: 0; background:red; height:2px; width:0%;'
		this.obj[i].line[1].style.cssText = 'position:absolute; left:0; top: 100%; background:red; height:2px; width:0;'
		this.obj[i].line[2].style.cssText = 'position:absolute; left:50%; top: 0; background:red; height:2px; width:0;'
		this.obj[i].line[3].style.cssText = 'position:absolute; left:50%; top: 100%; background:red; height:2px; width:0;'
		this.obj[i].line[4].style.cssText = 'position:absolute; left:0; top: 0; background:red; height:0; width:2px;'
		this.obj[i].line[5].style.cssText = 'position:absolute; left:100%; top: 100%; background:red; height:0; width:2px;'
	}
}

lineAnimation.prototype.play = function(num){
	var that = this;
	that[num].timer = setInterval(function(){
		if(parseInt(that.obj[num].line[2].style.width) < 50){
			that.obj[num].line[2].style.width = (parseInt(that.obj[num].line[2].style.width) + 2) + '%';
			that.obj[num].line[2].style.left = (parseInt(that.obj[num].line[2].style.left) - 2) + '%';
			that.obj[num].line[3].style.width = (parseInt(that.obj[num].line[3].style.width) + 2) + '%';
		}
		else if(parseInt(that.obj[0].line[2].style.width) >= 50 && parseInt(that.obj[0].line[4].style.height) < 100){
			that.obj[num].line[4].style.height = (parseInt(that.obj[num].line[5].style.height) + 2) + '%';
			that.obj[num].line[5].style.height = (parseInt(that.obj[num].line[5].style.height) + 2) + '%';
			that.obj[num].line[5].style.top = (parseInt(that.obj[num].line[5].style.top) - 2) + '%';
		}
		else if(parseInt(that.obj[0].line[2].style.width) >= 50 && parseInt(that.obj[0].line[0].style.width) < 50 && parseInt(that.obj[0].line[4].style.height) >= 100){
			that.obj[num].line[0].style.width = (parseInt(that.obj[num].line[0].style.width) + 2) + '%';
			that.obj[num].line[0].style.left = (parseInt(that.obj[num].line[0].style.left) - 2) + '%';
			that.obj[num].line[1].style.width = (parseInt(that.obj[num].line[1].style.width) + 2) + '%';
		}
		else{
			clearInterval(that.obj[num].timer);
		}
	}, 13);
}

var animatate = new lineAnimation('line_body');
var content = animatate.getByClass('line_body');
animatate.init();
for(var i = 0; i < content.length; i++){
	content[i].index = i;
	content[i].onmouseover = function(){
		animatate.play(this.index);
	}
}
