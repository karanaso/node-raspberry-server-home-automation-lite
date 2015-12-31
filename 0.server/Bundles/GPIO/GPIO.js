var gpio = require('rpi-gpio');

var GPIO = function (Config) {
    this.Config = Config;
    this.config = {};
    this.gpio = gpio;
    this.availableOutputs = [];
    
    this._response = function( type, description) {
        return { type : type, description : description };
    }
    
    this.init = function (  ) {
        this.config =  this.Config._getConfig();
        console.log('initializing gpio');
        if (Object.keys( this.config ).length > 0) {
            
            var availableOutputs = Object.keys( this.config.config.GPIO ).map( function( GPIO ) {
                 var id = parseInt( GPIO.substr(5) );
                 return id;
            });
            this.availableOutputs = availableOutputs;  
            var self=this;
            this.availableOutputs.forEach( function( GPIO ) {
                self.gpio.setup( GPIO, gpio.DIR_OUT);
            });
        }        
    };

    this.switchOn = function (pinId, res) {
        if (this.availableOutputs.indexOf(pinId) > -1) {
            var self=this;
            this.gpio.write(pinId, true, function (err) {
                if (err) {
                    res.send(self._response('error', err));
                } else {
                    res.send(self._response('success', 'Pin ' + pinId + ' is now on'));
                }

            });
        } else {
            res.send(this._response('error', 'invalid GPIO pinId ' + pinId));
        }

    }

    this.switchOff = function (pinId, res) {
        if (this.availableOutputs.indexOf(pinId) > -1) {
            var self=this;
            this.gpio.write(pinId, false, function (err) {
                if (err) {
                    res.send(self._response('error', err));
                } else {
                    res.send(self._response('success', 'Pin ' + pinId + ' is now off'));
                }
            });
        } else {
            res.send(this._response('error', 'invalid GPIO pingId ' + pinId));
        }
    }

    return this;
}

module.exports = GPIO;