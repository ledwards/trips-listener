var express = require('express');
var app = module.exports = express();
var formidable = require('formidable');
var mongojs = require("mongojs");
var mongouri = process.env.MONGOHQ_URL || "mongodb://ledwards@localhost:27017/test";
var db = mongojs.connect(mongouri, ["emails"]);

var parser = require('./parser.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

app.get("/heartbeat", function(request, response) {
	response.send("200 OK")
})

app.post('/emails', function(request, response) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    var from = fields['envelope[from]'];
    var html = fields['html'];
    db.emails.insert({ "email" : from, "html" : html });
    response.writeHead(200, {'content-type': 'text/plain'});
    response.end('Message Received. Thanks!\r\n');
  })
})

app.get('/emails', function(request, response) {
	response.writeHead(200, {"Content-Type": "text/json"});

	db.emails.find({}, function(err, records) {
		if(err) {
    	console.log("There was an error executing the database query.");
    	response.end();
    	return;
		}
		response.write(JSON.stringify(records));
		response.end();
	})
})