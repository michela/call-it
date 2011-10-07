
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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

app.dynamicHelpers({
  scripts: function(req, res){
    return ['jquery.js']; //this will be available in all views
  }
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Call it',
  });
});
app.get('/callbullshit', function(req, res){
  res.render('callbullshit', {
    title: 'Call Bullshit'
  });
});
app.get('/auto', function(req, res){
  res.render('auto', {
    title: 'Call Bullshit Now',
	layout: 'frameset'
  });
});
app.get('/step1', function(req, res){
  res.render('step1', {
    title: 'Contact your MP',
  });
});
app.get('/step2', function(req, res){
  res.render('step2', {
    title: 'Update your Networks',
	layout: 'frameset-networks'
  });
});
app.get('/step3', function(req, res){
  res.render('step3', {
    title: 'Jam the petition'
  });
});
app.get('/step4', function(req, res){
  res.render('step4', {
    title: 'Thanks'
  });
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
