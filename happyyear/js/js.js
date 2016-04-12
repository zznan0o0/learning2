var music = document.querySelector('.play');
var audio = document.getElementsByTagName('audio')[0];
var page1 = document.getElementById('page1'),
	page2 = document.getElementById('page2'),
	page3 = document.getElementById('page3');

/*music.onclick = function(){
	if(audio.paused){
		audio.play();
		//兼容问题animationPlayState  webkitAnimationPlayState
		//this.style.animationPlayState = 'running'
		//setAttribute()控制标签属性
		this.className = 'play';
	}
	else{
		audio.pause();
		//this.style.animationPlayState = 'paused'
		this.className = '';
	}
}*/

audio.addEventListener('ended', function(e){
	music.className = '';
}, false);

music.addEventListener('touchstart', function(e){
	if(audio.paused){
		audio.play();
		this.className = 'play';
	}
	else{
		audio.pause();
		this.className = '';
	}
}, false);

page1.addEventListener('touchstart', function(e){
	page1.style.display = 'none';
	page2.style.display = 'block';
	page3.style.display = 'block';
	page3.style.top = '100%';

	setTimeout(function(){
		page2.setAttribute('class', 'fadeOut page');
		page3.setAttribute('class', 'fadeIn page');
	}, 5500);

}, false);

console.log("网页可见区域宽" + document.body.clientWidth);
console.log("网页可见区域高" + document.body.clientHeight);
console.log("网页可见区域宽（包括边框线的宽）" + document.body.offsetWidth);
console.log("网页可见区域高（包括边框线的宽）" + document.body.offsetHeight);
console.log("网页正文全文域宽" + document.body.scrollWidth);
console.log("网页正文全文域高" + document.body.scrollHeight);
console.log("网页被卷去的高" + document.body.scrollTop);
console.log("网页被卷去的左" + document.body.scrollLeft);
console.log("网页网页正文部分上" + window.screenTop);
console.log("网页网页正文部分左" + window.screenLeft);
console.log("屏幕分辨率高" + window.screen.height);
console.log("屏幕分辨率宽" + window.screen.width);
console.log("屏幕可用工作区宽" + window.screen.availWidth);
console.log("屏幕可用工作区高" + window.screen.availHeight);