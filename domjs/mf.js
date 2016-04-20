function theSpeed(speed){
	speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	return speed;
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return parseFloat(obj.currentStyle[attr]);
	}
	else{
		return parseFloat(getComputedStyle(obj, false)[attr]);
	}
}

function iFrameHeight(id, name) { 
	var ifm= document.getElementById(id); 
	var subWeb = document.frames ? document.frames[name].document : ifm.contentDocument; 

	if(ifm != null && subWeb != null) { 
		ifm.style.height = subWeb.body.scrollHeight + 'px'; 
	} 
} 
//重新注册js
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(); 