/*
mongo database crud operation handled by nodejs driver
**/

/*
module dependencies
**/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function MongoDao(mongoUri, dbname) {
	var _this = this;
	var options = { useNewUrlParser: true };
	_this.mongoClient = new MongoClient(mongoUri, options);

	return new Promise(function(resolve, reject) {
		_this.mongoClient.connect(function(err, client) {
			assert.equal(err, null);
			console.log("mongo client successfully connected \n");
			_this.dbConnection = _this.mongoClient.db(dbname);
			resolve(_this);
		});
	});
}

MongoDao.prototype.readCollection = function(collectionName) {
	return this.dbConnection.collection(collectionName).find();
}

MongoDao.prototype.printDocument = function(collectionName, doc, callback) {
	this.dbConnection.collection(collectionName).find({}).filter(doc).toArray(function(err, docs) {
		console.log(docs[0]);
		console.log("\n");
		callback();
	});
}

MongoDao.prototype.insertDocument = function(collectionName, doc, callback) {
	var _this = this;
	this.dbConnection.collection(collectionName).insertOne(doc, function(err, result) {
		assert.equal(null, err);
		console.log(" Below doc inserted successfully");
		_this.printDocument(collectionName, doc, callback);
	});
}

MongoDao.prototype.updateDocument = function(collectionName, doc, updateDocument, callback) {
	var _this = this;
	this.dbConnection.collection(collectionName).updateMany(doc, updateDocument, function(err, result) {
		assert.equal(null, err);
		console.log(result.result.ok + " document updated successfully");
		_this.printDocument(collectionName, doc, callback);
		callback();
	});
}

MongoDao.prototype.deleteDocument = function(collectionName, doc, callback) {
	this.dbConnection.collection(collectionName).deleteOne(doc, function(err, result) {
		assert.equal(null, err);
		console.log(result.result.ok + " document deleted successfully");
		callback();
	});
}

module.exports = MongoDao;