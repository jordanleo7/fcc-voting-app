// Express
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const passport = require('passport');
require('dotenv').config();

const app = express();
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react/build')));

// Cross Origin Resource Sharing
app.use(cors());
app.options('*', cors());

//
// User authentication
//
app.use(cookieSession({
  // 24 hour session
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//
// MongoDB
//
const Poll = require('./models/Poll');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

//
// User authentication
// http://localhost:3000/
require('./config/passport');

app.get('/auth/logout', (req,res) => {
  req.logout();
  res.redirect('/');
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));
// http://localhost:3000/mypolls
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/mypolls');
});

const authCheck = (req, res, next) => {
  if (req.user) {
    // If logged in
    next();
  } else {
    // If user is not logged in
    res.redirect('/auth/login');
  }
};

app.get('/isLoggedIn', function (req, res) {
  if (req.user) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log('Not logged in');
    res.send('Not logged in');
  }
})

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}

//
// Answer API requests.
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

// My polls / Logged in user's polls
app.get('/api/mypolls', function (req, res) {
  Poll.find({'creator': req.user._id}).then(eachOne => {
    res.json(eachOne);
  })
})

// Create a poll
app.post('/api/newpoll', urlEncodedParser, function (req, res, next) {

  let newTitle = req.body.title;
  let newOptions = req.body.options.split(/\r?\n/);
  let newCreator = req.user._id;

  let newPoll = new Poll({
    title: newTitle,
    options: [],
    voted: [],
    creator: newCreator
  })

  Poll.create(newPoll).then(function(){
    Poll.findOne({title: newTitle}).then(function(poll){
      newOptions.map((prop, index) => {
        poll.options.push({name: prop, votes: 0});
      })
      poll.save();
    });
    console.log('Poll created');
    res.json('Poll created');
  });

});

// Read all polls
app.get('/api/allpolls', function (req, res, next) {
  Poll.find({}).then(eachOne => {
    res.json(eachOne);
  })
})

// Read one poll
app.get('/api/poll/:id', function (req, res, next) {
  Poll.find({'_id':req.params.id})
  .then(poll => {
    res.json(poll);
  })
})

// Update a poll
app.put("/api/vote/:id", urlEncodedParser, function(req, res, next){
  Poll.findOne({'_id':req.params.id}, function (err, poll) {
    if (err) return err;

    // Get voter's IP address
    var head = req.headers;
    var answer = new Object();
    answer.ipaddress = head['x-forwarded-for'].split(',')[0];

    // Find user ID in poll
    var foundUser = poll.voted.find(function(e) {
      if (req.user) {
        return e === req.user._id;
      }
    })

    // Find IP address in poll
    var foundIP = poll.voted.find(function(e) {
      return e === answer.ipaddress;
    })

    console.log('found: ', foundUser, foundIP);

    if (foundUser || foundIP) {
      console.log('user already voted');
    } else {
      poll.options[req.body.choice].votes += 1;
      if (req.user) {
        poll.voted.push(req.user._id);
      }
      poll.voted.push(answer.ipaddress);
      poll.save();
    }
    
    console.log(poll, req.body.choice);
    res.send(poll);
  })
})

app.put('/api/newpolloption/:id', authCheck, urlEncodedParser, function (req, res, next) {
  Poll.findOneAndUpdate({'_id':req.params.id}, {$addToSet: {options: {name: req.body.newPollOption, votes: 0}}}, {new: true}).then(updatedPoll => {
    res.send(updatedPoll);
  })
})

// Delete a poll
app.delete('/api/deletepoll/:id', authCheck, function (req, res, next) {
  Poll.findOneAndRemove({'_id': req.params.id})
    .then(() => {
      res.json('Poll deleted');
    })
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`))
