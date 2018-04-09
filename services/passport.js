const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook')
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
require('dotenv').config()
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    const userToDeserialize = {
      id: user._id,
      username: user.username
    }
    done(null, userToDeserialize)
  })
})

const localOptions = {
  usernameField: 'uid'
}
const localLogin = new LocalStrategy(localOptions, (uid, password, done) => {
  User.findByCredentials(uid, password)
    .then(user => {
      if (user) {
        const userToSend = {
          id: user._id,
          username: user.username
        }
        return done(null, userToSend)
      }
      return done(null, false)
    })
    .catch(e => done(e))
})

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY,
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
          id: user._id,
          username: user.username
        }
        return done(null, userToSend)
      }
      return done(null, false)
    })
    .catch(e => done(e))
})

const googleOAuth2 = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const user = await User.findOne({ email })
    if (user) {
      const senitizedUser = {
        id: user._id,
        username: user.username
      }
      return done(null, senitizedUser)
    }
    done(null, false)
  }
)

const facebookAuth = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['email']
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const user = await User.findOne({ email })
    if (user) {
      const senitizedUser = {
        id: user._id,
        username: user.username
      }
      return done(null, senitizedUser)
    }
    done(null, false)
  }
)

passport.use('jwtLogin', jwtAuth)
passport.use('localLogin', localLogin)
passport.use('google', googleOAuth2)
passport.use('facebook', facebookAuth)
