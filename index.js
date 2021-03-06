const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const helmet = require('helmet')
const path = require('path')
const routes = require('./routes')
const passport = require('passport')
require('./config/config')
require('./services/passport')

const requireLogin = passport.authenticate('localLogin', {
  failureRedirect: '/login'
})
// const requireAuthToken = passport.authenticate('jwtLogin')

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

/**
 * Note: CookieSession middleware comes before
 * app.use(passport.initialize)
 * app.use(passport.session)
 * because they use CookieSession middleware and we can't use it before
 */

// eslint-disable-next-line function-paren-newline
app.use(
  cookieSession({
    keys: [process.env.SESSION_SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
// eslint-disable-next-line function-paren-newline
)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.post(
  '/api/users/signup',
  routes.authRoutes.userSignup,
  requireLogin,
  routes.authRoutes.userSignin
)

app.post('/api/users/query', routes.authRoutes.queryUser)

app.post('/api/users/login', requireLogin, routes.authRoutes.userSignin)
app.get('/api/logout', routes.authRoutes.signoutUser)
app.get(
  '/api/users/:userId',
  routes.authRoutes.authSession,
  routes.authRoutes.fetchUser
)

app.post(
  '/api/store/add',
  routes.authRoutes.authSession,
  routes.storeRoutes.addShop
)
app.delete(
  '/api/store/delete',
  routes.authRoutes.authSession,
  routes.storeRoutes.deleteShop
)
app.get('/api/stores', routes.storeRoutes.getStores)
app.get('/api/store/:storeId', routes.storeRoutes.getSingleStore)
app.put(
  '/api/store/toggleVisiblity',
  routes.authRoutes.authSession,
  routes.storeRoutes.toggleVisiblity
)

app.get('/api/current_user', routes.authRoutes.getCurrentUser)

app.get('/api/stores', routes.storeRoutes.getStores)

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signup' }),
  routes.authRoutes.authGoogleCallback
)

app.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signup' }),
  routes.authRoutes.authFbCallback
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on http://localhost:${PORT}`)
})
