var pug = require('pug');
var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', function(req, res){
  var scenes = JSON.parse(fs.readFileSync('data/scenes.json'));
  res.render('index', { scenes: scenes })
});
var portbind = process.env.PORT || 3000;
app.listen(portbind, function () {
    console.log('listening on port', portbind);
});
