'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var QuoteDataHelper = require('../quote_data_helper.js');
chai.config.includeStack = true;

describe('QuoteDataHelper', function() {
  var subject = new QuoteDataHelper();

  describe('#getQuote', function() {
    context('withoutQuoteKey', function() {
      it('returns a non-empty quote', function() {
        var value = subject.getQuote().then(function(obj) {
          return obj.quoteText;
        });
        return expect(value).to.eventually.not.to.be.empty;
      });
    });
  });
});
