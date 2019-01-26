const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  logType: { type: String, required: true },
  logProgress: {type: Number, required: false},
  content: { type: String, required: true }
});

module.exports = mongoose.model('Log', logSchema);
