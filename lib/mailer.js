'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({host: 'stmp.gmail.com', secureConnection: true, port: 465, auth: {user: 'TaskManagerHerokuApp@gmail.com', pass: 'TMHAlive'}});

module.exports = exports = transporter;