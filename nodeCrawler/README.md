####时间获取
	var fileName = date.getFullYear().toString() + (date.getMonth()+1) + date.getDate() + date.getHours() +date.getMinutes() + date.getSeconds() + date.getMilliseconds();
####path当前文件下
	path.join(__dirname,name)
####request文件传输
	request(url).pipe(fs.createWriteStream('doodle.png'))
fs 
====
####创建文件夹
	fs.mkdirSync(path);
	fs.writeFileSync(path, data);
####是否有该文件夹存在
	fs.existsSync('img')
####注意编码一致
	req.setEncoding("binary");
	fs.writeFileSync(imgUrlName, chunk, "binary");