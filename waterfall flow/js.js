var getByClass = function(classname){
	var allTag = document.getElementsByTagName('*');
	var allClassTag = [];
	for(var i = 0; i < allTag.length; i++){
		if(allTag[i].className == classname){
			allClassTag.push(allTag[i]);
		}
	}
	return allClassTag;
}

Array.prototype.getArrIndex = function(val){
	var allIndex = [];
	for(var i = 0; i < this.length; i++){
		if(this[i] == val){
			allIndex.push(i);
		}
	}
	return allIndex;
}

var waterfall = function(classname){
	var container = document.getElementById('container');
	var boxs = getByClass(classname);

	var changesize = function(){
		var boxsW = boxs[0].offsetWidth;
		var cols = Math.floor(document.documentElement.clientWidth/boxsW);
		container.style.cssText = 'width:' + boxsW*cols + 'px; margin:0 auto; position:relative;';
		var hArr = [];
		for(var i = 0; i < boxs.length; i++){
			if(i < cols){
				hArr.push(boxs[i].offsetHeight);
			}
			else{
				var minH = Math.min.apply(null, hArr);
				var index = hArr.getArrIndex(minH)[0];
				boxs[i].style.position = 'absolute';
				boxs[i].style.top = minH + 'px';
				boxs[i].style.left = boxsW * index + 'px';
				//boxs[i].style.left = boxs[index].offsetLeft + 'px';
				hArr[index] += boxs[i].offsetHeight;
			}
		}
	}
	changesize();
}

//检查滚动判断是否加载数据
var checkScrollSlide = function(){
	var boxs = getByClass('box');
	var lastBoxH = boxs[boxs.length-1].offsetTop + Math.floor(boxs[boxs.length-1].offsetHeight);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var clientH = document.body.clientHeight || document.documentElement.clientHeight;

	return lastBoxH<(scrollTop+clientH)?true:false;
}

window.onload = function(){
	waterfall('box');

	window.onscroll = function(e){
		checkScrollSlide();
	}
}