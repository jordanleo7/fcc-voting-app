// Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const passport = require('passport');
require('dotenv').config();
const app = express();
const cookieSession = require('cookie-session');

const PORT = process.env.PORT;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react/public')));

// To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  next();
});

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
//

require('./config/passport');
// app.route('/auth/github').get(passport.authenticate('github'));

app.get('/auth/logout', (req,res) => {
  res.send('logging out');
})

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth/login');
  } else {
    // If logged in
    next();
  }
};

//
// Answer API requests.
//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

// Create a poll
app.post('/api/newpoll', urlEncodedParser, function (req, res, next) {

  let newTitle = req.body.title;
  let newOptions = req.body.options.split(/\r?\n/);
  let newCreator = 'John Smith';

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
    console.log(poll, req.body.choice);
    poll.options[req.body.choice].votes += 1;
    poll.save();
    res.send(poll);
  })
})

app.put('/api/newpolloption/:id', urlEncodedParser, function (req, res, next) {
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
  response.sendFile(path.resolve(__dirname, '../react/public', 'index.html'));
});

app.listen(PORT, () => console.log(`Express listening on port ${PORT}`))
