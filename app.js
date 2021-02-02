"use strict";

//Declare constants and dependencies 
const endpoints = require('./endpoints');
const slacker = require('./slack');
const http = require('http');
const router = require('./router');
const Pinger = require('ping-monitor');
const monitors = [];
const port = process.env.SERVER_PORT || 3000;
const urls = [];

//main function
function monitorEndpoints() {
  // Iterate through endpoints and create a probe for each endpoint
  endpoints.forEach(function (website) {
    let monitor = new Pinger ({
      website: website.url,
      interval: website.interval
    });

    //if the endpoint is up, bring..  Yep . ep is up to console
    monitor.on('up', function (res,state) {
        console.log('Yep ' + res.website + ' is up. '  + res.statusMessage);
    });

    //if the endpoint is down, send a message to slack - indicating that ep is down
    monitor.on('down', function (res) {

         //sendSlack is module defined in the slack.js file
        slacker.sendSlack(
          res.website + ' is down <@israel> ',
       
        function (err, message) {
          if (err) {
            console.error(err.message);
          }
          else {
            console.log(res.website + ' is down. Slack message sent!' + res.statusMessage);
          }
        });

        console.log(res.website + ' is down. Slack message sent!' );
  
    });

    //if the endpoint is up but rendering an http error code, send message to slack
    monitor.on('error', function (res) {
        slacker.sendSlack(
          res.website + ' is throwing errors. <@israel>',
       
        function (err, message) {
          if (err) {
            console.error(err.message);
          }
          else {
            console.log(res.website + ' is throwing errors. ');
          }
        });
        console.log(res.website + ' is throwing errors. ');
    });

   
    monitor.on('stop', function (website) {
        console.log(website + ' monitor has stopped.');
    });

    urls.push(website.url);
    monitors.push(monitor);
  });
}


// call the main function 
monitorEndpoints();


// create web server - to list the endpoints that are being monitored. 

const server = http.createServer(router(urls));

server.listen(port);
console.log('Listening to port %s', port);
