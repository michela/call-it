
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

// CMS

var campaign_url = "http://is.gd/callit";

// Routes

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
app.get('/auto2', function(req, res){
  res.render('auto', {
    title: 'Update your networks',
	layout: 'frameset-networks',
  });
});
app.get('/auto3', function(req, res){
  res.render('auto', {
    title: 'Jam the petition',
	layout: 'frameset-petition'
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
	locals: {
		campaign_url : campaign_url
	}
  });
});
app.get('/step3', function(req, res){
  res.render('step3', {
    title: 'Jam the petition',
  });
});
app.get('/step4', function(req, res){
  res.render('step4', {
    title: 'Thanks',
  });
});
app.get('/networks', function(req, res,next){
	path = "views/networks.html";
	res.sendfile(path, function(err){
	  if (err) {
	    next(err);
	  } else {
	    console.log('transferred %s', path);
	  }
	});
});


app.get('/twitter', function(req, res){
  res.render('twitter', {
    title: 'Twitter',
  });
});
app.get('/plus', function(req, res){
  res.render('plus', {
    title: 'Google Plus',
  });
});
app.get('/facebook', function(req, res){
  res.render('facebook', {
    title: 'Facebook',
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
