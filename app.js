//connect nodejs to mongo db
const assert = require('assert');
const MongoDao = require('./mongodao');

const url = 'mongodb://nagappans:abc123@localhost:27017/?authMechanism=DEFAULT';

const dbName = 'ecommerce';

const collectionName = "customer";

var doc = {"firstName":"nagappan","lastName":"subramanian","emailId":"nagappan08@gmail.com"};

var mongoDao;

const readFn = function() {
	mongoDao.readCollection(collectionName).toArray(function(err, docs) {
		console.log(docs.length + " documents available in collection "+ collectionName + " \n");
		insertFn();
	});
}

const insertFn = function() {
	//insert and then inserted record will be read
	mongoDao.insertDocument(collectionName, doc, updateFn);
}

const updateFn = function() {
	var updateDoc = {"$set": {"mobile": 9629230494}};
	mongoDao.updateDocument(collectionName, doc, updateDoc, deleteFn);
}

const deleteFn = function() {
	mongoDao.deleteDocument(collectionName, doc, endProgram);
}

const endProgram = function() {
	process.exit(0);
}

async function main() {
	mongoDao = await new MongoDao(url, dbName);

	insertFn();
}

main();