const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const routes = require('./routes')
const passport = require('passport')
require('./config/config')
require('./services/passport')

const requireLogin = passport.authenticate('localLogin', { session: false })
const requireAuthToken = passport.authenticate('jwtLogin', { session: false })

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(helmet())

app.post('/api/users/signup', routes.authRoutes.userSignup)

app.post('/api/users/query', routes.authRoutes.queryUser)

app.post('/api/users/login', requireLogin, routes.authRoutes.userSignin)
app.get('/api/users/:userId', requireAuthToken, routes.authRoutes.fetchUser)

app.post('/api/store/add', requireAuthToken, routes.storeRoutes.addShop)
app.delete('/api/store/delete', requireAuthToken, routes.storeRoutes.deleteShop)

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
