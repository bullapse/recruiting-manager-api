var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
require('./listener')(app);

// run on http://localhost:8080
app.listen(8080);
module.export = app;
