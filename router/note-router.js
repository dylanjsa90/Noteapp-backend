'use strict';

// node modules
// npm modules
const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:note-router');

// app modules
const Note = require('../model/note');
const List = require('../model/list');

//module constants
let noteRouter = module.exports = exports = new Router();

// module logic
noteRouter.post('/note', jsonParser, function(req, res, next){
  debug('POST /api/note');
  let data = req.body;
  List.findById(data.listId)
    .then( list => {
      list.addNote(req.body)
        .then( note => res.json(note))
        .catch(next)
    }).catch(err => next(createError(404, 'list does not exist')));
})

noteRouter.get('/note', function(req,res,next){
  debug('GET /api/note/');
  Note.find({}).then( notes => res.send(notes)).catch(next);
});

noteRouter.get('/note/:id', function(req,res,next){
  debug('GET /api/note/:id');
  Note.findById(req.params.id)
    .then( note => res.send(note))
    .catch( err => next(createError(404, err.message)));
});

noteRouter.put('/note/:id', jsonParser, function(req, res, next){
  debug('PUT /api/note/:id');
  Note.findByIdAndUpdate( req.params.id, req.body, {new: true})
    .then( note => res.send(note))
    .catch(next)
});

noteRouter.delete('/note/:id', jsonParser, function(req, res, next){
  debug('DELETE /api/note/:id');
  Note.findById(req.params.id)
    .then( note => {
      console.log('note', req.params.id);
      return List.findById(note.listId)
    })
    .then( list => {
      return list.removeNoteById(req.params.id)
    })
    .then( note => res.json(note))
    .catch(next)
});
