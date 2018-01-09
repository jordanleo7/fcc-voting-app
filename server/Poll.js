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
  voted: String,
  creator: String
})

// Create model
const Poll = mongoose.model('poll', PollSchema);

module.exports = Poll;
