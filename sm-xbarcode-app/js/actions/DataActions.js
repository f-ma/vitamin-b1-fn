"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProductConstants = require('../constants/ProductConstants');
var SettingConstants = require('../constants/base/SettingConstants');

var DataActions = {
  getProducts: function(data) {
    AppDispatcher.dispatch({
      actionType: ProductConstants.PRODUCT_GET,
      data: data
    });
  },
  getSettings: function(data) {
    AppDispatcher.dispatch({
      actionType: SettingConstants.SETTING_GET,
      data: data
    });
  }
};

module.exports = DataActions;