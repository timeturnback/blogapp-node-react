var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/';

module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
            client.db('Blog').collection('post').insertOne( {
                "title": title,
                "subject": subject,
                "tag": tag
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the blog post details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
                client.close();
            });
        });
    },
    updatePost: function(id, title, subject, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
            client.db('Blog').collection('post').updateOne(
                { "_id": new mongodb.ObjectID(id) },
                { $set:
                    { "title" : title,
                    "subject" : subject
                }
            },function(err, result){
                assert.equal(err, null);
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
                client.close();
            });
        });
    },
    deletePost: function(id, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
           client.db('Blog').collection('post').deleteOne({
            _id: new mongodb.ObjectID(id)
        },
        function(err, result){
            assert.equal(err, null);
            console.log("Deleted the post.");
            if(err == null){
                callback(true)
            }
            else{
                callback(false)
            }
            client.close();
        });
       })
    },
    getPostWithId: function(id, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
            client.db('Blog').collection('post').findOne({
            _id: new mongodb.ObjectID(id)
        },
        function(err, result){
            assert.equal(err, null);
            if(err == null){
                callback(result)
            }
            else{
                callback(false)
            }
            client.close();
        });
       })
    },
    getPost: function(callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
           client.db('Blog').collection('post', function (err, collection) {
            collection.find().toArray(function (err, list) {
                callback(list);
                client.close();
            });
        });
       })
    },
    getTag: function(callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
           client.db('Blog').collection('tag', function (err, collection) {
            collection.find().toArray(function (err, list) {
                callback(list);
                client.close();
            });
        });
       })
    },
    addTag: function(tagName, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
            client.db('Blog').collection('tag').insertOne( {
                "name": tagName
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the tag details.");
                if(err == null){
                    callback(true)
                }
                else{
                    callback(false)
                }
                client.close();
            });
        });
    }
}
