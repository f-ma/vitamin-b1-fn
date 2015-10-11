"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 * X-Barcode application entry point
 */

global.__ENV = "development";

var React = require('react');
var XBarcodeApp = require('./components/XBarcodeApp.react');
var ProductAPI = require('./utils/ProductAPI');
var ProductStore = require('./stores/base/ProductStore');

var XBarcodeAppComponentsElement = <XBarcodeApp key="app" />;
var XbarCodeAppContainer = document.getElementById('xbarcodeapp');

//TODO ...

var XBarcodeAppComponentsInstance = React.render(XBarcodeAppComponentsElement, XbarCodeAppContainer);