var express = require('express')
  , app = module.exports = express()
  , pg = require('pg');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

app.get("/", function(request, response) {
	response.send("200 OK")
})

app.post('/trips', function(req, res) {
	parsedBody = JSON.parse(request.body)
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end(request.body);
	})
})

app.get('/db', function(request, response) {
  pg.connect(process.env.DATABASE_URL || "postgres://127.0.0.1:5432/ledwards", function(err, client, done) {
  	if (err) {
	  	console.log(err)	
  	}
  	client.query('SELECT * FROM messages', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
})