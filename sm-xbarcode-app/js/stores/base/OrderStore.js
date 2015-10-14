var AppDispatcher = require("../../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var OrderConstants = require('../../constants/OrderConstants');
var BarcodeConstants = require('./../../constants/BarcodeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _data = [];

function _setData(data) {
  _data = data;
}

var OrderStore = assign({}, EventEmitter.prototype, {
  /**
   *
   * @returns {Array}
   */
  getOrderData: function() {
    return _data;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

OrderStore.dispatchToken = AppDispatcher.register(function(payloads) {
  switch(payloads.actionType) {
    case OrderConstants.ORDER_GET:
      _setData(payloads.data);
      OrderStore.emitChange();
      break;
  }
});

module.exports = OrderStore;