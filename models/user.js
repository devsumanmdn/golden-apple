const mongoose = require('mongoose')
const _ = require('lodash')
// const keys = require('../config/keys')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
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

/*
UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this
  const token = jwt.sign(
    { sub: user._id, iat: Date.now() / 1000 },
    keys.SECRET_KEY,
    { expiresIn: '30d' }
  )
  return token
}
*/

UserSchema.pre('save', function preSave(next) {
  const user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) throw saltErr
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) throw hashErr
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
    const candidateUser = uid.toLowerCase().trim()
    let user
    if (validator.isEmail(candidateUser)) {
      user = await User.findOne({ email: candidateUser })
    } else {
      user = await User.findOne({ lowerUsername: candidateUser })
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
