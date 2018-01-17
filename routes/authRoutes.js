const User = require('../models/user')

module.exports = {
  userSignup: async (req, res) => {
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
        res.send({ token })
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
  }
}
