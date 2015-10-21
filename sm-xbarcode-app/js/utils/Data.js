"use strict";

var DataAction = require('./../actions/DataActions');
var BarcodeConstants = require('./../constants/BarcodeConstants');

/**
 *
 * @type {object}
 * @private
 */
var _url = __URLs;

module.exports = {
  getSettingData: function(callback) {
    console.log('Fetching setting data...');
    var data = [];

    $.ajax({
      url: _url.settingIndex,
      dataType: 'json',
      type: 'GET',
      success: function(response) {
        data = response;
        DataAction.getSettings(data);
      },
      complete: function() {
        console.log('Fetching setting data completed!');
        if (typeof callback === 'function') {
          callback();
        }
      },
      error: function(xhr, status, err) {
        console.error(_url.settings, status, err.toString());
      }
    });
  },

  getProductData: function(filterType, string) {
    var data = [];

    var xhr = $.ajax({
      url: _url.productFilter,
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
      url: _url.orderIndex,
      dataType: 'json',
      type: 'GET',
      data: {id: string},
      beforeSend: function() {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.ORDER_LOADING_STATUS_BAR).css('opacity', 1).css('width', '30%');
        }, 0);
      },
      success: function(response) {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.ORDER_LOADING_STATUS_BAR).css('opacity', 1).css('width', '100%');
        }, 0);
        data = response;
        DataAction.getOrders(data);
      },
      complete: function() {
        setTimeout(function() {
          $('#' + BarcodeConstants.HtmlId.ORDER_LOADING_STATUS_BAR).css('opacity', 0).css('width', '0');
        }, 500);
      },
      error: function(xhr, status, err) {
        console.error(_url.orders, status, err.toString());
      }
    });
  }
};
