var cw = Math.min(800, $(window).width() - 20)
ch = cw;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var strokeColor = 'black';
var isMD = false;
var lastLoc = {x: 0, y: 0}
var lastTimestamp = 0;
var lastLineWidth = -1;

canvas.width = cw;
canvas.height = ch;

$('#controller').css('width', cw+'px');

drawGrid();
$('.color_btn').click(function(){
	$('.color_btn').removeClass('color_btn_selected');
	$(this).addClass('color_btn_selected');
	strokeColor = $(this).css('background-color');
})
canvas.onmousedown = function(e){
	e.preventDefault();
	beginStroke({x: e.clientX, y: e.clientY});
}
canvas.onmouseup = function(e){
	e.preventDefault();
	endStroke();
}
canvas.onmouseout = function(e){
	e.preventDefault();
	endStroke();
}
canvas.onmousemove = function(e){
	e.preventDefault();
	if(isMD){
		moveStroke({x: e.clientX, y: e.clientY});
	}
}

canvas.addEventListener('touchstart', function(e){
	e.preventDefault();
	touch = e.touches[0];
	beginStroke({x: touch.pageX, y: touch.pageY});

})
canvas.addEventListener('touchmove', function(e){
	e.preventDefault();
	if(isMD){
		touch = e.touches[0];
		moveStroke({x: touch.pageX, y: touch.pageY});
	}
})
canvas.addEventListener('touchend', function(e){
	e.preventDefault();
	endStroke();
})

$('#clear_btn').click(function(e){
	ctx.clearRect(0, 0, cw, ch);
	drawGrid();
})

function drawGrid(){
	ctx.save();
	ctx.strokeStyle = 'rgb(230,11,9)'

	ctx.beginPath();
	ctx.moveTo(3, 3);
	ctx.lineTo(cw - 3, 3);
	ctx.lineTo(cw - 3, ch - 3);
	ctx.lineTo(3, ch - 3);
	ctx.closePath();

	ctx.lineWidth = 6;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(cw, ch);

	ctx.moveTo(cw, 0);
	ctx.lineTo(0, ch);

	ctx.moveTo(cw/2, 0);
	ctx.lineTo(cw/2, ch);

	ctx.moveTo(0, ch/2);
	ctx.lineTo(cw, ch/2);
	ctx.closePath();

	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.restore();
}

function winToCan(x, y){
	var bbox = canvas.getBoundingClientRect()
	return {x: Math.round(x - bbox.left), y: Math.round(y - bbox.top)}
}

function calcDistance(loc1, loc2){
	return Math.sqrt((loc1.x - loc2.x)*(loc1.x - loc2.x) + (loc1.y - loc2.y)*(loc1.y - loc2.y))
}

var maxLineWidth = 30;
var minLineWidth = 1;
var maxStrokeV = 10;
var minStrokeV = 0.1;
function calcLineWidth( t , s ){

    var v = s / t;

    var resultLineWidth;
    if( v <= minStrokeV )
        resultLineWidth = maxLineWidth;
    else if ( v >= maxStrokeV )
        resultLineWidth = minLineWidth;
    else{
        resultLineWidth = maxLineWidth - (v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }

    if( lastLineWidth == -1 )
        return resultLineWidth;

    return resultLineWidth*1/3 + lastLineWidth*2/3;
}

function beginStroke(point){
	isMD = true;
	lastLoc = winToCan(point.x, point.y);
	lastTimestamp = new Date().getTime();
}
function endStroke(){
	isMD = false;
}
function moveStroke(point){
	var curLoc = winToCan(point.x, point.y);
	var curTimestamp = new Date().getTime();
	var s = calcDistance(curLoc, lastLoc);
	var t = curTimestamp -lastTimestamp;

	var lineWidth = calcLineWidth(t, s);

	ctx.beginPath();
	ctx.moveTo(lastLoc.x, lastLoc.y);
	ctx.lineTo(curLoc.x, curLoc.y);

	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = lineWidth;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.stroke();
	lastLoc = curLoc;
	lastTimestamp = curTimestamp;
	lastLineWidth = lineWidth;
}