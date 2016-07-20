//获取对象样式
function getStyle2(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
//根据class获取节点， 第一个参数为class， 第二个参数为根据id选择其之下class不填默认document
function getByClass(classname, obj){
	var dom = obj?obj:document;
	var elementAll = dom.getElementsByTagName('*');
	var classElemts = [];

	for(var i = 0; i < elementAll.length; i++){
		var tagClasses = elementAll[i].className.split(' ');

		for(var j = 0; j < tagClasses.length; j++){
			if(tagClasses[j] == classname){
				classElemts.push(elementAll[i]);
				break;
			}
		}
	}

	return classElemts;
}
//兼容requestAnimFrame
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

//通过属性获得标签(不完善)
function getByAttr(attrname, attrvalue, obj){
	var dom = obj?obj:document;
	var elementAll = dom.getElementsByTagName('*');
	var Elemts = [];

	for(var i = 0; i < elementAll.length; i++){
		if(elementAll[i][attrname]){
			var elementAttrArr = elementAll[i][attrname].split(' ');
			for(var j = 0; j < elementAttrArr.length; j++){
				if(elementAttrArr[j] == attrvalue){
					Elemts.push(elementAll[i]);
					break;
				}
			}
		}
	}

	return Elemts;
}

//动画与getStyle一起用
function moveStar(obj, attrCLass, cb){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		for(attr in attrCLass){
			if((attr === 'opacity' ? getStyle(obj, attr)*100 : getStyle(obj, attr)) === attrCLass[attr]){
				isComplete = true;
				continue;
			}

			isComplete = false;

			if(attr === 'opacity'){
				var speed = (attrCLass[attr] - getStyle(obj, attr) * 100) / 10;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				obj.style[attr] = (getStyle(obj, attr) * 100 + speed) / 100.0;
			}
			else{
				var speed = (attrCLass[attr] - getStyle(obj, attr)) / 10;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				obj.style[attr] = getStyle(obj, attr) + speed + 'px';
			}
		}
		if(isComplete){
			clearInterval(obj.timer);
			if(cb){
				cb(obj);
			}
		}
	}, 13);
}
//浮点型样式
function getStyle(obj, attr){
	if(obj.currentStyle){
		return parseFloat(obj.currentStyle[attr]);
	}
	else{
		return parseFloat(getComputedStyle(obj, false)[attr])
	}
}
//x,y之间的距离
function calcDistance(loc1, loc2){
	return Math.sqrt((loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y))
}

var childarr=[].filter.call(document.getElementsByTagName('*'),function(item){
	return item.getAttribute('class')==yourClass;
})