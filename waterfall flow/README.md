整体思路
===
排序好第一行之后开始第二行的图片高度最小的那个开始以 *position:absolute;left:offsetWidth * 最小图片的索引位置;top最小图片的offsetHeight   *  
当一张图片排完后就该变hArr的最小值      

		hArr[index] += boxs[i].offsetHeight;

document.body.clientWidth ==> BODY对象宽度    
document.body.clientHeight ==> BODY对象高度    
document.documentElement.clientWidth ==> 可见区域宽度    
document.documentElement.clientHeight ==> 可见区域高度    
obj.style.cssText 设置css样式      

apply()    
====
		语法：apply([thisObj[,argArray]])   
		定义：应用某一对象的一个方法，用另一个对象替换当前对象。   
		说明：   
		如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。   
		如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj，   并且无法被传递任何参数。    

call()    
====
		语法：call([thisObj[,arg1[, arg2[,   [,.argN]]]]]) 
		定义：调用一个对象的一个方法，以另一个对象替换当前对象。   
		说明：   
		call 方法可以用来代替另一个对象调用一个方法。call   方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
		如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。   

Math.min.apply(null, hArr)  
====
		由于Math.min()不能接受数组用Math.min.apply(null, hArr)就可以替换了
		Math.min.apply(null,hArr); 第一个参数是null的情况下，this指向window,调用全局函数Math.min()方法。求出最小值
以classname获取节点   
==== 
		var getByClass = function(classname){
			var classTag = [];
			var tagAll = document.getElementsByTagName('*');
			for(var i = 0; i < tagAll.length; i++){
				var allClassName = tagAll[i].className.split(' ');
				for(var j = 0; j < allClassName.length; j++){
					if(allClassName[j] == classname){
						classTag.push(tagAll[i]);
						break;
					}
				}
			}
			return classTag;
		}
获得数组索引  
====
		Array.prototype.getArrIndex = function(val){
			var allIndex = [];
			for(var i = 0; i < this.length; i++){
				if(this[i] == val){
					allIndex.push(i);
				}
			}
			return allIndex;
		}

JQuery  
====
		$obj.width()
		//包含border padding  
		$obj.outerWidth
		//obj.offset
		$obj.offset().XXX

CSS3 
==== 
		//需要各个浏览器兼容 设置列宽 个数为 window.width/column-width
		column-width
		//设置几列
		column-count: 5;
		//列边线
		column-rule: 2px dashed #F00;
		//列间距
		column-gap: 5px;
