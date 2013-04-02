var app, 
  express, jade, stylus, nib,
  port;
express = require('express');
stylus = require('stylus');
nib = require('nib');

app = express();

function compile(str, path) {
  return stylus(str).set("filename", path).use(nib());
};

app.set("view engine", "jade");

app.use(express.logger('dev'))

app.use(stylus.middleware({
  debug: true, 
  src: __dirname + '/public',
  compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render("index");
});

port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
