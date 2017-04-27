let express = require('express');
let cors = require('cors');
let moment = require('moment');

let initiate = require('./initiate');

let app = express();

// use cors to allow for cross origin requests
app.use(cors());

// this is to logout to the server console the request received and a date/time stamp, for logging and debugging purposes
app.use(function(req, res, next) {
  console.log('request recieved for: ' + req.url + ' ' + moment().format());
  next();
});

// this instantiates the exchanges and altcoins objects and creates the interval that fetches rates from the exchanges every 10 seconds
initiate();

// routes to listen for, and code to execute when they are called
require('./routes')(app);

// if file not found, send 404
app.use(function(req, res, next) {
	res.status(404);
	res.send('404 file not found');
});

app.listen(8090, function () {
  console.log('RateRetriever listening on port 8090!');
});
