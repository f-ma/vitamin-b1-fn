"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PrintingSectionConstants = require('../../constants/PrintingSectionConstant');
var assign = require('object-assign');
var BarcodeConstants = require('./../../constants/BarcodeConstants');

/**
 *
 * @type {string}
 */
var CHANGE_EVENT = 'change';

var PUSH_EVENT = 'push';

/**
 *
 * @type {boolean}
 * @private
 */
var _isActivated = false;

/**
 *
 * @type {Array}
 * @private
 */
var _productBarcodeContainer = [];

/**
 *
 * @type {null}
 * @private
 */
var _currentAddedProductBarcode = null;

function _toggle() {
  _isActivated = !_isActivated;
}

function _show() {
  _isActivated = true;
}

function _hide() {
  _isActivated = false;
}

/**
 *
 * @param item
 * @private
 */
function _addProductBarcodeItem(item) {
  _productBarcodeContainer.push(item);
}

var PrintingSectionStore = assign({}, EventEmitter.prototype, {
  getIsActivated: function() {
    return _isActivated;
  },

  getProductBarcodes: function() {
    return _productBarcodeContainer;
  },

  getCurrentAddedProductBarcode: function() {
    return _currentAddedProductBarcode;
  },

  addProductBarcodeItem: function(item) {
    _productBarcodeContainer.push(item);
    _currentAddedProductBarcode = item;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  emitPush: function() {
    this.emit(PUSH_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  addPushListener: function(callback) {
    this.on(PUSH_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  removePushListener: function(callback) {
    this.removeListener(PUSH_EVENT, callback);
  }
});

PrintingSectionStore.dispatchToken = AppDispatcher.register(function (payloads) {
  switch (payloads.actionType) {
    case PrintingSectionConstants.TOGGLE:
      _toggle();
      PrintingSectionStore.emitChange();
      break;
    case PrintingSectionConstants.SHOW:
      _show();
      PrintingSectionStore.emitChange();
      break;
    case PrintingSectionConstants.HIDE:
      _hide();
      PrintingSectionStore.emitChange();
      break;
  }
});

module.exports = PrintingSectionStore;