var pug = require('pug');
var express = require('express');
var app = express();
var fs = require('fs');
storage = require('node-persist');
storage.initSync();
app.use(express.static(__dirname + '/public'));
var myParser = require("body-parser");
app.use(myParser.urlencoded({extended : true}));
app.set('view engine', 'pug');

// Get client IP address from request object ----------------------
getClientAddress = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
};

app.get('/', function(req, res){
  var scenes = JSON.parse(fs.readFileSync('data/scenes.json'));
  var loadData = storage.getItemSync(getClientAddress(req));
  var startScene = loadData || 1;
  console.log("Loading scene: " + startScene);
  scenes.config.startScene = startScene;
  res.render('index', { scenes: scenes })
});

app.post('/save', function(req, res){
  storage.setItemSync(getClientAddress(req), req.body.scene);
});
var portbind = process.env.PORT || 3000;
app.listen(portbind, function () {
    console.log('listening on port', portbind);
});
