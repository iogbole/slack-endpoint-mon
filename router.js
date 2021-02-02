"use strict";


const url = require('url');


function index (req, res, urls) {
  let data = "Monitoring the following endpoints: \n \n" + urls.join("\n");

  res.end(data);
}



module.exports = function (urls) {

  return function (req, res) {
    let path = url.parse(req.url).pathname, filename;

    switch (path) {
      case '/':
        index(req, res, urls);
      break;

      default:
        res.writeHead(401);
        res.end();
    }
  };
};
