"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PrintingSectionConstants = require('../constants/PrintingSectionConstant');
var BarcodeConstants = require('./../constants/BarcodeConstants');

var PrinterActions = {
  toggle: function() {
    AppDispatcher.dispatch({
      actionType: PrintingSectionConstants.TOGGLE
    });
  },

  show: function() {
    AppDispatcher.dispatch({
      actionType: PrintingSectionConstants.SHOW
    });
  },

  hide: function() {
    AppDispatcher.dispatch({
      actionType: PrintingSectionConstants.HIDE
    });
  },

  renderProductBarcode: function(item) {
    AppDispatcher.dispatch({
      actionType: BarcodeConstants.RENDER_PRODUCT_BARCODE,
      item: item
    });
  },

  renderBarcode: function(item) {
    AppDispatcher.dispatch({
      actionType: BarcodeConstants.RENDER_BARCODE,
      item: item
    });
  }
};

module.exports = PrinterActions;