const keys = require('./keys');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(keys.MONGODB_URI);

module.exports = { mongoose };
