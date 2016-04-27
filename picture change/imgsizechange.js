var imgSizeChange = function(className){
	var body = document.getElementsByTagName('body')[0];
	var imgObj = document.getElementsByTagName('img');
	var obj = [];
	var zz = document.createElement('div');
	var img = document.createElement('img')
	var height = '300', width = '500';
	zz.style.position = 'absolute';
	zz.style.width = '100%';
	zz.style.height = '100%';
	zz.style['z-index'] = '1';
	zz.style['opacity'] = '0.3';
	zz.style['background-color'] = '#000';
	zz.style['top'] = '0';
	zz.style['left'] = '0';
	zz.style['right'] = '0';
	zz.style['bottom'] = '0';
	zz.style['display'] = 'none';
	body.style.position = 'relative';
	img.style.position = 'absolute';
	img.style['z-index'] = '100';
	img.style['display'] = 'none';
	img.style['height'] = height+'px';
	img.style['width'] = width+'px';
	img.style['top'] = '50%';
	img.style['left'] = '50%';
	img.style['margin-top'] = -height/2+'px';
	img.style['margin-left'] = -width/2+'px';

	body.appendChild(zz);
	body.appendChild(img);

	for(var i = 0; i < imgObj.length; i++){
		if(imgObj[i].className == className){
			obj.push(imgObj[i]);
		}
	}
	for(var i = 0; i < obj.length; i++){	
		obj[i].onclick = function(){
			zz.style.display = 'block';
			img.style.display = 'block';
			img.src = this.src;
		}
	}
	zz.onclick = function(){
		zz.style.display = 'none';
		img.style.display = 'none';
	}
	img.onclick = function(){
		zz.style.display = 'none';
		img.style.display = 'none';
	}

	window.onmousewheel = function(e){
		if(zz.style.display == 'block'){
			e.preventDefault();
			if(e.wheelDelta > 0){
				img.style['height'] = parseInt(img.style['height'])+6+'px';
				img.style['width'] = parseInt(img.style['width'])+10+'px';
				img.style['margin-top'] = -parseInt(img.style['width'])/2+'px';
				img.style['margin-left'] = -parseInt(img.style['width'])/2+'px';
			}
			else{
				img.style['height'] = parseInt(img.style['height'])-6+'px';
				img.style['width'] = parseInt(img.style['width'])-10+'px';
				img.style['margin-top'] = -parseInt(img.style['width'])/2+'px';
				img.style['margin-left'] = -parseInt(img.style['width'])/2+'px';
			}
		}
	}
}

imgSizeChange('imgSizeChange');