//根据class获取节点， 第一个参数为class， 第二个参数为根据id选择其之下class不填默认document
function getByClass(classname, idname){
	var doc = idname?document.getElementById(idname):document;
	var elementAll = doc.getElementsByTagName('*');
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