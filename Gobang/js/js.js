var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true;
var chessPool = [];
var count = 0;
var wins = [];
var myWin = [];
var computerWin = [];
var over = false;


//赢法数组
for(var i = 0; i < 15; i++){
	wins[i] = [];
	for(var j = 0; j < 15; j++){
		wins[i][j] = [];
	}
}

for(var i = 0; i < 15; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 15; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 11; i++){
	for(var j = 0; j < 11; j++){
		for(var k = 0; k < 5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

for(var i = 0; i < 11; i++){
	for(var j = 14; j > 3; j--){
		for(var k = 0; k < 5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

//棋子保存池初始化
for(var i = 0; i < 15; i++){
	chessPool[i] = [];
	for(var j = 0; j < 15; j++){
		chessPool[i][j] = 0;
	}
}
console.log(count)
//赢法的统计数组
for(var i = 0; i < count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}


//active
context.strokeStyle = '#bfbfbf';

for(var i = 0; i < 15; i++){
	context.moveTo(15, i*30+15);
	context.lineTo(435, i*30+15);
	context.stroke();

	context.moveTo(i*30+15, 15);
	context.lineTo(i*30+15, 435);
	context.stroke();
}

var oneStep = function(i, j, me){
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
	context.closePath();
	var grd = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);

	if(me){
		grd.addColorStop(0, '#0a0a0a');
		grd.addColorStop(1, '#636766');
	}
	else{
		grd.addColorStop(0, '#d1d1d1');
		grd.addColorStop(1, '#f9f9f9');
	}
	
	context.fillStyle = grd;
	context.fill();
}

chess.onclick = function(e){
	if(over){
		return;
	}

	if(!me){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	console.log(i+','+j)
	if(chessPool[i][j] == 0){
		oneStep(i, j, me);
		chessPool[i][j] = 1;

		for(var k = 0; k < count; k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;

				if(myWin[k] == 5){
					alert('你赢了');
					over = true;
				}
			}
		}
		if(!over){
				me = !me;
				computerAI();
		}
	}	
}

var computerAI = function(){
	var myScore = [], computerScore = [];
	var max = 0;
	var u = 0, v = 0;

	//落子分数初始化

	for(var i = 0; i < 15; i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j = 0; j < 15; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 15; j++){
			if(chessPool[i][j] == 0){
				for(var k = 0; k < count; k++){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 100;
						} 
						else if(myWin[k] == 2){
							myScore[i][j] += 200;
						} 
						else if(myWin[k] == 3){
							myScore[i][j] += 1000;
						} 
						else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						} 

						if(computerWin[k] == 1){
							computerScore[i][j] += 150;
						} 
						else if(computerWin[k] == 2){
							computerScore[i][j] += 250;
						} 
						else if(computerWin[k] == 3){
							computerScore[i][j] += 2000;
						} 
						else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						} 
					}
				}

				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}
				else if(myScore == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}

				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}
				else if(computerScore == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}

	oneStep(u, v, false);
	chessPool[u][v] = 2;

	for(var k = 0; k < count; k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				alert('你输了');
				over = true;
			}
		}
	}

	if(!over){
		me = !me;
	}
}
