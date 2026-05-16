const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  duration: String,
  rating: Number,
  tags: [String]
});

module.exports = mongoose.model('Trip', tripSchema);