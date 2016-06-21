var indexedDbObj = function(){
	this.openRequest;
	this.request;
	this.indexedDB;
	this.init(dbNames);
}

indexedDbObj.prototype.init = function(){
	this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
}

indexedDbObj.prototype.open = function(dbName, callback){
	var openRequest = this.indexedDB.open(dbName);

	openRequest.error = function(e){
		console.log(e.target.errorCode);
	}

	openRequest.onsuccess = function(e){
		console.log('db is deleted succed')
	}

	openRequest.upgradeneeded = function(e){
		if(callback){
			callback(this.e.target.result);
			return this.e.target.result;
		}
	}
}

indexedDbObj.prototype.deleteDB = function(dbName){
	var openRequest = this.indexedDB.deleteDatabase(dbName);

	openRequest.error = function(e){
		console.log(e.target.errorCode);
	}

	openRequest.onsuccess = function(e){
		console.log('db is deleted succed')
	}
}

indexedDbObj.prototype.createIndex = function(){

}

var dbNames = 'test'
