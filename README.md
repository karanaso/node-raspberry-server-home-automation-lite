# node-raspberry-home-automation-lite
This is a very small experimental node/raspberry home automation server.

1. npm install
2. node index.js

It listens on port 8000 that can be changed within the index.js file.

Once the server starts you *MUST* post your configuration file manually since no UI is present at this time.

*Example Configuration*
-----------------------
Within the GPIO Object only write the GPIO_{pin} that you will be using. It will be used by the server to *ONLY* switch on/off only the specified ones.

var config = {
    password : '12345',
    GPIO : { 
             GPIO_3 :  {
                            name : 'My bathroom',
                            enabled : true
                       },
            GPIO_5 :  {
                            name : 'My Livingroom',
                            enabled : true
                       },
             GPIO_7 :  {
                            name : 'Tents',
                            enabled : true
                       },
    }

};

$.post('http://your-ip:your-port/config/save', {config:config}, function(response) {
    console.log(response)
})
