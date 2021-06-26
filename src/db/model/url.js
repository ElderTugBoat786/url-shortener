
const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlShortener = new Schema({
  url:  String,
  short: String,
  click:   Number,
  key: String
});

module.exports = mongoose.model('urlShortener',urlShortener);
