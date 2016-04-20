	//ajax  
	var xhr = new XMLHTTPrequest();  
	xhr.open('get', url);  
	xhr.responseType = '' //response data type  
	xhr.onload = function(){  
	  //do you want to do  
	}  
	
	//audio play  connect ==> destination;
	var ac = new window.auidoContext();  
	//解码  
	ac.decodeAudioData(data, function(buffer){
	  var bufferSource = ac.createBufferSource();//创建节点  
	  bufferSource.buffer = buffer;  
	  bufferSource.connect(ac.destination);//链接硬件  
	  bufferSource.start();  
	}, function(err){  
	  //do some things  
	})  
			  
	//volume change  connect  ==> gainNode ==> destination   
	var gainNode = ac.createGain();  
	gainNode.connect(ac.destination);// bufferSource.connect(gainNode);  
	gainNode.gain.value = //you need'value  
	
	
	//stop and bug fix  
	var source = null;    
	{source = bufferSource;  
	source && source.stop;}  
	//↑↑↑but that has bug  
	//onload and decodeAudioData is asynchronous  we need tags  
	var count = 0;  
	
	var n = ++count;  
	xhr.abort//ajax stop last time request  
	onload{  
	if(n != count) return  
	decodeAudioData{  
	  if(n != count) return;
	}  
	}  
	
	
	//get analyser data connect bufferSource ==>analyser==>gainnode  
	var visualizer = function(){  
	  var arr = new uint8Array(analyser.frequencyBinCount)  
	  var v = function(){  
	    analyser.getByteFrequencyData(arr);  
			console.log(arr);  
			requestAnimationFrame(v)  
	  }  
	  //requestAnimationFrame 重复执行v函数  
	  window.requestAnimationFrame(v);  
	}  
	//让visualizer时实分析将visualizer放在全局执行  
	
	//已经获得分析的音频数据接下来是canvas绘制
	//减少size
	var size = 128;
	analyser.fftSize = size * 2;
	//
	var ctx = canvas.getContext('2d');
	var height, width;
	var resize = function(){
		height = box.clientHeight;
		width = box.clientWidth;
		canvas.height = height;
		canvas.width = width;
	}
	//设置渐变  
	var line = ctx.createLinearGradient(0, 0, 0, height );  
	line.addColorStop(0, 'red');  
	line.addColorStop(0.5, 'yellow');  
	line.addColorStop(1, 'green');  
	ctx.fillStyle = line;  
	  
	var draw = functhon(arr){  
		ctx.clearRect(0, 0, width, height)；  
		var w = width / size;  
		for(var i = 0; i < size; i++){  
			var h = arr[i] / 256 * height;  
			ctx.fillRect(w * i, height - h, w * 0.6, h);  
		}  
	}  
	//圆形绘制
	var random = function(n, m){
		return Math.round(Math.random()*(m - n) + n
		);
	}

	var getDots = function(){
		Dots = [];
		for(var i = 0; i < size; i++){
			var x = random(0, width);
			var y = random(0, height);
			var color = 'rgb('+ random(0, 255) +', '+ random(0, 255) +', '+ random(0, 255) +')';
			Dots.push({
				x: x,
				y: y,
				color: color
			})
		}
	}
	
	
	ctx.beginPath();
	var o = Dots[i];
	var r = arr[i] / 255 *50;
	ctx.arc(o.x, o.y, r, 0, Math.PI*2);
	var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
	g.addColorStop(0, '#fff');
	g.addColorStop(1, o.color);
	ctx.fillStyle = g;
	ctx.fill();
