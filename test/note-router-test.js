'use strict';

// setup env vars
process.env.MONGODB_URI = 'mongodb://localhost/notetest';

// npm modules
const request = require('superagent-use');
const superPromse = require('superagent-promise-plugin');
const expect = require('chai').expect;

// app modules
const Note = require('../model/note');
const List = require('../model/list');
require('../server');

request.use(superPromse);

describe('testing note routes', function(){
  describe('testing POST /api/note', function(){
    before((done) => {
      new List({name: 'example'}).save()
        .then( list => {
          this.tempList = list;
          done();
        }).catch(done)
    })

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.post('localhost:3000/api/note')
        .send({ 
          name: 'call mom',
          content: 'this is extreemly important',
          listId: this.tempList._id,
        })
      .then( res => {
        let data = res.body;
        expect(data.content).to.eql('this is extreemly important');
        expect(data.listId).to.eql(`${this.tempList._id}`);
        done();
      })
      .catch(done)
    })
  });

  describe('testing GET /api/note', function(){
    before((done) => {
      new List({name: 'example'}).save()
        .then( list => {
          return Promise.all([
            list.addNote({
              name: 'first note',
              content: 'test data',
              listId: list._id,
            }),
            list.addNote({
              name: 'second note',
              content: 'test data',
              listId: list._id,
            })
          ])
        })
      .then(() => done())
      .catch(done)
    })

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.get('localhost:3000/api/note')
      .then( res => {
        let data = res.body;
        expect(data.length).to.eql(2);
        expect(data[0].name).to.eql('first note');
        expect(data[1].name).to.eql('second note');
        done();
      })
      .catch(done)
    })
  });

  describe('testing GET /api/note/:id', function(){
    before((done) => {
      new List({name: 'example'}).save()
        .then( list => {
          this.tempList = list;
          return list.addNote({
            name: 'example',
            content: 'dummy data',
            listId: this.tempList._id,
          })
          .then((note) => {
            this.tempNote = note;
            done();
          }).catch(done)
        }).catch(done)
    })

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.get(`localhost:3000/api/note/${this.tempNote._id}`)
      .then( res => {
        let data = res.body;
        expect(data.name).to.eql('example');
        expect(data.content).to.eql('dummy data');
        expect(data.listId).to.eql(`${this.tempList._id}`);
        done();
      })
      .catch(done)
    })
  });

  describe('testing PUT /api/note/:id', function(){
    before((done) => {
      new List({name: 'example'}).save()
        .then( list => {
          this.tempList = list;
          return list.addNote({
            name: 'example',
            content: 'dummy data',
            listId: this.tempList._id,
          })
          .then((note) => {
            this.tempNote = note;
            done();
          }).catch(done)
        }).catch(done)
    })

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.put(`localhost:3000/api/note/${this.tempNote._id}`)
        .send({
          name: 'todo note',
        })
      .then( res => {
        let data = res.body;
        expect(data.name).to.eql('todo note');
        done();
      })
      .catch(done)
    })
  });

  describe('testing DELETE /api/note/:id', function(){
    before((done) => {
      new List({name: 'example'}).save()
        .then( list => {
          this.tempList = list;
          return list.addNote({
            name: 'example',
            content: 'dummy data',
            listId: this.tempList._id,
          })
          .then((note) => {
            this.tempNote = note;
            done();
          }).catch(done)
        }).catch(done)
    })

    after((done) => {
      Note.remove({}).then( () => done()).catch(done);
    });

    it('should return a note', (done) => {
      request.del(`localhost:3000/api/note/${this.tempNote._id}`)
      .then( res => {
        let data = res.body;
        expect(data.name).to.eql('example');
        done();
      })
      .catch(done)
    })
  });
})
