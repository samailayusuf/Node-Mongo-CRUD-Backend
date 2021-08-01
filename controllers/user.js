const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => { 
    bcrypt.hash(req.body.password, 10).then( (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });//getting the password from request body and hashing it with bcrypt

        user.save().then(() => {
            res.status(201).json({
              message: 'User added successfully!'
            });
          }
        ).catch((error) => {
            res.status(500).json({
              error: error
            });//saving the user or handling the error if there is one
          }
        );
      }
    );
  };


  exports.login = (req, res, next) => { //controller to handle login
    User.findOne({ email: req.body.email }).then(
      (user) => { //retrived user data from DB
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!') //error is returned if user is not set
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => { //if password comparison was successful
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!') //thow error if not successfully compared
              });
            }
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }
