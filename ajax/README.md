###### 发送请求
		open(method, url, async)
		send()
###### exmple
		open('post', 'www.baidu.com', true);
		setRequestHeader('content-type','application/x-www-form-urlencoded');
		send('name=aaa&sex=man');
##### 响应
		responseText:接受字符串
		responseXML：接受xml
		status,statusText: http状态码
		getAllResponseHeader(): 获取所以的响应报头
		getResponseHeader(): 查询响应中某个字段的真

		readyState :0未初始化，1服务连接建立open调用，2请求接收头信息，3请求处理接收响应体，4完成
##### 监听事件
		onreadystatechange = function(){
			
		}
		
		curry 你可以下载 lodash这个库


