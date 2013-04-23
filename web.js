var app, 
  express, jade, stylus, nib,
  port, walk;
express = require('express');
stylus = require('stylus');
nib = require('nib');
app = express();
walk = require('walk');

function compile(str, path) {
  return stylus(str).set("filename", path).use(nib());
};

function getPublicJavascripts(callback) {
  var files   = [];
  var walker  = walk.walk('./public', { followLinks: false });

  walker.on('file', function(root, stat, next) {
    if(stat.name.indexOf('.js') !== -1) {
      files.push(root.replace("./public/", "") + '/' + stat.name);
    }
    next();
  });

  walker.on('end', function() {
    callback(files);
  });
}

app.set("view engine", "jade");

app.use(express.logger('dev'))

app.use(stylus.middleware({
  debug: true, 
  src: __dirname + '/public',
  compile: compile
}));

app.use(express.static(__dirname + '/public', { maxAge: 31557600000 }));

app.get('/', function(request, response) {
  getPublicJavascripts(function(scripts) {
    response.render("index", {scripts: scripts})
  });
});

port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
