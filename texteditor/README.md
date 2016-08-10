# [select](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)
## window.getSelection()
    获得select对象

## 属性
    * anchorNode
    返回包含“起点”的节点。
    
    * anchorOffset
    “起点”在anchorNode中的偏移量。
    
    * focusNode
    返回包含“结束点”的节点。
    
    * focusOffset
    “结束点”在focusNode中的偏移量。
    
    * isCollapsed
    “起点”和“结束点* ”是否重合。
    
    * rangeCount
    返回selection中包含的range对象的数目，一般存在一个range，Ctrl健配合使用可以有多个。

## 方法
    * getRangeAt(index)
    从当前selection对象中获得一个range对象。
    
    * index：参考rangeCount属性。
    返回：根据下标index返回相应的range对象。
    
    * collapse(parentNode, offset)
    将开始点和结束点合并到指定节点（parentNode）的相应（offset）位置。
    
    * parentNode：焦点（插入符）将会在此节点内。
    
    * offset： 取值范围应当是[0, 1, 2, 3, parentNode.childNodes.length]。
    0：定位到第一个子节点前。
    1：第二个子节点前。
    ……
    
    * childNodes.length-1：最后一个子节点前。
    
    * childNodes.length：最后一个子节点后。
    Mozilla官方文档 中讲到取值为0和1，经测试不准确。文档中还有一句不是十分清楚“The document is not modified. If the content is focused and editable, the caret will blink there.”
    
    * extend(parentNode, offset)
    将“结束点”移动到指定节点（parentNode）的指定位置（offset）。
    “起点”不会移动，新的selection是从“起点”到“结束点”的区域，与方向无关（新的“结束点”可以在原“起点”的前面）。
    
    * parentNode：焦点将会在此节点内。
    
    * Offset：1，parentNode的最后；0，parentNode的最前。
    
    * modify(alter, direction, granularity)
    改变焦点的位置，或扩展|缩小selection的大小
    
    * alter：改变的方式。”move”，用于移动焦点；”extend”，用于改变selection。
    
    * direction：移动的方向。可选值forward | backword或left | right
    
    * granularity：移动的单位或尺寸。可选值，character", "word", "sentence", "line", "paragraph", "lineboundary", "sentenceboundary", "paragraphboundary", or "documentboundary"。
    Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1才会支持此函数， 官方文档：https://developer.mozilla.org/en/DOM/Selection/modify
    
    * collapseToStart()
    将“结束点”移动到，selction的“起点”，多个range时也是如此。
    
    * collapseToEnd()
    将“起点”移动到，selction的“结束点”，多个range时也是如此。
    
    * selectAllChildren(parentNode)
    将parentNode的所有后代节点（parentNode除外）变为selection，页面中原来的selection将被抛弃。
    
    * addRange(range)
    将range添加到selection当中，所以一个selection中可以有多个range。
    注意Chrome不允许同时存在多个range，它的处理方式和Firefox有些不同。
    
    * removeRange(range)
    从当前selection移除range对象，返回值undefined。
    Chrome目前没有改函数，即便是在Firefox中如果用自己创建（document.createRange()）的range作为参数也会报错。
    如果用oSelction.getRangeAt()取到的，则不会报错。
    
    *removeAllRanges()
    移除selection中所有的range对象，执行后anchorNode、focusNode被设置为null，不存在任何被选中的内容。
    
    *toString()
    返回selection的纯文本，不包含标签。
    
    *containsNode(aNode, aPartlyContained)
    判断一个节点是否是selction的一部分。
    
    *aNode：要验证的节点。
    
    *aPartlyContained：true，只要aNode有一部分属于selection就返回true；false，aNode必须全部属于selection时才返回true。

## document.activeElement
    该属性属于HTML5中的一部分，它返回当前获得焦点的元素，如果不存在则返回“body”。一般情况下返回的是“文本域”或“文本框”。也有可能返回“下拉列表”、“按钮”、“单选”或“多选按钮”等等，Mac OS系统中可能不会返回非输入性元素（textbox，例如文本框、文本域）。


    *selectionStart
    输入性元素selection起点的位置，可读写。
    
    *selectionEnd
    输入性元素selection结束点的位置，可读写。
    
    *setSelectionRange(start, end)
    设置输入性元素selectionStart和selectionEnd值
    如果textbox没有selection时，selectionStart和selectionEnd相等，都是焦点的位置。
    在使用setSelectionRange()时
    如果end小于start，会讲selectionStart和selectionEnd都设置为end；
    如果start和end参数大于textbox内容的长度（textbox.value.length），start和end都会设置为value属性的长度。
    值得一提的是selectionStart和selectionEnd会记录元素最后一次selection的相关属性，意思就是当元素失去焦点后，使用selectionStart和selectionEnd仍能够获取到元素失去焦点时的值。这个特性可能会对制作“插入表情”时十分有用（将表情插入到元素最后一次焦点的位置）。

# [Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
     Range可以用 Document 对象的 createRange方法创建，也可以用Selection对象的getRangeAt方法取得。另外，可以通过构造函数 Range() 来获得一个 Range 。

## 属性
    * Range.collapsed 只读
    返回一个用于判断 Range 起始位置和终止位置是否相同的布尔值。
    
    * Range.commonAncestorContainer 只读
    返回包含 startContainer 和 endContainer 的最深的节点。
    
    * Range.endContainer 只读
    返回包含 Range 终点的节点。
    
    * Range.endOffset 只读
    返回 endContainer 中表示Range终点位置的数字。
    
    * Range.startContainer 只读
    返回包含 Range 开始的节点。
    
    * Range.startOffset 只读
    返回 startContainer 中表示 Range 起始位置的数字。

## 方法
### 定位方法
    * Range.setStart()
    设置 Range 的起点。
    
    * Range.setEnd()
    设置 Range 的终点。
    
    * Range.setStartBefore()
    以其它节点 （ Node）为基准，设置 Range 的起点。
    
    * Range.setStartAfter()
    
    * 以其它节点为基准，设置 Range 的始点。
    
    * Range.setEndBefore()
    以其它节点为基准，设置 Range 的终点。
    
    * Range.setEndAfter()
    以其它节点为基准，设置 Range 的终点。
    
    * Range.selectNode()
    设定一个包含节点和节点内容的 Range 。
    
    * Range.selectNodeContents()
    设定一个包含某个节点内容的 Range 。
    
    * Range.collapse()
    向指定端点折叠该 Range 。
### 编辑方法
    
    * Range.cloneContents()
    返回 Range 当中节点的文档片段（DocumentFragment）。
    
    * Range.deleteContents()
    从文档（Document）中移除 Range 中的内容。
    
    * Range.extractContents()
    把 Range 的内容从文档树移动到文档片段中。

    *Range.insertNode()
    在 Range 的起点处插入节点。
    
    * Range.surroundContents()
    将 Range 的内容移动到一个新的节点中。
        
###其他方法
    
    * Range.compareBoundaryPoints()
    比较两个 Range 的端点。
    
    * Range.cloneRange()
    返回拥有和原 Range 相同端点的克隆 Range 对象。
    
    * Range.detach()
    从使用状态释放 Range，此方法用于改善性能。
    
    * Range.toString()
    把Range内容作为字符串返回。
