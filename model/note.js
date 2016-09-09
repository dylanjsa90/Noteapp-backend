'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('note:note');

Promise.promisifyAll(mongoose);

let noteSchema = Schema({
  name: {type: String, required: true},
  listId: {type: Schema.Types.ObjectId, required: true},
  content: {type: String, require: true},
});

module.exports = mongoose.model('Note', noteSchema);
