var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

app.post('/trips', function(request, response) {
	console.log(request);
	var parsedBody = JSON.parse(request);

	console.log(parsedBody.from);
	console.log(parsedBody.headers['Subject']);
	console.log(parsedBody.plain);
	console.log(parsedBody.html);
	console.log(parsedBody.reply_plain);

	response.send('Message Received. Thanks!');
})
