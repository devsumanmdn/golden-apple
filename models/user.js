const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1
  },
  bio: {
    type: String
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    minlength: 10,
    validate: {
      validator: validator.isMobilePhone,
      message: 'Sorry, {MOBILE} is not an indian mobile number.'
    }
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
