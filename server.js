require('dotenv').config({silent: true});

//node modules
var port = process.env.PORT || 3001;
var path = require('path');
var bodyParser = require('body-parser');

//express modules
var express = require('express');
var app = express();


//database
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

//bodyparser middleware
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));






//AUTH ROUTES
var passport = require('passport')
  , BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));
app.get('/auth/twitterlogin',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });












//serve the bundle
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

//listen
app.listen(port, function(){
	console.log('server listening on port ' + port)
})