"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 * X-Barcode application entry point
 */

global.__ENV = "development";
global.__URLs = {
  Setting: {
    get: '/index.php/admin/xBarcode_setting/index',
    update: '/index.php/admin/xBarcode_setting/update'
  },
  productIndex: '/index.php/admin/xBarcode_product/index',
  productFilter: '/index.php/admin/xBarcode_product/filter',
  orderIndex: '/index.php/admin/xBarcode_order/index',
  settingIndex: '/index.php/admin/xBarcode_setting/index'
};

var Data = require('./utils/Data');
var XbarCodeAppContainer = document.getElementById('xbarcodeapp');
var SettingStore = require('./stores/base/SettingStore');

//TODO ...

(function(window, undefined) {
  Data.Setting.get(function() {
    XbarCodeAppContainer.innerHTML = 'Loading initial states...';
    XbarCodeAppContainer.style.margin = '15px 0 0 15px';
    setTimeout(function() {
      XbarCodeAppContainer.style.margin = '0';

      var React = require('react');
      var XBarcodeApp = require('./components/XBarcodeApp.react');
      var XBarcodeAppComponentsElement = <XBarcodeApp key="app" />;
      var XBarcodeAppComponentsInstance = React.render(XBarcodeAppComponentsElement, XbarCodeAppContainer);
    }, 2000);
  });
})(window, undefined);
