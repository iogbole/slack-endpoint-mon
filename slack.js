"use strict";

require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_TOKEN
const channelId = process.env.CHANNEL_ID
const web = new WebClient(token);

module.exports.sendSlack = function(msg, fn) {
(async () => {
try {
  //console.log("token= "+ token);
  //console.log("channel ="+ channelId);
  // Call the chat.postMessage method using the WebClient
  const result = await web.chat.postMessage({
    channel: channelId,
    text: msg,
    link_names: true
  });

  console.log(result);
}
catch (error) {
  console.error(error);
}
})();
};

