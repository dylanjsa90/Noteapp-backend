'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/error_handler');
const User = require('../model/user');
const BasicHTTP = require('../lib/basic_http');
const authzn = require('../lib/authorization');
const jwt_auth = require('../lib/jwt_auth');
const transporter = require('../lib/mailer');

let authRouter = module.exports = exports = Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password)
    .then((tokenData) => {
      newUser.save().then(() => {res.json(tokenData)}, ErrorHandler(400, next))
    }, ErrorHandler(500, next, 'Server Error'));
});

authRouter.get('/signin', BasicHTTP, (req, res, next) => {
  let authError = ErrorHandler(401, next, 'Authenticat Seyzz no!');
  User.findOne({'username': req.auth.username}) 
    .then((user) => {
      if (!user) return authError(new Error('No Such User'));
      user.comparePassword(req.auth.password)
        .then(res.json.bind(res), authError);
    }, authError);
});

authRouter.post('/forgotPassword', jsonParser, (req, res, next) => {
  User.findOne({'email': req.body.email}).then((user) => {
    let mailOptions = {
      from: 'Task Manager <taskmanagerherokuapp@gmail.com>',
      to: user.email,
      subject: 'Forgot Password',
      text: 'The account with email ' + user.email + 'requested a reset password link',
      html: '<p>The account with email ' + user.email + 'requested a reset password link.</p>'
    };
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) next(err);
    });

  })
});

authRouter.put('/addrole/:userid', jsonParser, jwt_auth, authzn(), (req, res, next) => {
  User.update({_id: req.params.userid}, {$set: {role: req.body.role}}).then(res.json.bind(res), ErrorHandler(500, next, 'server error'));
});

authRouter.get('/users', jsonParser, jwt_auth, authzn(), (req, res, next) => {
  User.find().then(res.json.bind(res), ErrorHandler(500, next, 'server error'));
});
