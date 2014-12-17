var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/andpeople';
var ANDdb;
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    ANDdb = db;
    assert.equal(null, err);
    console.log("Connected correctly to server");
});

module.exports = {
    insertDocument: function (collection, document, callback) {
        var collection = ANDdb.collection(collection);

        collection.insert(document, function (err, result) {
            assert.equal(err, null);
            callback(result);
        });
    },

    updateDocument: function (collection, document, callback) {
        var collection = ANDdb.collection(collection);
        var id = new ObjectID(document._id);
        delete document._id;
        collection.update({_id: id}, {$set: document}, function (err, result) {
            console.log(err);
            assert.equal(err, null);
            callback(result);
        });
    },

    getDocuments: function (collection, callback) {
        var collection = ANDdb.collection(collection);

        collection.find().toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    }
};