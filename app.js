var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());
require('./listener')(app);

// run on http://localhost:8080
app.listen(8080);
module.export = app;
