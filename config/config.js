const keys = require('./keys');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.createConnection(keys.MONGODB_URI, { useMongoClient: true });

module.exports = { mongoose };
