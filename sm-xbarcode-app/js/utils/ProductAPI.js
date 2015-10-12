"use strict";

var DataAction = require('../actions/DataActions');

/**
 *
 * @type {object}
 * @private
 */
var _url = {
  products: '/index.php/admin/xBarcode_product',
  orders: 'OrderData.json'
};

module.exports = {
  getProductData: function() {
    var data = [];

    $.ajax({
      url: _url.products,
      dataType: 'json',
      type: 'GET',
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