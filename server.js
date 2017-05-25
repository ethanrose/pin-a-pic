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
var User = require('./models/user');
var Pic = require('./models/pic');

//bodyparser middleware
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));





var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
//AUTH ROUTES
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "https://pin-a-pic.herokuapp.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOne({ twitterId: twitterId.id }, function (err, user) {
      if (err) throw err;
      if (!user) {
        console.log(JSON.stringify(profile))
        User.create({twitterId: profile.twitterId})
        return cb(null, user)
      }
      return cb(err, user);
    });
  }
));

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.get('/api/userdata', function(req, res){
  res.send()
})
app.get('/api/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});





app.get('/api/allusers', function(req, res){
  User.find({}, function(err, users){
    if (err) throw err;
    res.send(users)
  })
})
app.get('/api/allpics', function(req, res){
  Pic.find({}, function(err, pics){
    if (err) throw err;
    res.send(pics)
  })
})
app.post('/api/postPicture', function(req, res){
  Pic.create({url: req.body.url, caption: req.body.caption})
})
app.get('/api/allPics', function(req, res){
  Pic.find({}, function(err, pics){
    res.send(pics)
  })
})
app.post('/api/deletePic/:id', function(req, res){
  if (req.user.username) {
    Pic.remove({_id: req.params.id}, function(err){
      if (err) throw err;
    })
  } else {
    res.send('not authorized')
  }
})

















//serve the bundle
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

//listen
app.listen(port, function(){
	console.log('server listening on port ' + port)
})