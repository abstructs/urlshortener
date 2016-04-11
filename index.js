var express = require('express');
var app = express();

var Router = require('name-routes');
var router = new Router();
router.extendExpress(app);
router.registerAppHelpers(app);

app.get('/', function(req, res) {
  res.redirect("https://www.google.com");
  res.end();
});

app.get('/new/:url', function(req, res) {

  var returnObj = {
    "original_url": req.originalUrl,
    "short_url": null
  };

  res.send(JSON.stringify(returnObj));

  res.end();
});
app.listen(3000, function() {console.log('Server is running on port 3000...')});
