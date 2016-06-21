### indexedDB  

#### 浏览器兼容

```js
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
```

#### 打开|创建
```js
//open() 如果有这数据库名就打开没有就创建
indexedDB.open(dbName)
```

#### 事件

* onerror: 请求失败的回调函数句柄
```js
//事件结果
var thisDb = e.target.result;
//如果没有这表名创建
if(!thisDb.objectStoreNames.contains(tableName)){
//创建表名
createObjectStore
//autoIncrement是否自增
//createIndex()字段
	var objectStore = thisDb.createObjectStore(tableName, {keyPath: 'id', autoIncrement: true});
//创建字段 unique是否唯一
	objectStore.createIndex('name', 'name', {unique: false});
	objectStore.createIndex('phone', 'phone', {unique: false});
}
```
* onsuccess:请求成功的回调函数句柄

* 事务
1. 在对新数据库做任何事情之前，需要开始一个事务。事务中需要指定该事务跨越哪些object store。
2. 只读：read，不能修改数据库数据，可以并发执行 读写：readwrite，可以进行读写操作
```js
var transaction = db.transaction([tableName], 'readwrite');
```
* 获取 transaction.objectStore

* onupgradeneeded:请求数据库版本变化句柄
