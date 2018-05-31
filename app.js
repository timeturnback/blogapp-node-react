var express = require("express");
var session = require('express-session');

var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user');
var post = require('./post')

var app = express();
app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.use(session({secret: 'my-secret'}));
var sessions;

app.post('/signin', function (req, res) {
  sessions=req.session;
  var user_name=req.body.email;
  var password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      sessions.username = user_name;
      res.send('success')
    }
    else{
      res.send('Wrong username password')
    }
  });
});

app.post('/signup', function (req, res) {
  var name=req.body.name;
  var email=req.body.email;
  var password=req.body.password;

  if(name && email && password){
      user.signup(name, email, password)
  }
  else{
    res.send('Failure');
  }
});

app.get('/home', function (req, res) {
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html');
  }
  else{
    res.send('unauthorized');
  }
});

app.post('/addpost', function (req, res) {
  var title = req.body.title;
  var subject = req.body.subject;
  post.addPost(title, subject ,function(result){
    res.send(result);
  });
});

app.post('/getpost', function (req, res) {
  post.getPost(function(result){
    res.send(result);
  });
})

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});
