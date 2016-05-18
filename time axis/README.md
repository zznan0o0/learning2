##### border-color
		//透明
		transparent
		//继承父级颜色
		inherit
##### 设置边框宽度和样式
		border-width
		border-style
##### css三角形
		.content_item_icon_arrow{
			position: absolute;
			left: -10px;
			top: 10px;
			height: 0px;
			border-color: transparent #e2e2e2 transparent transparent;
			border-width: 10px 10px 10px 0px;
			border-style: dashed solid dashed dashed;
		}
###### 换行
		正常文字的换行(亚洲文字和非亚洲文字)元素拥有默认的white-space:normal
		连续的英文字符和阿拉伯数字,使用word-wrap : break-word ;或者word-break:break-all;
##### CSS vertical-align 属性
		baseline	默认。元素放置在父元素的基线上。
		sub	垂直对齐文本的下标。
		super	垂直对齐文本的上标
		top	把元素的顶端与行中最高元素的顶端对齐
		text-top	把元素的顶端与父元素字体的顶端对齐
		middle	把此元素放置在父元素的中部。
		bottom	把元素的顶端与行中最低的元素的顶端对齐。
		text-bottom	把元素的底端与父元素字体的底端对齐。
		length	 
		%	使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。
		inherit	规定应该从父元素继承 vertical-align 属性的值。
##### 获得html
		obj.innerHTML

##### date
		//转化为时间对象
		new Date(obj);
##### 四舍五入
		numberObj.toFixed(num) 
		num	必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。

##### 数组方法 
		array.unshift()
		//separator	可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。
		arrayObject.join(separator)

##### replace
		stringObject.replace(regexp/substr,replacement)
		regexp/substr	
		必需。规定子字符串或要替换的模式的 RegExp 对象。
		请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
		replacement	必需。一个字符串值。规定了替换文本或生成替换文本的函数。