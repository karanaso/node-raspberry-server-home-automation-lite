var diskDB = require('diskdb');
var db = diskDB.connect( './');

var Config = function(db) {
    this.config = {};
    this.db = db;
    this.db.loadCollections( ['Config'] );
       
    
    this._getConfig = function( ) {
        //if not in memory fetch from disk
        if (Object.keys(this.config).length <= 0) {
            var results = this.db.Config.find({deviceId:'1'});
            if (results.length > 0) {
                this.config = results[0];
            }
        }        
        return this.config;
    };
    
    this.configExists = function() {
        return (Object.keys(this.config).length > 0);
    };
    
    this.isAuthenticated = function(password) {
        return ( ( this.configExists() ) && ( this.config.config.password === password) );
    };

    this.saveConfig = function( password, config ) {
        var writeConfig = false;
        writeConfig = ( (!this.configExists()) || (this.isAuthenticated( password )) );
        
        if (writeConfig) { 
            config.deviceId = '1';            
            //try to find config
            var result = this.db.Config.update( {'deviceId':'1'}, config, {upsert:true} );
            console.log(config);
            this.config = config;
            console.log(this.config);
            return {
                type : 'success',
                description : 'write-config'
            };
        } else {
            return {
                type : 'error',
                description : 'no-auth'
            };
        }
       
    }; 
    
    this.getConfig = function( password ) {
        
        if (this.isAuthenticated( password ) ) {
            return this.config;
        } else {
            return { type : 'error', description : 'not authenticated' };
        }
    };
    
    
    this.init = function() {
        this._getConfig();
    };
    
    return this;
};

module.exports = Config;