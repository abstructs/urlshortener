var express = require('express');
var app = express();
var validUrl = require('valid-url');

var url = {
  "1234": "https://www.google.com/"
};

app.get('/:url', function(req, res){
  if (url[req.params.url]) {
    res.redirect(url[req.params.url]);
  }
  else {
    res.send("Sorry that url is not in the database.");
  }
  res.end();
});

app.get(/^\/new\/(\w+)(.*?)/, function(req, res) {
  var unique = false;
  var reqUrl = req.path.substr(5);
  if (validUrl.isUri(reqUrl)) {
    var randomDigits = randomDigits = Math.floor(100000 + Math.random() * 900000);
    randomDigits = randomDigits.toString().substring(0, 4);
    randomDigits = "1234";
    while (unique == false) {
      if (url[randomDigits]) {
        randomDigits = Math.floor(100000 + Math.random() * 900000);
        randomDigits = randomDigits.toString().substring(0, 4);
      }
      else {
        unique = true
      }
    }
    var returnObj = {
      "original_url": reqUrl,
      "short_url": req.get('host') + "/" + randomDigits
    };
    url[randomDigits] = reqUrl;
    res.send(JSON.stringify(returnObj));
  }
  else {
    res.send('Not a valid URL');
  }
  res.end();
});
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.end();
});

app.listen(3000, function() {console.log('Server is running on port 3000...')});
