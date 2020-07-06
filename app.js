const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const path = require('path');

const stuffRouter = require('./routes/stuff');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://yusuf:yusuf@cluster0-4lthi.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/stuff', stuffRouter);
  app.use('/api/auth', userRouter);



  module.exports = app;