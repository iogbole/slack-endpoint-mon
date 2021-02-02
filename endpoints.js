"use strict";

/*
 * List of endpoints to be monitored
 * url -  website to be monitored
 * interval - polling interval in minutes
**/
module.exports = [
    {
        url: 'http://www.wwdff.com',
        interval: 1,
        confing: {
            intervalUnits: 'seconds' // seconds, milliseconds, minutes {default}, hours
          },
          expect: {
            statusCode: 200
          }
    },
    {
        url: 'https://www.fastly.com',
        interval: 1
    },
    {
        url: 'https://www.npmjs.com',
        interval: 1
    },

    {
        url: 'http://example.com',
        interval: 1
    },
    {
        url: 'https://github.com',
        interval: 1,
        expect: {
            statusCode: 200
          }
    }
];

