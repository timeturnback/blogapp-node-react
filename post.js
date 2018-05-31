var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/';

module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
            client.db('Blog').collection('post').insertOne( {
                "title": title,
                "subject": subject
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
    }
}
