'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://api.forismatic.com/api/1.0/';
var SLACKWEBHOOK = 'https://hooks.slack.com/services/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';

var Slack = require('node-slack');

function QuoteDataHelper() {}

QuoteDataHelper.prototype.getQuote = function(quote) {
  return this.getRandomQuote().then(function(response) {
    console.log('success - received quote: ' + response.body.quoteText)
    //send to slack
    var slack = new Slack(SLACKWEBHOOK);

    //maybe refactor out and send with a slack helper
    slack.send({
      text: '```"' + response.body.quoteText + '" - ' + response.body.quoteAuthor + '```',
      channel: '#bot-staging',
      username: 'The Owl Bot'
    });

    return response.body;
  });
}

QuoteDataHelper.prototype.getRandomQuote = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    json: true,
    resolveWithFullResponse: true,
    qs: {
      method: 'getQuote',
      lang: 'en',
      format: 'json'
    }
  };
  return rp(options);
}

module.exports = QuoteDataHelper;
