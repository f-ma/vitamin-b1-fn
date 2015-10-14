"use strict";

/*
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 * Author: Huy Quang Pham
 *
 * XBarcodeConstants
 */

var keyMirror = require('keymirror');
var assign = require('object-assign');

module.exports = assign(
  keyMirror({
    RENDER_PRODUCT_BARCODE: null,
  }),
  {
    HtmlId: {
      DELIMITER: '-',
      PREFIX: {
        PRODUCT_BARCODE: {
          PREVIEW: 'container-product-preview-barcode-canvas',
          CANVAS: 'container-product-barcode-canvas',
          QUANTITY_INPUT: 'number-product-barcode-quantity',
          SYNBOLOGY_INPUT: 'string-product-barcode-symbology'
        },
        ORDER_BARCODE: {
          PREVIEW: 'container-order-preview-barcode-canvas',
          CANVAS: 'container-order-barcode-canvas'
        }
      },
      PRODUCT_BARCODE_CONTAINER: 'product-barcodes',
      RENDERING_STATUS_TITLE: 'progress-status-product-barcode-printing',
      RENDERING_STATUS_RENDERED_NUMBER: 'progress-rendered-number-status-product-barcode-printing',
      RENDERING_STATUS_BAR: 'progress-bar-product-barcode-printing',
      PRODUCT_LOCKED_AREA: 'product-locked-area',
      PRODUCT_LOADING_STATUS_BAR: 'progress-bar-product-loading',
      ORDER_LOADING_STATUS_BAR: 'progress-bar-order-loading'
    }
  }
);