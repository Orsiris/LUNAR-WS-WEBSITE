
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var express = require('express');
var serveStatic = require('serve-static');
var app = require('./controller/app.js');

var port = 8081;

app.use(serveStatic(__dirname + '/public/')); 

var server = app.listen(port, function(){
    console.log('Web App Hosted at http://localhost:%s', port);
});