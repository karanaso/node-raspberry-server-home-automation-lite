var express = require('express')
    , fs = require('fs')
    , bodyParser       = require( 'body-parser' )
    , cookieParser     = require( 'cookie-parser' )
    , compression          = require('compression')    
    , diskDB = require('diskdb')
    , app = express()   
    ,server;

//server configuration
//Never change the deviceId, unless you are absolutely certain what you are doing
//changing the device ID, might brake the clientApp

var Configuration = {
    deviceId : 'com.sekdev.ha.v.0.0.1',
    serverPort : 8000    
};

//application components    
var Config = require('./Bundles/Config/Config')
    ,GPIO = require('./Bundles/GPIO/GPIO');

//initialize objects
var db = diskDB.connect( './');
var config = new Config(db);
    config.init();
var gpio = new GPIO( config );
    gpio.init();
    
//post/json  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression());

//CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-token');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
}); 
   
app.get('/',function(req,res,next) {
    res.json({
        deviceId : Configuration.deviceId,
        deviceFlags : ( ! config.configExists() )
    });
});

app.post('/config/save/:password?', function(req,res) {     
    var result = config.saveConfig( req.params.password, req.body );
    res.json( result );
});

app.get('/config/get/:devicePassword?', function(req,res) {     
    res.json( config.getConfig( req.params.devicePassword) );
});

app.get('/discover', function (req, res) {
    res.send( Configuration.deviceId );
});

app.get('/off/:id', function(req,res) {
    gpio.switchOff( parseInt(req.params.id), res );
});

app.get('/on/:id', function(req,res) {
    gpio.switchOn( parseInt( req.params.id ), res  );
});



server = app.listen(Configuration.serverPort, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

