var assert = require('assert');
var request = require('supertest');
var should = require('should');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json);

require('./../../listener')(app);

var agent = request.agent(app);

var recruitJSONString = JSON.stringify({
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
});

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
  it('Should be up', function() {
    describe('recruit', function() {
      agent.get('/').expect(200).expect("Hello").end(function(err, res) {});
    });
  });

  describe('/recruit/v1', function() {
    describe('POST', function() {

      var jsonString = JSON.stringify(testBody);
      it('Should handle a POST request with JSON body in the following format', function() {
        agent
          .post('/recruit/v1')
          .type('json')
          .send(recruitJSONString)
          .end(function(err, res) {
            if (err) throw err;
          });
      });
    });
    describe('GET', function() {
      it('Should filter a search based on _id', function() {
        agent
        .get('/recruit/v1?_id=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res){
          if (err) throw err;
        });
      });
      it('Should filter a search based on recruiter', function() {
        agent
        .get('/recruit/v1?recruiter=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res){
          if (err) throw err;
        });
      });
      it('Should filter a search based on surname', function() {
        agent
        .get('/recruit/v1?surname=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res){
          if (err) throw err;
        });
      });
      it('Should filter a search based on forename', function() {
        agent
        .get('/recruit/v1?forename=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res){
          if (err) throw err;
        });
      });
      it('Should filter a search based on phone', function() {
        agent
        .get('/recruit/v1?phone=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res){
          if (err) throw err;
        });
      });
      it('Should return a return an array of results at a given event', function() {
        agent
        .get('/recruit/v1?event=TESTING')
        .expect(res.body[0].recruitJSONString)
        .type('json')
        .end(function(err, res) {
          if (err) throw err;
        });
      });
    });
  });

  describe('event/v1', function() {
    describe('GET', function() {
      it('Should filter a search based on _id', function() {
        agent
        .get('/event/v1?event=TESTING')
        .expect(res.body[0])
        .type('json')
        .end(function(err, res) {
          if (err) throw err;
        });
      });
      it('Should filter a search based on location', function() {
        agent
        .get('/event/v1?location')
        .expect
      });
      it('Should return one JSON object if given an _id');
      it('Should return an array of JSON objects if not given _id');
      it('Should return an Error JSON object if there was a Database connectino problem');
    });
  });

});
