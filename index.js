const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const { mongoose } = require('./config/config');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

app.post('/api/users/signup', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password', 'username']);
    const user = new User(body);
    await user.save();
    res.send('done');
  } catch (e) {
    res.status(404).send('error');
  }
});

app.get('/api/test', (req, res) => {
  res.send('working');
});

app.post('api/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password', 'username']);
  if (username) {
    User.findOne({ username: body.email }, '_id password', (err, data) => {
      if (data.password === body.password) {
        res.send('correct!');
      } else if (data === null) {
        res.send('incorrect username!');
      } else {
        res.send('incorrect password!!');
      }
    });
  }
});

app.post('/api/users/query', async (req, res) => {
  let data = _.pick(req.body, ['name', 'value']);
  User.findOne({ [data.name]: data.value }, 'email', function (err, user) {
    if (err) return res.status(400).send('err');
    user === null ? res.send(false) : res.send(data.name);
  });
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw { error: 'User not fount' };
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`);
});
