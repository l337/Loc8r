
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , session = require('express-session')
  , RedisStore = require('connect-redis')(session);
require('./app_server/models/db');

var app = express();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app_server/views');
  app.set('view engine', 'jade');

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
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

require('./routes')(app);

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);

/*
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
*/