## 设置样式  
		ctx.fillStyle = ''
## 填充样式
		ctx.fillRect(x,y,width,height);
## requestAnimFrame(function) ——    
		支持ie 10+ 自动计算时间  
## context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); 	
		img	规定要使用的图像、画布或视频。	
		sx	可选。开始剪切的 x 坐标位置。	
		sy	可选。开始剪切的 y 坐标位置。	
		swidth	可选。被剪切图像的宽度。	
		sheight	可选。被剪切图像的高度。	
		x	在画布上放置图像的 x 坐标位置。
		y	在画布上放置图像的 y 坐标位置。
		width	可选。要使用的图像的宽度。（伸展或缩小图像）	
		height	可选。要使用的图像的高度。（伸展或缩小图像）	
## 时间间隔
		var lastTime, deltaTime;
		function init(){
			lastTime = date.now();
		}

		function loop(){
			var now = date.now();
			deltaTime = now - lastTime;
			lastTime = now;
		}
## 变透明
		//全局透明
		globalAlpha();
		//样式作用域
		save();
			//
		restore();