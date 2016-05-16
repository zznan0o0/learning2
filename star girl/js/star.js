var starObj = function(){
	this.x;
	this.y;
	this.picNO = 0;
	this.timer;
	this.speed;
}

starObj.prototype.init = function(){
	this.x = Math.random()*600 + 100;
	this.y = Math.random()*300 + 150;
	this.picNO = Math.floor(Math.random()*7);
	this.timer = 0;
	this.xSpeed = Math.random()*3 - 1.5;
	this.ySpeed = Math.random()*3 - 1.5;
}

starObj.prototype.update = function(){
	this.x += this.xSpeed*deltaTime*0.004;
	this.y += this.ySpeed*deltaTime*0.004;

	if(this.x < 100 || this.x > 700){
		this.init();
		return;
	}
	if(this.y < 150 || this.y > 450){
		this.init();
		return;
	}

	this.timer += deltaTime;

	if(this.timer > 100){
		++this.picNO;
		if(this.picNO >= 7){
			this.picNO = 0;
			this.timer = 0;
		}
	}
}

starObj.prototype.draw = function(){
	ctx.save();
	ctx.globalAlpha = life;
	ctx.drawImage(starPic, this.picNO*7, 0, 7, 7, this.x, this.y, 7, 7);
	ctx.restore();
}

function drawStars(){
	for(var i = 0; i < num; i++){
		stars[i].update();
		stars[i].draw();
	}
}