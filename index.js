const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const { mongoose } = require('./config/config');
const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.post('/api/users/signup', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
})

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}`);
});
