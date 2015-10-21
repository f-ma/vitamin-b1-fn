"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 * X-Barcode application entry point
 */

global.__ENV = "development";
global.__URLs = {
  productIndex: '/index.php/admin/xBarcode_product/index',
  productFilter: '/index.php/admin/xBarcode_product/filter',
  orderIndex: '/index.php/admin/xBarcode_order/index',
  settingIndex: '/index.php/admin/xBarcode_setting/index'
};

console.log(__URLs);

var React = require('react');
var XBarcodeApp = require('./components/XBarcodeApp.react');
var Data = require('./utils/Data');

var XBarcodeAppComponentsElement = <XBarcodeApp key="app" />;
var XbarCodeAppContainer = document.getElementById('xbarcodeapp');

//TODO ...
var XBarcodeAppComponentsInstance = null;

(function(window, undefined) {
  Data.getSettingData(function() {
    XbarCodeAppContainer.innerHTML = 'Loading initial states...';
    XbarCodeAppContainer.style.margin = '15px 0 0 15px';
    setTimeout(function() {
      XbarCodeAppContainer.style.margin = '0';
      XBarcodeAppComponentsInstance = React.render(XBarcodeAppComponentsElement, XbarCodeAppContainer);
    }, 2000);
  });
})(window, undefined);
