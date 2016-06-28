# jq源码学习笔记		
1. [14, 94] 定义一些变量		
-----
	```javascript
		jQuery = function( selector, context ) {
			return new jQuery.fn.init( selector, context, rootjQuery );
		}
	```





# javascript  
* document.documentElement 返回根节点		

* String.charAt(index) 方法可返回指定位置的字符。  		

* arrayObject.concat(arrayX,arrayX,......,arrayX) 链接数组且不改变与昂数组;		

* RegExpObject.source 返回模式匹配所用的文本		





# RegExp  		
* ? 匹配0次或1次  	
* * 匹配0次或多次		
* + 匹配1次或多次		
* .	匹配除换行符以外的任意字符		

* \s 匹配空白的字符		
* \S 匹配任意不是空白的字符		

* i	执行对大小写不敏感的匹配。	
* g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。	
* m	执行多行匹配。	

* /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/	检验number是否太大		
* /\S+/g 全局中检验非空白字符一次or多次
* /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/ 
