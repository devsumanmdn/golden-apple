const mongoose = require('mongoose')
const _ = require('lodash')
const keys = require('../config/keys')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const validator = require('validator')

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
        type: String
      },
      token: {
        type: String
      }
    }
  ]
})

UserSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()
  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  const user = this
  const access = 'auth'
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, keys.SECRET_KEY)
    .toString()

  user.tokens.push({ access, token })
  return user.save().then(() => {
    return token
  })
}

UserSchema.pre('save', function(next) {
  const user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

UserSchema.statics.findByCredentials = function(prop, value, password) {
  const User = this
  return User.findOne({ [prop]: value }).then(user => {
    if (!user) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user)
        } else {
          reject()
        }
      })
    })
  })
}

const User = mongoose.model('user', UserSchema)

module.exports = User
