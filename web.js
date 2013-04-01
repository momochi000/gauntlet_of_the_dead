var app, 
  express, jade, 
  port;
express = require('express');

app = express();

app.set("view engine", "jade");

app.get('/', function(request, response) {
  response.render("index");
});

//app.get('/index', function(request, response) {
//  response.render('index', function (err, html){
//    console.log("DEBUG: in the index render call");
//    console.log(err);
//    console.log(html);
//  });
//});

port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
