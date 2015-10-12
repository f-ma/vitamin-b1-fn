"use strict";

var DataAction = require('./../actions/DataActions');

/**
 *
 * @type {object}
 * @private
 */
var _url = {
  productsIndex: '/index.php/admin/xBarcode_product/index',
  productsFilter: '/index.php/admin/xBarcode_product/filter',
  orders: 'OrderData.json',
  settings: 'SettingData.json'
};

module.exports = {
  getSettingData: function() {
    var data = [];

    $.ajax({
      url: _url.settings,
      dataType: 'json',
      type: 'GET',
      success: function(response) {
        data = response;
        DataAction.getSettings(data);
      },
      error: function(xhr, status, err) {
        console.error(_url.settings, status, err.toString());
      }
    });
  },

  getProductData: function(filterType, string) {
    var data = [];

    $.ajax({
      url: _url.productsFilter,
      dataType: 'json',
      type: 'GET',
      data: {q: string},
      success: function(response) {
        data = response;
        DataAction.getProducts(data);
      },
      error: function(xhr, status, err) {
        console.error(_url.products, status, err.toString());
      }
    });
  },

  getOrderData: function() {
    var data = [];
    $.ajax({
      url: _url.orders,
      dataType: 'json',
      type: 'GET',
      success: function(response) {
        data = response;
        DataAction.getOrders(data);
      },
      error: function(xhr, status, err) {
        console.error(_url.orders, status, err.toString());
      }
    });
  }
};