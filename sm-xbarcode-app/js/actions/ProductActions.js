"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProductConstants = require('./../constants/ProductConstants');

var ProductActions = {
  lock: function(product) {
    AppDispatcher.dispatch({
      actionType: ProductConstants.LOCK,
      item: product
    });
  },

  unlock: function(product) {
    AppDispatcher.dispatch({
      actionType: ProductConstants.UNLOCK,
      item: product
    });
  }
};

module.exports = ProductActions;