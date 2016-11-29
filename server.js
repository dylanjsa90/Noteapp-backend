'use strict';
process.env.APP_SECRET='devKey';
if (!process.env.APP_SECRET) throw new Error('No Secret Key');

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('note:server');
const cors = require('cors');

// app modules
const handleError = require('./lib/handle-error');
const authRouter = require('./router/auth_router');
const listRouter = require('./router/list-router');
const noteRouter = require('./router/note-router');

// module constants
const app = express();
const port = process.env.PORT || 3000;
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://localhost/notedev';

// module logic
mongoose.Promise = Promise;
mongoose.connect(mongoDbUri);

// -- express middleware
app.use(morgan('dev'));
app.use(cors());

// express routes
app.use('/api', authRouter);
app.use('/api', listRouter);
app.use('/api', noteRouter);


app.all('*', function(req, res, next){
  debug('hit 404 route');
  next(createError(404, `ERROR: ${req.method} :: ${req.url} is not a route`));
});

// express error handling
app.use(handleError);

// start server
app.listen(port, function(){
  debug(`server up :: ${port}`);
});
