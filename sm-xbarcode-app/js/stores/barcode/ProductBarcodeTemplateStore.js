"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ProductBarcodeTemplateStore = assign({}, EventEmitter.prototype, {

});

ProductBarcodeTemplateStore.dispatchToken = AppDispatcher.register(function(payloads) {
  switch(payloads.actionType) {

  }
});

module.exports = ProductBarcodeTemplateStore;