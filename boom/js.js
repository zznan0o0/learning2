var situation = 0;
var deg = 30;

var boom = document.getElementById('boom');

var grain = {
	width: 30,
	height: 30
}

var WIDTH = boom.offsetWidth, HEIGHT = boom.offsetHeight;
Math.floor
var NUM = {
	x: Math.ceil(WIDTH / grain.width),
	y: Math.ceil(HEIGHT / grain.height)
}

boom.onclick = function(){
	if(!boom.clicked){
		boomInit(boom, '/boom/');
	}
	boom.clicked = true;
}

var timer = null;

var boomInit = function(obj, floder){
	obj.style.position = 'relative';

	var boomImg = obj.getElementsByTagName('img')[0];
	var href = boomImg.src.split(floder)[1];
	boomImg.style.display = 'none';
	var boomArry = [];

	for(var i = 0; i < NUM.y; i++){
		for(var j = 0; j < NUM.x; j++){
			var div = document.createElement('div');
			div.style.cssText = 'position:absolute; width:' + grain.width + 'px; height:' + grain.height + 'px; left:' + j*grain.width + 'px; top:' + i*grain.height + 'px; background-size:300px 300px; background:url(' + href + ')' + -j*grain.width + 'px ' + -i*grain.height + 'px no-repeat; border-radius:0; opacity:1;';
			obj.appendChild(div);

			boomArry.push(div);
		}
	}
	boomAnimate(obj, boomArry);
}

function boomAnimate(obj, arry){
	for(var i = 0; i < arry.length; i++){
		arry[i].speedX = randomSpeed();
		arry[i].speedY = randomSpeed();
	}

	obj.count = 0;
	clearInterval(timer);

	timer = setInterval(function(){
		if(situation == 0){
			boomShark(obj);
		}
		else if(situation == 1){
			boomRadius(arry);
			boomMove(obj, arry)
		}
		else if(situation == 2){
			boomMove(obj, arry);
		}
		else{
			clearInterval(timer);
		}
	}, 50);
}

function boomShark(obj){
	obj.style['transform'] = 'rotate(' + random() +'deg)';
	++ obj.count;
	if(obj.count > 10){
		obj.style['transform'] = 'rotate(0deg)';
		situation = 1;
	}
}

function boomRadius(arry){
	for(var i = 0; i < arry.length; i++){
		var bRadius = arry[i].style['border-radius'];
		var opacity = arry[i].style['opacity'];

		if(parseInt(bRadius) >= grain.width){
			situation = 2;
			break;
		}

		var scale = randomScale();

		arry[i].style['border-radius'] = parseInt(bRadius) + grain.width/4 + 'px';
		arry[i].style['opacity'] = opacity - 0.05;
		arry[i].style['transform'] = 'scale(' + scale + ','+ scale +')';
	}
}

function boomMove(obj, arry){
	var X_0 = obj.offsetWidth/2, Y_0 = obj.offsetHeight/2;
	for(var i = 0; i < arry.length; i++){
		var arryLeft = arry[i].offsetLeft;
		var arryTop = arry[i].offsetTop;
		var opacity = arry[i].style['opacity'];
		if(opacity <= 0){
			situation = 3;
			break;
		}
		else{
			if(arryLeft > X_0 && arryTop > Y_0){
				console.log(1)
				arry[i].style['left'] = arryLeft + arry[i].speedX +'px';
				arry[i].style['top'] = arryTop + arry[i].speedY + 'px';
				arry[i].style['opacity'] = opacity - 0.05;
			}
			else if(arryLeft < X_0 && arryTop > Y_0){
				arry[i].style['left'] = arryLeft - arry[i].speedX +'px';
				arry[i].style['top'] = arryTop + arry[i].speedY +'px';
				arry[i].style['opacity'] = opacity - 0.05;
			}
			else if(arryLeft > X_0 && arryTop < Y_0){
				arry[i].style['left'] = arryLeft + arry[i].speedX +'px';
				arry[i].style['top'] = arryTop - arry[i].speedY +'px';
				arry[i].style['opacity'] = opacity - 0.05;
			}
			else if(arryLeft < X_0 && arryTop < Y_0){
				arry[i].style['left'] = arryLeft - arry[i].speedX +'px';
				arry[i].style['top'] = arryTop - arry[i].speedY +'px';
				arry[i].style['opacity'] = opacity - 0.05;
			}
			else{
				arry[i].style['left'] = arryLeft + arry[i].speedX +'px';
				arry[i].style['top'] = arryTop + arry[i].speedY +'px';
				arry[i].style['opacity'] = opacity - 0.05;
			}
		}


	}
}

function random(){
	return Math.random()*60 - 30;
}

function randomScale(){
	return Math.random()*2 
}

function randomSpeed(){
	return Math.random()*30;
}