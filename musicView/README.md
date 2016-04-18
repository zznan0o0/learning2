//ajax
var xhr = new XMLHTTPrequest();
xhr.open('get', url);
xhr.responseType = '' //response data type
xhr.onload = function(){
  //do you want to do
}

//audio play
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
