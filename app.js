
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , session = require('express-session')
  , RedisStore = require('connect-redis')(session);
require('./app_api/models/db');
var UglifyJS = require('uglify-js');
var fs = require('fs');
var path = require("path");

var app = express();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app_server/views');
  app.set('view engine', 'jade');


  var appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/common/services/geolocation.service.js',
    'app_client/common/services/loc8rData.service.js',
    'app_client/common/filters/formatDistance.filter.js',
    'app_client/common/directive/ratingStars/ratingStars.directive.js',
    'app_client/common/directive/footerGeneric/footerGeneric.directive.js',
    'app_client/common/directive/navigation/navigation.directive.js',
    'app_client/common/directive/pageHeader/pageHeader.directive.js'
  ];
  var uglified = UglifyJS.minify(appClientFiles, { compress: false });
  fs.writeFile('public/angular/loc8r.min.js', uglified.code, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Script generated and saved: loc8r.min.js');
    }
  });

  //app.use(express.bodyParser());

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.methodOverride());
  app.use(express.cookieParser());
  //app.use(express.session({ secret: 'your secret here'}));
  app.use(express.session({
  store: new RedisStore(),
    secret: 'Your secret here',
    proxy: true,
    cookie: { secure: true }
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/app_client'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
//require('./routes')(app);
require('./app_api/routes')(app);

app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

/*
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
*/