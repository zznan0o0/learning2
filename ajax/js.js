function xhrAjax(opens, data, fun){
	var xhr = window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject('Microsoft.XMLHTTP');
	opens['method'] = opens['method']?opens['method']:'GET';
	opens['async'] = opens['async']?opens['async']:false;
	if(!opens['url']) console.log('url 不存在');

	xhr.open(opens['method'], opens['url'], opens['async']);
	opens['method']=='GET'?xhr.send():xhr.send(data);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				if(fun){
					var data = xhr.responseText?xhr.responseText:xhr.responseXML;
					fun(data);
					return data;
				}
			}
		}
	}
}

var opens = {
	method:'GET',
	url: '1.txt',
	async: false
}

xhrAjax(opens, false, function(data){
	console.log(data);
})