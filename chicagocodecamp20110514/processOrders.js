var plain = './plainVm/rulesRunner',
    ometa = './ometa/rulesRunner',
    runner = require(ometa);

var logResult = function(discount) {
  console.log(discount);
};

runner.calculateDiscount({
  isPreferred: true
}, {
  amount: 8
}, logResult);

runner.calculateDiscount({
  isPreferred: true
}, {
  amount: 1
}, logResult);

runner.calculateDiscount({
  isPreferred: false
}, {
  amount: 1
}, logResult);
