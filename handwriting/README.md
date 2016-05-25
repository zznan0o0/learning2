#### canvas
		//设置样式
		strokeStyle
		//起始
		beginPath
		//闭合
		closePath
		//初始点
		moveTo
		//绘制点
		lineTo
		//绘制线
		stroke
		//线宽度
		lineWidth
		//获得鼠标坐标
		e.offsetX;
		e.offsetY;
		window的x，y
		e.clientX, e.clientY
		//获得canvas属性
		getBoundingClientRect()	//bottom,left,right,top,height,width
		//获得鼠标坐标2(取整)
		var bbox = canvas.getBoundingClientRect()
		return {Math.round(x - bbox.left), Math.round(y - bbox.top)}
		//粗线条问题线与线之间会出现间隔解决方法↓↓↓
		lineCap = 'round'	//butt	默认。向线条的每个末端添加平直的边缘。
						 	//round	向线条的每个末端添加圆形线帽。
						 	//square	向线条的每个末端添加正方形线帽。
		//使线段更平滑
		ctx.lineJoin="round"	//bevel	创建斜角。
								//round	创建圆角。
								//miter	默认。创建尖角。

		//粗细改变
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



		<--! 移动端 -->
			<meta name="viewport" content="
			<--! pixel_value固定值，device-width设备宽 -->
			width = [pixel_value | device-width],
			height = [pixel_value | device-height],
			<!-- 缩放 -->
			initial-scale = float_value,
			minimum-scale = float_value,
			minimum-scale = float_value,
			<!-- 能否缩放 -->
			user-scalable = [yes | no]
		">
		//touch事件
		touchstart
		touchmove
		touchend