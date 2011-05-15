var fs = require('fs'),
    grammarFile = fs.readFileSync(__dirname + '/discountRulesGrammar.ometa', 'utf8'),
    rulesFile = fs.readFileSync(__dirname + '/discountRules.drule', 'utf8'),
    ometa = require('ometa'),
    calculator = (function() {
      var calls = [],
          that = {};

      var calculateDiscount = function(context, callback) {
        calls.push({
          context: context,
          callback: callback
        });
      };

      var replace = function(impl) {
        calculator = impl;
        calls.forEach(function(call) {
          impl.calculateDiscount(context, callback);
        });
      };

      that.calculateDiscount = calculateDiscount;
      that.replace = replace;
      return that;
    })();

var fixReadFile = function(rawFile) {
  return rawFile.slice(1).replace(/\\n/g, '\n');
};

ometa.createParser(fixReadFile(grammarFile), function(err, parser) {
  if(err) {
    console.log(err.inner.stack || err.inner);
  } else {
    parser.parse(rulesFile, 'ruleFile', function(err2, result) {
      calculator.replace(result);
    });
  }
});

var Context = function(customer, order) {
  this.orderAmount = order.amount;
  this.preferredCustomer = customer.isPreferred;
};

var calculateDiscount = function(customer, order, callback) {
  calculator.calculateDiscount(new Context(customer, order), callback);
};


exports.calculateDiscount = calculateDiscount;
