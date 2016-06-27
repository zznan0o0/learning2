var WINDOW_WIDTH = 1024, WINDOW_HEIGHT = 768;
var RADIUS = 8;
var topM = 60, leftM = 30;

var endTime = new Date(2016, 5, 25, 9, 35, 1);
var curShowTimeSeconds = 0;

var balls = [];

var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurShowTimeSeconds();

	setInterval(function(){
		update()
		render(context);
	}, 50);
}

function getCurShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);
	return ret>=0?ret:0;
}

function update(){
	var nextShowTimeSeconds = getCurShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600),
		nexMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60),
		nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600),
		curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60),
		curSeconds = curShowTimeSeconds % 60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(leftM+0, topM, parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(leftM+15*(RADIUS+1), topM, parseInt(curHours/10));
		}
		if(parseInt(curMinutes/10) != parseInt(nexMinutes/10)){
			addBalls(leftM+39*(RADIUS+1), topM, parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nexMinutes%10)){
			addBalls(leftM+54*(RADIUS+1), topM, parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(leftM+78*(RADIUS+1), topM, parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(leftM+93*(RADIUS+1), topM, parseInt(curSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
}

function updateBalls(){
	for(var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
}

function addBalls(X, Y, num){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:X+j*2*(RADIUS+1)+(RADIUS+1),
					y:Y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push(aBall);
			}
		}
	}
}

function render(cxt){
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds/3600), minutes = parseInt((curShowTimeSeconds - hours*3600)/60), seconds = curShowTimeSeconds % 60;
	renderDigit(leftM, topM, parseInt(hours/10), cxt);
	renderDigit(leftM+15*(RADIUS+1), topM, parseInt(hours%10), cxt);
	renderDigit(leftM+30*(RADIUS+1), topM, 10, cxt);
	renderDigit(leftM+39*(RADIUS+1), topM, parseInt(minutes/10), cxt);
	renderDigit(leftM+54*(RADIUS+1), topM, parseInt(minutes%10), cxt);
	renderDigit(leftM+69*(RADIUS+1), topM, 10, cxt);
	renderDigit(leftM+78*(RADIUS+1), topM, parseInt(seconds/10), cxt);
	renderDigit(leftM+93*(RADIUS+1), topM, parseInt(seconds%10), cxt);

	for(var i = 0; i < balls.length; i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt){
	cxt.fillStyle = 'rgb(0, 102, 153)';
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var rX = x+j*2*(RADIUS+1)+(RADIUS+1);
				var rY = y+i*2*(RADIUS+1)+(RADIUS+1);
				cxt.beginPath();
				cxt.arc(rX, rY, RADIUS, 0, 2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}