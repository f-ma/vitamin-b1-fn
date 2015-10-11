var AppDispatcher = require("../../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var ProductConstants = require('../../constants/ProductConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _data = [];

function _setData(data) {
  _data = data;
}

var ProductStore = assign({}, EventEmitter.prototype, {
  /**
   *
   * @returns {Array}
   */
  getProductData: function() {
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

ProductStore.dispatchToken = AppDispatcher.register(function(payloads) {
  switch(payloads.actionType) {
    case ProductConstants.PRODUCT_GET:
      _setData(payloads.data);
      ProductStore.emitChange();
      break;
  }
});

module.exports = ProductStore;