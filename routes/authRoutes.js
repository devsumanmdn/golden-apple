const User = require('../models/user')

module.exports = {
  userSignup: async (req, res, next) => {
    try {
      let { email } = req.body
      const { username, password } = req.body
      email = email.toLowerCase()
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new Error('Email or Username already exist')
      }
      const newUser = new User({ email, username, password })
      const token = newUser.generateAuthToken()
      if (token) {
        await newUser.save()
        req.body.uid = email
        next()
      }
    } catch (e) {
      res.status(403).send(e.message)
    }
  },

  userSignin: (req, res) => {
    try {
      if (req.user) {
        return res.send({ token: req.user.token, username: req.user.username })
      }
      throw new Error('Authentication failed!')
    } catch (e) {
      return res.status(403).send(e.message)
    }
  },

  signoutUser: (req, res) => {
    req.logout()
    return res.redirect('/')
  },

  queryUser: async (req, res) => {
    try {
      const { prop, value } = req.body
      const user = await User.findOne({ [prop]: value }, prop)
      if (!user) {
        res.send('false')
      } else if (user.email) {
        res.send('email')
      } else if (user.username) {
        res.send('username')
      }
    } catch (e) {
      res.status(404).send('BAD REQUEST')
    }
  },

  fetchUser: async (req, res) => {
    try {
      if (req.user) {
        res.json(req.user)
      }
    } catch (e) {
      res.status(404).send(e)
    }
  },

  // eslint-disable-next-line consistent-return
  authSession: (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'authentication failed' })
    }
    next()
  },

  authGoogleCallback: (req, res) => {
    res.redirect('/')
  },

  getCurrentUser: (req, res) => res.send(req.user)
}
