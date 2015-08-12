var assert = require('assert');
var request = require('supertest');
var should = require('should');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

require('./../../listener')(app);

var agent = request.agent(app);

var recruitJSONStringGET = [{
  "_id": "TESTING",
  "alt_email": "TESTING",
  "forename": "TESTING",
  "phone": "TESTING",
  "recruiter": [{
    "comments": "TESTING",
    "date_met": "TESTING",
    "email": "TESTING",
    "event_name": "TESTING"
  }],
  "surname": "TESTING"
}];
var recruitJSONStringPUT = {
  "_id": "TESTING",
  "alt_email": "TESTING",
  "forename": "TESTING",
  "phone": "TESTING",
  "recruiter": {
    "comments": "TESTING",
    "date_met": "TESTING",
    "email": "TESTING",
    "event_name": "TESTING"
  },
  "surname": "TESTING"
};
var eventJSONStringGET = [{
  "_id": "TESTING",
  "details": "TESTING",
  "end_date": "TESTING",
  "start_date": "TESTING",
  "location": "TESTING",
  "name": "TESTING",
  "recruiter": [{
    "email": "TESTING"
  }]
}];
var eventJSONStringPOST = {
  "_id": "TESTING",
  "details": "TESTING",
  "end_date": "TESTING",
  "start_date": "TESTING",
  "location": "TESTING",
  "name": "TESTING",
  "recruiter": {
    "email": "TESTING"
  }
};

var createJsonError = function(code, fields, message) {
  var jsonError = {
    code: code,
    fields: fields,
    message: message
  };
  return jsonError;
};

var createJsonSuccess = function(status, message) {
  var jsonSuccess = {
    message: message,
    status: status
  };
  return jsonSuccess;
};

describe('myRecruitmentService', function() {
  it('Should be up', function(done) {
    describe('recruit', function() {
      agent.get('/')
        .expect(200)
        .expect("Hello")
        .end(function(err, res) {
          done();
        });
    });
  });

  describe('/recruit/v1', function() {
    describe('POST', function() {
      it('Should handle a PUT request with JSON body in the following format', function(done) {
        agent
          .put('/recruit/v1')
          .type('json')
          .send(recruitJSONStringPUT)
          .expect(createJsonSuccess(200, "The documents with the _id: " + "TESTING" + " was added to the database"))
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
    });
    describe('GET', function() {
      it('Should filter a search based on _id', function(done) {
        agent
          .get('/recruit/v1?_id=TESTING')
          .expect(recruitJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should filter a search based on recruiter', function(done) {
        agent
          .get('/recruit/v1?recruiter=TESTING')
          .expect(recruitJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should filter a search based on surname', function(done) {
        agent
          .get('/recruit/v1?surname=TESTING')
          .expect(recruitJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should filter a search based on forename', function(done) {
        agent
          .get('/recruit/v1?forename=TESTING')
          .expect(recruitJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should filter a search based on phone', function(done) {
        agent
          .get('/recruit/v1?phone=TESTING')
          .expect(recruitJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
    });
  });

  describe('event/v1', function() {
    describe('PUT', function() {
      it('Should post a new event into the database', function(done) {
        agent
          .put('/event/v1')
          .send(eventJSONStringPOST)
          .expect(createJsonSuccess(200, "The documents with the _id: " + "TESTING" + " was added to the database"))
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
    });
    describe('GET', function() {
      it('Should filter a search based on _id', function(done) {
        agent
          .get('/event/v1?_id=TESTING')
          .expect(eventJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should filter a search based on location', function(done) {
        agent
          .get('/event/v1?location=TESTING')
          .expect(eventJSONStringGET)
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      it('Should return an array of JSON objects if not given a parameter', function(done) {
        agent
          .get('/event/v1')
          .type('json')
          .end(function(err, res) {
            if (err) throw err;
            done();
          });
      });
      // it('Should return an Error JSON object if there was a Database connection problem (NOTE: Should fail unless mongodb is down)', function(done) {
      //   agent
      //     .get('/event/v1')
      //     .expect(503)
      //     .expect(createJsonError(503, 'mongodb_connection', "There was an error connecting to the database"))
      //     .end(function(err, res) {
      //       if (err) throw err;
      //       done();
      //     });
      // });
    });
  });
});
