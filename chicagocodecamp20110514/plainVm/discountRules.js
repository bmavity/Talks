discountRule(function() {
  if(preferredCustomer)
    discountOrder(.05);
});

discountRule(function() {
  if(preferredCustomer && orderAmount > 5.00)
    discountOrder(.25);
});
