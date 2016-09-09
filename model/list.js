'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('note:list');
const Note = require('./note');
const createError = require('http-errors');

//Promise.promisifyAll(mongoose);

mongoose.Promise = Promise;

const listSchema = mongoose.Schema({
  name: {type: String, required: true},
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note', unique: true}],
});

listSchema.methods.addNote = function(data){
  let result;
  return new Promise((resolve, reject) => {
    if (!data.name || !data.content || !data.listId)
      return reject(createError(400, 'note requires name, content, and listId'));
    new Note(data).save()
      .then(note => {
        result = note;
        this.notes.push(note._id);
        return this.save(); 
      })
      .then(() => resolve(result))
      .catch(reject)
  });
};

listSchema.methods.removeNoteById = function(noteId) {
  return new Promise((resolve, reject) => {
    this.notes.filter( value => {
      if (value === noteId) return false;
      return true;
    })
    this.save()
    .then(() => {
      return Note.findByIdAndRemove(noteId)
    })
    .then( note => resolve(note))
    .catch(reject)
  })
}

module.exports = mongoose.model('List', listSchema);
