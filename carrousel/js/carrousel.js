(function($){
	var Carousel = function(poster){
		this.poster = poster;
		this.posterItemMain = poster.find('ul.poster-list');
		this.nextBtn = poster.find('div.poster-next-btn');
		this.prevBtn = poster.find('div.poster-prev-btn');
		this.posterFirstItem = this.posterItemMain.find('li').eq(0);
		this.posterItems = poster.find('li.poster-item');
		this.setting = {
			"width":1000,
			"height":270,
			"posterWidth":640,
			"posterHeight":270,
			"scale":0.9,
			"speed":500,
			"verticalAlign":"middle"
		}
		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
		//this.setPosterPos();
	}

	Carousel.prototype = {
		getSetting: function(){
			var setting = this.poster.attr('data-setting');
			if(setting && setting != ''){
				return $.parseJSON(setting);
			}
			else{
				return {}
			}
		},
		setSettingValue: function(){
			this.poster.css({
				width: this.setting.width,
				height: this.setting.height
			});
			this.posterItemMain.css({
				width: this.setting.width,
				height: this.setting.height
			});
			var w = (this.setting.width - this.setting.posterWidth)/2;
			this.nextBtn.css({
				width: w,
				height: this.setting.height
			});
			this.prevBtn.css({
				width: w,
				height: this.setting.height
			});
			this.posterFirstItem.css({
				left: w,
				'z-index': Math.floor(this.posterItems.size()/2)
			});
		},
		setPosterPos: function(){
			var self = this;
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0, sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor(this.posterItems.size()/2);

			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width - this.setting.posterWidth)/2)/level;

			var i = 1, j = i;

			var firstLeft = (this.setting.width - this.setting.posterWidth)/2;
				fixOffsetLeft = firstLeft + rw;

			rightSlice.each(function(){
				level--;
				rw = rw*self.setting.scale;
				rh = rh*self.setting.scale;
				$(this).css({
					'z-index': level,
					width: rw,
					height: rh,
					opacity: 1/(++j),
					left: fixOffsetLeft + (++i)*gap - rw,
					top: (self.setting.height - rh)/2
				});
			});

			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(){
				$(this).css({
					'z-index': level,
					width: lw,
					height: lh,
					opacity: 1/oloop,
					left: i*gap,
					top: (self.setting.height - lh)/2
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});
		}
	}

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		});
	}

	window['Carousel'] = Carousel;
})(jQuery)