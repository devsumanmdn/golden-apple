//@ts-check
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')
const { mongoose } = require('./config/config')
const validator = require('validator')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(express.static('./client/build'))

app.post('/api/users/signup', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password', 'username'])
    body.username = body.username.toLowerCase()
    body.email = body.email.toLowerCase()
    const user = new User(body)
    const token = user.generateAuthToken()
    if (token) {
      await user.save()
      res.header('x-auth', token).send(user)
    } else {
      new Error('Token generation failed')
    }
  } catch (e) {
    console.log(e)
    res.status(403).send(e)
  }
})

app.post('/api/users/query', async (req, res) => {
  try {
    let { prop, value } = req.body
    let user = await User.findOne({ [prop]: value }, prop)
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
})

app.post('/api/users/login', async (req, res) => {
  try {
    let user
    const body = _.pick(req.body, ['uid', 'password'])
    let eoru = ''
    if (validator.isEmail(body.uid)) {
      eoru = 'email'
    } else {
      eoru = 'username'
    }

    if (eoru === 'username') {
      user = await User.findByCredentials('username', body.uid, body.password)
    } else if (eoru === 'email') {
      user = await User.findByCredentials('email', body.uid, body.password)
    }
    if (user) {
      const token = await user.generateAuthToken()
      res
        .header('x-auth', token)
        .status(200)
        .send(true)
    } else {
      throw false
    }
  } catch (e) {
    res.status(403).send(e)
  }
})
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      throw { error: 'User not fount' }
    } else {
      res.send(true)
    }
  } catch (e) {
    res.status(404).send(e)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`)
})
