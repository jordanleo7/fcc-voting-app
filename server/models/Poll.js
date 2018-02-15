const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OptionSchema = new Schema({
  name: String,
  votes: Number
})

const PollSchema = new Schema({
  title: String,
  options: [OptionSchema],
  voted: Array,
  creator: String
})

// Create model
const Poll = mongoose.model('voting_app_poll', PollSchema);

module.exports = Poll;
