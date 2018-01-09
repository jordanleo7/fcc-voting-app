// Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// MongoDB
const Poll = require('./Poll');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fcc-voting-app');
mongoose.Promise = global.Promise;

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


// Answer API requests.
app.get('/api/test', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

// Get all polls
app.get('/api/allpolls', function (req, res, next) {
  Poll.find({}).then(eachOne => {
    res.json(eachOne);
  })
})

// Get one poll
app.get('/api/poll/:id', function (req, res, next) {
  Poll.find({'_id':req.params.id})
  .then(poll => {
    res.json(poll);
  })
})

// Create a poll
app.post('/api/newpoll', urlEncodedParser, function (req, res, next) {

  let newPoll = new Poll({
    title: req.body.title
  })

  Poll.create(newPoll)
  .then(function(){
    console.log('Poll created')
    res.json('Poll created')
  })

/*
  var createTitle = req.body.title;
  // Split textarea by enter/return
  var createOptions = req.body.options.split(/\r?\n/);
  var createdBy = 'placeholder';

  var createPoll = new Poll({
    title: createTitle,
    options: [],
    voted: [],
    creator: createdBy
  });

  // Save poll
  Poll.create(createPoll).then(function(){
    Poll.findOne({title: createTitle}).then(function(poll){
      // Add options to poll
      var i = 0;
      for (i = 0; i < createOptions.length; i++) {
        var currentOption = createOptions[i];
        poll.options.push({name: currentOption, votes: 0});
      }
      poll.save();
    })
    res.json('board created')
  });
  */

});



// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react/public', 'index.html'));
});




app.listen(PORT, () => console.log(`Express listening on port ${PORT}`))
