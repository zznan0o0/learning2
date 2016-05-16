var can, ctx, w, h;
var girlPic = new Image();
var starPic = new Image();

var num = 60;
var stars = [];

var lastTime,deltaTime;

var switchy = false;
var life = 1;

window.onload = init;

function init(){
	can = document.getElementById('canvas');
	ctx = can.getContext('2d');

	w = can.width;
	h = can.height;

	girlPic.src = 'src/girl.jpg';
	starPic.src = 'src/star.png';

	for(var i = 0; i < num; i++){
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
	}

	lastTime = Date.now();

	can.addEventListener('mousemove', mousemove, false);

	gameLoop();
}

function gameLoop(){
	requestAnimFrame(gameLoop)

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	drawBackground();
	drawGirl();
	drawStars();
	aliveUpdate();
}

function drawBackground(){
	ctx.fillStyle = '#393550';
	ctx.fillRect(0, 0, w, h);
}

function drawGirl(){
	ctx.drawImage(girlPic, 100, 150, 600, 300);
}

function mousemove(e){
	if(e.offsetX || e.layerX){
		var px = e.offsetX?e.offsetX:e.layerX;
		var py = e.offsetY?e.offsetY:e.layerY;

		if(px > 100 && px < 700 && py > 150 & py < 450){
			switchy = true;
		}
		else{
			switchy = false;
		}
	}
}

function aliveUpdate(){
	if(switchy){
		life += 0.03 * deltaTime * 0.05;
		if(life > 1){
			life = 1;
		}
	}
	else{
		life -= 0.03 * deltaTime * 0.05;
		if(life < 0){
			life = 0;
		}
	}
}