var g = function(id){
	return document.getElementById(id);
}
var g_class = function(className){
	return document.getElementsByClassName(className);
}
var g_tpl = function(id){
	return g('tpl_' + id).innerHTML;
}
var get_body_w = function(){
	return document.body.offsetWidth;
}
var get_body_h = function(){
	return document.body.offsetHeight;
}

var list = {}

for(var i = 0; i < data.length; i++){
	var date = new Date(data[i].date);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;

	var lunar = GetLunarDateString(date);

	if(!list[year]){list[year] = {};}
	if(!list[year][month]){list[year][month] = [];}

	var item = data[i];

	item.lunar = lunar[0] + '<br>&nbsp;' + lunar[1];
	item.year = year;
	item.month = month;
	item.like_format = item.like<10000?item.like:(item.like/10000).toFixed(1)+'万';	

	list[year][month].push(item);
}

var html_scrubber_list = [];

var tpl_year = g_tpl('scrubber_year');
var tpl_month = g_tpl('scrubber_month');

for(y in list){
	var html_year = tpl_year.replace(/\{year\}/g, y);

	var html_month = [];
	for(m in list[y]){
		html_month.unshift(tpl_month.replace(/\{month\}/g, m).replace(/\{year\}/g, y));
	}
	html_year = html_year.replace(/\{list\}/g, html_month.join(''))
	html_scrubber_list.push(html_year);
}

g('scrubber').innerHTML = html_scrubber_list.join('') + '<a href="javascript:;" onclick="scroll_top(get_body_h())">出生</a>';

//日志列表
var html_connent_list = [];
var tpl_year = g_tpl('content_year');
var tpl_month = g_tpl('content_month');
var tpl_item = g_tpl('content_item');

for(y in list){
	var html_year = tpl_year.replace(/\{year\}/g, y);

	var html_month = [];
	for(m in list[y]){
		var html_item = [];

		var isFinrst_at_month = true;
		for(i in list[y][m]){
			var item_data = list[y][m][i];
			var item_html = tpl_item
					.replace(/\{date\}/g, item_data.date)
					.replace(/\{lunar\}/g, item_data.lunar)
					.replace(/\{intro\}/g, item_data.intro)
					.replace(/\{media\}/g, item_data.media)
					.replace(/\{like\}/g, item_data.like)
					.replace(/\{like_format\}/g, item_data.like<9999?item_data.like:(item_data.like/10000).toFixed(1) +'万')
					.replace(/\{position\}/g, i%2?'right':'left')
					.replace(/\{isfirst\}/g, isFinrst_at_month?'first':'')
					.replace(/\{comment\}/g, item_data.comment);

			html_item.push(item_html);

			isFinrst_at_month = false;
		}

		html_month.unshift(tpl_month.replace(/\{year\}/g, y).replace(/\{month\}/g, m).replace(/\{list\}/g, html_item.join('')))
	}
	html_year = html_year.replace(/\{list\}/g, html_month.join(''))
	html_connent_list.push(html_year);
}

g('content').innerHTML = html_connent_list.join('') + '<div class="content_year" id="content_month_0_0">出生</div>';

//年份月份点击处理
var get_top = function(el){
	return el.offsetTop + 170;
}
var scroll_top = function(to){
	var start = document.body.scrollTop;
	fx(function(now){
		window.scroll(0, now);
	}, start, to)
	window.scroll(0, to);
}

var show_year = function(year){
	var c_year = g('content_year_' + year);
	var top = get_top(c_year);
	scroll_top(top);
	expand_year(year, g('scrubber_year_'+year));
}
var show_month = function(year, month){
	var c_month = g('content_month_' + year + '_' + month);
	var top = get_top(c_month);
	scroll_top(top)
	highlight_month(g('scrubber_month_'+year+'_'+month))
}

var highlight_month = function(element){
	var months = g_class('scrubber_month');
	for(var i = months.length - 1; i >= 0; i--){
		months[i].className = months[i].className.replace(/current/g, '');
	}
	element.className = element.className + 'current';
}
var expand_year = function(year, element){
	var months = g_class('scrubber_month');
	var show_month = g_class('scrubber_month_in_'+year);
	var years = g_class('scrubber_year');
	for(var i = months.length - 1; i >= 0; i--){
		months[i].style.display = 'none';
	}
	for(var i = show_month.length - 1; i >= 0; i--){
		show_month[i].style.display = 'block';
	}
	for(var i = years.length - 1; i >= 0; i--){
		years[i].className = years[i].className.replace(/current/g, '');
	}
	element.className = element.className + 'current';
}

//scroll
var update_scrubber_year = function(top){
	var years = g('content').getElementsByClassName('content_year');
	var tops = [];
	for(var i = 0; i < years.length; i++){
		tops.push(years[i].offsetTop);
	}
	for(var i = 1; i < tops.length; i++){
		if(top > tops[i-1] && top < tops[i]){
			var year = years[i-1].innerHTML;
			var s_year = g('scrubber_year_' + year);
			expand_year(year,s_year);
		}
	}
}
var update_scrubber_month = function(top){
	var months = g('content').getElementsByClassName('content_month');
	var tops = [];
	for(var i = 0; i < months.length; i++){
		tops.push(months[i].offsetTop);
	}
	for(var i = 1; i < tops.length; i++){
		if(top > tops[i-1] && top < tops[i]){
			var id = months[i-1].id;
			highlight_month(g(id.replace('content', 'scrubber')))
		}
	}
}

window.onscroll = function(e){
	var top = document.body.scrollTop;
	var scrubber = g('scrubber');
	if(top > 200){
		scrubber.style.position = 'fixed';
		scrubber.style.top = '60px';
		scrubber.style.left = (get_body_w() - 960)/2 + 'px';
	}
	else{
		scrubber.style.position = '';
		scrubber.style.top = '';
		scrubber.style.left = '';
	}

	update_scrubber_year(top);
	update_scrubber_month(top);
}