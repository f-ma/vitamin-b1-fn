"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProductConstants = require('../constants/ProductConstants');
var OrderConstants = require('../constants/OrderConstants');
var SettingConstants = require('../constants/base/SettingConstants');

var DataActions = {
  Setting: {
    get: function(data) {
      AppDispatcher.dispatch({
        actionType: SettingConstants.SETTING_GET,
        data: data
      });
    },
    /**
     * @param: data {id: string, value: string}
     */
    update: function(data) {
      AppDispatcher.dispatch({
        actionType: SettingConstants.SETTING_UPDATE,
        data: data
      });
    }
  },
  getProducts: function(data) {
    AppDispatcher.dispatch({
      actionType: ProductConstants.PRODUCT_GET,
      data: data
    });
  },
  getOrders: function(data) {
    AppDispatcher.dispatch({
      actionType: OrderConstants.ORDER_GET,
      data: data
    });
  }
};

module.exports = DataActions;
