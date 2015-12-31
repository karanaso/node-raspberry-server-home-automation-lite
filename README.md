# node-raspberry-home-automation-lite
This is a very small experimental node/raspberry home automation server.

1. npm install
2. node index.js

It listens on port 8000 that can be changed within the index.js file.

Once the server starts you *MUST* post your configuration file manually since no UI is present at this time.

*Example Configuration*
-----------------------
Within the GPIO Object only write the GPIO_{pin} that you will be using. It will be used by the server to *ONLY* switch on/off the specified ones and not any other ports.

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

*Usage*
------------------------------------------------------
discover your device => http://your-ip:your-port/discover
update your configuration => http://your-ip:your-port/config/save/{password}
get your configuration => http://your-ip:your-port/config/get/{password}

switch on => http://your-ip:your-port/on/pinId i.e 'http://192.168.1.111:8000/on/3
switch off => http://your-ip:your-port/of/pinId i.e 'http://192.168.1.111:8000/off/3

*Warning*
At this moment there is *ABSOLUTELY* no authentication for *switch on/off* commands. So USE IT WITH GREAT CARE