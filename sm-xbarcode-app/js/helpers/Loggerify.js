"use strict";

var Loggerify = function() {

};

Loggerify.prototype = {
  logStoreEmitting: function(storeName, eventName) {
    console.log('%c' + storeName + '%c->emit->%c[' + eventName + ']', 'font-weight:bold; color:blue', 'font-weight:bold;color:brown', 'color:grey');
  },
  logStoreRegistering: function(storeName) {
    console.log(storeName + ' registered.');
  },
  logActionCreating: function(actionName, actionTypeName) {
    console.log('%c' + actionName + '->%c[' + actionTypeName + ']', 'font-weight:bold; color:green', 'color: green');
  },
  logViewInteracting: function(viewName, eventName) {
    console.log('%c' + viewName + '->%c[' + eventName+ ']', 'font-weight:bold; color:red', 'color: orange');
  }
};

module.exports = new Loggerify();