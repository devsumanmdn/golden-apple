const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const keys = require('../config/keys')
const User = require('../models/user')

const localOptions = {
  usernameField: 'uid'
}
const localLogin = new LocalStrategy(localOptions, (uid, password, done) => {
  User.findByCredentials(uid, password)
    .then(user => {
      if (user) {
        const token = user.generateAuthToken()
        const userToSend = {
          id: user._id, // eslint-disable-line
          email: user.email,
          username: user.username,
          token
        }
        return done(null, userToSend)
      }
      return done(null, false)
    })
    .catch(e => done(e))
})

const jwtOptions = {
  secretOrKey: keys.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.exp <= Date.now() / 1000) {
    done(null, false)
  }
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        const userToSend = {
          id: user._id, // eslint-disable-line
          email: user.email,
          username: user.username
        }
        return done(null, userToSend)
      }
      return done(null, false)
    })
    .catch(e => done(e))
})

passport.use('jwtLogin', jwtAuth)
passport.use('localLogin', localLogin)
