var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set("port", (process.env.PORT || 7000));

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

app.listen(app.get("port"), function() {
  console.log('Now listening on port: ', app.get("port"));
});
