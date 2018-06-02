var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/';

module.exports = {
  signup: function(name, email, password){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
      client.db('Blog').collection('user').insertOne( {
        "name": name,
        "email": email,
        "password": password
      },function(err, result){
        assert.equal(err, null);
        console.log("Saved the user sign up details.");
        client.close();
      });
    });
  },

  getUserInfo: function(username, callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
      client.db('Blog').collection('user').findOne( { email : username
      },function(err, result){
        if(result==null){
          callback(false)
        }
        else{
          callback(result);
        }

        client.close();
      });

    });
  },

  updateProfile: function(name, password, username, callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
      client.db('Blog').collection('user').updateOne(
        { "email": username },
        { $set:
          { "name" : name,
          "password" : password
        }
      },function(err, result){

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

  validateSignIn: function(username, password,callback){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
        client.db('Blog').collection('user').findOne( { email : username ,password: password
        },function(err, result){
            if(result==null){
                callback(false)
            }
            else{
                callback(true)
            }
            client.close();
        });
    });
  }
}
