var express = require('express')
  , app = module.exports = express()
  , formidable = require('formidable')

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

app.post('/trips', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
	  console.log(fields);
	  res.writeHead(200, {'content-type': 'text/plain'});
	  res.end('Message Received. Thanks!\r\n');
	})
})
