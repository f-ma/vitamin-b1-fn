"use strict";

var DataAction = require('./../actions/DataActions');
var BarcodeConstants = require('./../constants/BarcodeConstants');

/**
 *
 * @type {object}
 * @private
 */
var _url = {
  productsIndex: '/index.php/admin/xBarcode_product/index',
  productsFilter: '/index.php/admin/xBarcode_product/filter',
  ordersIndex: '/index.php/admin/xBarcode_order/index',
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

    var xhr = $.ajax({
      url: _url.productsFilter,
      dataType: 'json',
      type: 'GET',
      data: {q: string},
      beforeSend: function() {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.PRODUCT_LOADING_STATUS_BAR).css('opacity', 1).css('width', '30%');
        }, 0);

      },
      success: function(response) {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.PRODUCT_LOADING_STATUS_BAR).css('opacity', 1).css('width', '100%');
        }, 0);
        data = response;
        DataAction.getProducts(data);
      },
      complete: function() {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.PRODUCT_LOADING_STATUS_BAR).css('opacity', 0).css('width', '0');
        }, 500);
      },
      error: function(xhr, status, err) {
        console.error(_url.products, status, err.toString());
      }
    });
  },

  getOrderData: function(string) {
    var data = [];
    $.ajax({
      url: _url.ordersIndex,
      dataType: 'json',
      type: 'GET',
      data: {id: string},
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