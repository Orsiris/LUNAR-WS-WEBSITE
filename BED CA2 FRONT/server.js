
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

const express=require('express');
const serveStatic=require('serve-static');

var hostname="localhost";
var port=3001;

var app=express();

app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if(req.method!="GET"){
        res.type('.html');
        var msg="<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));

// brings user to login.html when typing localhost:3001
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
  });

app.listen(port,hostname,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});