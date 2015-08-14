var MongoClient = require('mongodb');
var inspect = require('util').inspect;
var assert = require('assert');




module.exports = function(app) {

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

  // Home test
  app.get('/', function(req, res) {
    res.status(200).send("Hello");
    console.log("hit /");
  });
  /**
   * Good Response == 200
   * There was a problem with the database == 503
   * Bad Response == 400
   **/
  app.put('/recruit/v1', function(req, res) {
    var newRecruit = req.body;

    // console.log(validate(newRecruit, recruitJSONSchema));
    // console.log("JSON Validator: " +  inspect(v.validate(newRecruit, recruitJSONSchema), { depth: null }));
    // check if there is an email (_id) already registered in the database
    var _id = newRecruit._id;

    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) {
        console.warn(err);
        res.status(503).send(createJsonError(503, 'mongodb_connection', "There was an error connecting to the database"));
        res.end();
        db.close();
      } else {
        var collection = db.collection('recruit');
        var queryObject = {};
        if (!!_id) queryObject._id = _id;
        // console.log(require('util').inspect(newRecruit, { depth: null }));

        collection.find(queryObject).toArray(function(err, docs) {
          if (docs.length !== 0) {
            docs[0].recruiter.push(newRecruit.recruiter); // There is something wrong here
            newRecruit.recruiter = docs[0].recruiter;
          } else {
            var recruiterArray = [];
            recruiterArray.push(newRecruit.recruiter);
            newRecruit.recruiter = recruiterArray;
          }
          // Add the modified JSON object to the array
          collection.save(newRecruit, function(err, objects) {
            if (err) {
              console.warn(err.message);
              res.status(503).json(createJsonError(503, '', "There was an error inserting the document into the database"));
            } else {
              res.status(200).json(createJsonSuccess(200, "The documents with the _id: " + _id + " was added to the database"));
            }
            res.end();
            db.close();
          });
        });
      }
    });
  });

  /**
   *
   *
   *
   *
   **/
  app.get('/recruit/v1', function(req, res) {
    var _id = req.query._id;
    var event = req.query.event;
    var recruiter = req.query.recruiter;
    var surname = req.query.surname;
    var forename = req.query.forename;
    var phone = req.query.phone;

    // console.log("         _id: " + _id);



    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) {
        console.warn(err);
        res.status(503).send(createJsonError(503, '', "There was an error connecting to the database"));
        res.end();
        db.close();
      } else {

        // build query object
        var queryObject = {};
        if (!!_id) queryObject._id = _id;
        if (!!event) queryObject.event = event;
        if (!!recruiter) queryObject.recruiter = { $elemMatch: {email: recruiter } };
        if (!!surname) queryObject.surname = surname;
        if (!!forename) queryObject.forename = forename;
        if (!!phone) queryObject.phone = phone;
        // console.log(inspect(queryObject, {
        //   depth: Infinity,
        //   color: true
        // }));


        // get the event documents
        var collection = db.collection('recruit');
        // Find some documents
        collection.find(queryObject).toArray(function(err, docs) {
          assert.equal(err, null);
          // console.log("Found the following records");

          // console.log("----------------------------------------------------------");
          res.status(200).json(docs);
          res.end();
          db.close();
        });
      }
    });
  });



  /**
   *
   *
   *
   *
   **/
  app.get('/event/v1', function(req, res) {
    console.log("hit: /event/v1");
    var _id = req.query._id;
    var end_date = req.query.end_date;
    var start_date = req.query.start_date;
    var location = req.query.location;
    var name = req.query.name;

    // console.log("         _id: " + _id);
    // console.log("    end_date: " + end_date);
    // console.log("  start_date: " + start_date);
    // console.log("        name: " + start_date);
    // console.log("    location: " + location + "\n");



    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) {
        console.warn(err);
        res.status(503).send(createJsonError(503, '', "There was an error connecting to the database"));
        res.end();
        db.close();
      } else {

        // build query object
        var queryObject = {};
        if (!!_id) queryObject._id = _id;
        if (!!end_date) queryObject.end_date = end_date;
        if (!!start_date) queryObject.start_date = start_date;
        if (!!location) queryObject.location = location;
        if (!!name) queryObject.name = name;
        // console.log(inspect(queryObject, {
        //   depth: Infinity,
        //   color: true
        // }));


        // get the event documents
        var collection = db.collection('event');
        // Find some documents
        collection.find(queryObject).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs);

          // console.log("----------------------------------------------------------");
          res.status(200).json(docs);
          res.end();
          db.close();
        });
      }
    });
  });

  // {
  //   "_id": "Name of the Event 2017",
  //   "details": "Details of the Event",
  //   "end_date": "EndDate",
  //   "start_date": "start_date",
  //   "location": "location",
  //   "name": "Name of the Event",
  //   "recruiter": [{
  //     "email": "The Recruiters Email"
  //   }]
  // }

  /**
   * Good Response == 200
   * There was a problem with the database == 503
   * Bad Response == 400
   **/
  app.put('/event/v1', function(req, res) {
    var newEvent = req.body;
    // check if there is an email (_id) already registered in the database
    var _id = newEvent._id;

    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) {
        console.warn(err);
        res.status(503).json(createJsonError(503, '', "There was an error connecting to the database"));
        db.close();
      } else {
        var collection = db.collection('event');
        var queryObject = {};
        if (!!_id) queryObject._id = _id;

        collection.find(queryObject).toArray(function(err, docs) {
          if (docs.length !== 0) {
            docs[0].recruiter.push(newEvent.recruiter); // There is something wrong here
            newEvent.recruiter = docs[0].recruiter;
          } else {
            var recruiterArray = [];
            recruiterArray.push(newEvent.recruiter);
            newEvent.recruiter = recruiterArray;
          }
          // Add the modified JSON object to the array
          collection.save(newEvent, function(err, objects) {
            if (err) {
              console.warn(err.message);
              res.status(503).json(createJsonError(503, '', "There was an error inserting the document into the database"));
            } else {
              // console.log("The documents with the _id: " + _id + " was added to the database");
              res.status(200).send(createJsonSuccess(200, "The documents with the _id: " + _id + " was added to the database"));
            }
            res.end();
            db.close();
          });
        });
      }
    });
  });

  app.get('/event/v1/recruiters', function(req, res) {
    var _id = req.query._id;
    var end_date = req.query.end_date;
    var start_date = req.query.start_date;
    var location = req.query.location;

    // console.log("         _id: " + _id);
    // console.log("    end_date: " + end_date);
    // console.log("  start_date: " + start_date);
    // console.log("    location: " + location + "\n");

    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) {
        console.warn(err);
        res.status(503).send(createJsonError(503, 'mongodb_connection', "There was an error connecting to the database"));
      } else {

        // build query object
        var queryObject = {};
        if (!!_id) {
          queryObject._id = _id;

          // get the event documents
          var collection = db.collection('event');
          // Find some documents
          collection.find(queryObject).toArray(function(err, docs) {
            assert.equal(err, null);
            // console.log("Found the following records");
            // console.log(require('util').inspect(docs[0].recruiter, {
            //   depth: null
            // }));
            // console.log("----------------------------------------------------------");
            res.status(200).json(docs[0].recruiter);
            res.end();
            db.close();
          });
        } else {
          res.status(400).json(createJsonError(400, '_id', "You didn't provied the requierd field '_id'!"));
          res.end();
          db.close();
        }
      }
    });
  });
};
