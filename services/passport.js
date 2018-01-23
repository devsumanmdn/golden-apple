const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const keys = require('../config/keys')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    const userToDeserialize = {
      id: user._id, // eslint-disable-line no-underscore-dangle
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
        const token = user.generateAuthToken()
        const userToSend = {
          id: user._id, // eslint-disable-line no-underscore-dangle
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
          id: user._id, // eslint-disable-line no-underscore-dangle
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
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  // eslint-disable-next-line consistent-return
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const user = await User.findOne({ email })
    if (user) {
      const token = user.generateAuthToken()
      const senitizedUser = {
        id: user._id, // eslint-disable-line no-underscore-dangle
        username: user.username,
        token
      }
      return done(null, senitizedUser)
    }
    done(null, false)
  }
)

passport.use('jwtLogin', jwtAuth)
passport.use('localLogin', localLogin)
passport.use('google', googleOAuth2)
