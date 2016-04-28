####防止元素中文字被选中
	onselectstart="return false;"

####垂直居中css方法
	position: absolute; top: 50%; margin-top: -height/2;
####设置水平、垂直居中的方法：
	position:absolute; left:50%; top:50%; margin-left:-width/2; margin-top:-height/2;

1、css中perspective使子元素有3d效果 2、background-visibility:hidden;当元素不面向屏幕时隐藏 3、transform-style:preserve-3d; 支持子元素的3D效果; transform: translate(0px, 0px) rotateY（0deg）;定义位移以及沿着Y轴旋转

####stringObj.substr(start, length) 抽取字符串

####stringObject.replace(regexp/substr,replacement)方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

####join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
####splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
	arrayObject.splice(index,howmany,item1,.....,itemX)
	index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
	howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
	item1, ..., itemX	可选。向数组添加的新项目。