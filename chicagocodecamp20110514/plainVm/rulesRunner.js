var fs = require('fs'),
    rulesFile = fs.readFileSync(__dirname + '/discountRules.js', 'utf8'),
    vm = require('vm'),
    script = vm.createScript(rulesFile, 'discountRules.js');

var Context = function(customer, order) {
  var calculatedDiscount = 0;

  var discountOrder = function(discount) {
    if(discount > calculatedDiscount) {
      calculatedDiscount = discount;
    }
  };

  var discountRule = function(rule) {
    rule();
  };

  var getCalculatedDiscount = function() {
    return calculatedDiscount;
  };

  this.discountOrder = discountOrder;
  this.discountRule = discountRule;
  this.getCalculatedDiscount = getCalculatedDiscount;
  this.orderAmount = order.amount;
  this.preferredCustomer = customer.isPreferred;
};

var calculateDiscount = function(customer, order, callback) {
  var discountContext = new Context(customer, order);
  script.runInNewContext(discountContext);
  callback(discountContext.getCalculatedDiscount());
};


exports.calculateDiscount = calculateDiscount;
