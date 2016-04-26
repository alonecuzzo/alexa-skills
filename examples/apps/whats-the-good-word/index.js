'use strict';

module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('goodword');
var QuoteDataHelper = require('./quote_data_helper.js');

app.launch(function(req, res) {
  var prompt = 'Ask me for a good word.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('goodword', {
  'slots': {},
  'utterances': ['{goodword}']
},
function(req, res) {
  var prompt = 'Ask me for a good word.';
  var helper = new QuoteDataHelper();
  helper.getQuote().then(function(quote) {
      res.say(quote.quoteText).send();
  });
  return false;
});

module.exports = app;
