"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ProductConstants = require('./../../constants/ProductConstants');

/**
 *
 * @type {string}
 */
var CHANGE_EVENT = 'change';

/**
 *
 * @type {Array}
 * @private
 */
var _lockedProducts = [];

/**
 *
 * @param product
 * @return {boolean}
 * @private
 */
function _addProduct(product) {
  if (_lockedProducts.indexOf(product) > -1) {
    return false;
  }

  console.log('Adding...');
  _lockedProducts.push(product);
  return true;
}

/**
 *
 * @param product
 * @return {boolean}
 * @private
 */
function _removeProduct(product) {
  var lockedProductIndex = _lockedProducts.indexOf(product);
  console.log(lockedProductIndex);
  if (lockedProductIndex > -1) {
    console.log('Removing...');
    _lockedProducts.splice(lockedProductIndex, 1);
    return true;
  }
  return false;
}

var ProductLockedAreaStore = assign({}, EventEmitter.prototype, {
  /**
   *
   * @return {Array}
   */
  getLockedProducts: function() {
    return _lockedProducts;
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

ProductLockedAreaStore.dispatchToken = AppDispatcher.register(function (payloads) {
  switch (payloads.actionType) {
    case ProductConstants.LOCK:
      if (_addProduct(payloads.item)) {
        ProductLockedAreaStore.emitChange();
      }
      break;
    case ProductConstants.UNLOCK:
      if (_removeProduct(payloads.item)) {
        ProductLockedAreaStore.emitChange();
      }
      break;
  }
});

module.exports = ProductLockedAreaStore;