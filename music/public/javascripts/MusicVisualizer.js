var MusicVisualizer = function(obj){
	this.source = null;
	this.count = 0;

	this.analyser = MusicVisualizer.ac.createAnalyser();
	this.size = obj.size;
	this.analyser.fftSize = this.size * 2;

	this.gainNode = MusicVisualizer.ac.createGain();
	this.gainNode.connect(MusicVisualizer.ac.destination);

	this.analyser.connect(this.gainNode);

	this.xhr = new XMLHttpRequest();

	this.visualizer = obj.visualizer;

	this.visualizer();

}

MusicVisualizer.ac = new window.AudioContext();

MusicVisualizer.prototype.load = function(url){
	this.xhr.abort();
	this.xhr.open('GET', url);
	this.xhr.responseType = 'arraybuffer';
	var self = this;
	this.xhr.onload = function(){
		fun(self.xhr.response);
	}
	this.xhr.send();
}

MusicVisualizer.prototype.decode = function(arraybuffer, fun){
	MusicVisualizer.ac.decodeAudioData(arraybuffer, function(buffer){
		fun(buffer);
	}, function(err){
		console.log(err);
	})
}

MusicVisualizer.prototype.play = function(url){
	var n = ++this.count;
	var self = this;
	this.source && this.source.stop();
	this.load(url, function(arraybuffer){
		if(n != self.count)return;
		self.decode(arraybuffer, function(buffer){
			if(n != self.count)return;
			var bs = MusicVisualizer.ac.createBufferSource();
			bs.buffer = buffer;
			bs.start(0);
			self.source = bs;
		})
	});
}

MusicVisualizer.prototype.stop = function(){
	this.source.stop(0);
}

MusicVisualizer.prototype.changeVolume = function(precent){
	this.gainNode.gain.value = percent * percent;
}

MusicVisualizer.prototype.visualizer = function(){
	var arr = new Uint8Array(this.analyser.frequecyBinCount);

	requestAnimationFrame = window.requestAnimationFrame;

	var self = this;
	var v = function(){
		self.analyser.getByteFrequencyData(arr);
		self.visualizer(arr);
		requestAnimationFrame(v);
	}
	requestAnimationFrame(v);
}