var lis = $('.left ul li');
var xhr = new XMLHttpRequest();
var ac = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = ac[ac.createGain?'createGain':'createGainNode']();
var analyser = ac.createAnalyser();
var source = null;
var count = 0;
var box = $('#box')[0];
var height, width;
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var size = 128;
var selected = document.getElementById('type').getElementsByTagName('li');
var Dots = [];
var line;

function $(s){
	return document.querySelectorAll(s);
}

function load(url){
	var n = ++count;
	source && source[source.stop?'stop':'noteOff']();
	xhr.abort();
	xhr.open('GET', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(){
		if(n != count)return;

		//音频解码decodeAudioData
		ac.decodeAudioData(xhr.response, function(buffer){
			if(n != count)return;
			var bufferSource = ac.createBufferSource(); //创建一个声音源
			bufferSource.buffer = buffer; //告诉源播放何物
			bufferSource.connect(analyser)//连接分析对象 
			bufferSource[bufferSource.start?"start":'noteOn'](0);
			source = bufferSource;
			
		}, function(err){
			console.log(err);
		})
	}
	xhr.send();
}

function changeVolume(percent){
	gainNode.gain.value = percent * percent;
}

function visualizer(){
	var arr = new Uint8Array(analyser.frequencyBinCount);//length
	requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	function v(){
		analyser.getByteFrequencyData(arr);
		draw(arr);
		requestAnimationFrame(v);
	}

	requestAnimationFrame(v);
}

function resize(){
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

function draw(arr){
	ctx.clearRect(0, 0, width, height);
	var w = width / size;
	ctx.fillStyle = line;

	for(var i = 0; i < size; i++){
		if(draw.type == 'column'){
			var h = arr[i] / 256 * height;
			ctx.fillRect(w * i, height - h, w * 0.6, h);
		}
		else if(draw.type == 'dot'){
			var o = Dots[i];
			var r = arr[i] / 255 * 50;
			ctx.beginPath();
			ctx.arc(o.x, o.y, r, 0, Math.PI*2, true);
			var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
			g.addColorStop(0, '#fff');
			g.addColorStop(1, o.color);
			ctx.fillStyle = g;
			ctx.fill();
		}
	}
}

function random(m, n){
	return Math.round(Math.random()*(n - m) + m);
}

function getDots(){
	Dots = [];

	for(var i = 0; i < size; i++){
		var x = random(0, width);
		var y = random(0 , height);
		var color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255)  + ')';
		Dots.push({
			x: x,
			y: y,
			color: color
		})
	}
}

draw.type = 'column';

for(var i = 0; i < selected.length; i++){
	selected[i].onclick = function(){
		for(var j = 0; j < selected.length; j++){
			selected[j].className = '';
		}
		this.className = 'selected';
		draw.type = this.getAttribute('data-type');
	}
}

gainNode.connect(ac.destination); //将该源于硬件连接

analyser.fftSize = size * 2;
analyser.connect(gainNode);

for(var i = 0; i < lis.length; i++){
	lis[i].onclick = function(){
		for(var j = 0; j < lis.length; j++){
			lis[j].className = '';
		}
		this.className = 'selected';
		load('/music/' + this.title);
	}
}

$('#volume')[0].onchange = function(){
	changeVolume(this.value / this.max);
}

visualizer();

box.appendChild(canvas);
resize();
window.onresize = resize;
