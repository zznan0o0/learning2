var $ = function(name){
	return document.querySelectorAll(name);
}

var musics = $('.left p');
var volume = $('#volume')[0];
var xhr = new XMLHttpRequest();
var ac = new window.AudioContext();
var gainNode = ac.createGain();
gainNode.connect(ac.destination);
var source = null;
var count = 0;
var analyser = ac.createAnalyser();
var size = 64;
analyser.fftSize = size * 2;
analyser.connect(gainNode);

var Dots = [];

var line;

var load = function(url){
	var n = ++count;
	source && source.stop();
	xhr.abort();
	xhr.open('GET', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(){
		if(n != count) return;

		ac.decodeAudioData(xhr.response, function(buffer){
			if(n != count) return;

			var bufferSource = ac.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.connect(analyser);
			bufferSource.start();
			source = bufferSource;
		}, function(err){
			console.log(err);
		});
	}
	xhr.send();
}

var visualizer = function(){
	var arr = new Uint8Array(analyser.frequencyBinCount);
	var v = function(){
		analyser.getByteFrequencyData(arr);
		//console.log(arr);
		draw(arr);
		requestAnimationFrame(v)
	}
	window.requestAnimationFrame(v);
}

for(var i = 0; i < musics.length; i++){
	musics[i].onclick = function(){
		for(var j = 0; j < musics.length; j++){
			musics[j].className = '';
		}
		this.className = 'selected';
		load('/medio/' + this.innerText);
	}
}

volume.onchange = function(){
	gainNode.gain.value = this.value / this.max;
}

var box = $('.right')[0];
var width, height;
var canvas = document.createElement('canvas');
box.appendChild(canvas);
var ctx = canvas.getContext('2d');
var select = $('.select div');


var random = function(n, m){
	return Math.round(Math.random()*(m - n) + n);
}

var getDots = function(){
	Dots = [];
	for(var i = 0; i < size; i++){
		var x = random(0, width);
		var y = random(0, height);
		var color = 'rgba('+ random(0, 255) +', '+ random(0, 255) +', '+ random(0, 255) +',0)';
		Dots.push({
			x: x,
			y: y,
			dx: random(1, 4),
			color: color,
			cap: 0
		});
	}
}


var resize = function(){
	height = box.clientHeight;
	width = box.clientWidth;
	canvas.height = height;
	canvas.width = width;
	line = ctx.createLinearGradient(0, 0, 0, height);
	line.addColorStop(0, 'red');
	line.addColorStop(0.5, 'yellow');
	line.addColorStop(1, 'green');
	
	getDots();
}

var draw = function(arr){
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = line;
	var w = width / size;
	var cw = w * 0.6;
	var capH = cw > 10 ? 10 : cw;
	for(var i = 0; i < size; i++){
		if(draw.type == 'Column'){
			var o = Dots[i];
			var h = arr[i] / 256 * height;
			ctx.fillRect(w * i, height - h, cw, h);
			ctx.fillRect(w * i, height - (o.cap + capH), cw, capH);
			o.cap --;
			if(o.cap < 0){
				o.cap = 0;
			}
			if(h > 0 && o.cap < h + 40){
				o.cap = h + 40 > height - capH ? height - capH : h + 40;
			}
		}
		else if(draw.type == 'Dot'){
			ctx.beginPath();
			var o = Dots[i];
			var r = 10 + arr[i] / 255 * (height > width ? width : height) / 10;
			ctx.arc(o.x, o.y, r, 0, Math.PI*2);
			var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
			g.addColorStop(0, '#fff');
			g.addColorStop(1, o.color);
			ctx.fillStyle = g;
			ctx.fill();
			o.x += o.dx;
			o.x = o.x>width?0:o.x;
		}
	}
}
for(var i = 0; i < select.length; i++){
	select[i].onclick = function(){
		for(var j = 0; j < select.length; j++){
			select[j].className = ''
		}
		this.className = 'selected2';
		draw.type = this.innerText;
	}
}
draw.type = 'Column';


resize();
window.onresize = resize;

visualizer();