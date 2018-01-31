const mongoose = require('mongoose')
const _ = require('lodash')
const keys = require('../config/keys')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose
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
  lowerUsername: {
    type: String
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
  stores: [{ type: Schema.Types.ObjectId, ref: 'store' }],
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

UserSchema.methods.toJSON = function toJSON() {
  const user = this
  const userObject = user.toObject()
  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this
  const token = jwt.sign(
    { sub: user._id, iat: Date.now() / 1000 },
    keys.SECRET_KEY,
    { expiresIn: '30d' }
  )
  return token
}

UserSchema.pre('save', function preSave(next) {
  const user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

UserSchema.statics.findByCredentials = async function findByCredentials(
  uid,
  candidatePassword
) {
  try {
    const User = this
    let user
    uid = uid.toLowerCase()
    if (validator.isEmail(uid)) {
      user = await User.findOne({ uid })
    } else {
      // $regex with 'i' flag helps us to make case in-sensitive searches
      user = await User.findOne({ lowerUsername: [uid] })
    }
    if (user) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, res) => {
          if (err) throw err
          if (res) {
            resolve(user)
          } else {
            reject()
          }
        })
      })
    }
    throw new Error('User not found')
  } catch (e) {
    return Promise.reject(e.message)
  }
}

const User = mongoose.model('user', UserSchema)

module.exports = User
