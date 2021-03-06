"use strict";

var keyMirror = require('keymirror');
var assign = require('object-assign');

module.exports = assign({}, keyMirror({
  SETTING_GET: null,
  SETTING_UPDATE: null,
}), {
  HtmlId: {
    Input: {
      DEFAULT_SYMBOLOGY_SELECTOR: 'setting-default-symbology-selector',
      SEARCH_SYMBOLOGY_SELECTOR: 'setting-search-symbology-selector',
      PREVIEW_SYMBOLOGY_SELECTOR: 'setting-preview-symbology-selector'
    },
    Item: {
      DEFAULT_SYMBOLOGY: 'setting-default-symbology',
      SEARCH_SYMBOLOGY: 'setting-search-symbology',
      PREVIEW_SYMBOLOGY: 'setting-preview-symbology',
      PRODUCT_BARCODE_GENERATING_ATTRIBUTE: 'setting-product-barcode-generating-attribute'
    }
  },
  CodeName: {
    DEFAULT_GLOBAL_SYMBOLOGY: 'symbology_global_default',
    DEFAULT_SEARCH_SYMBOLOGY: 'symbology_search_default',
    DEFAULT_PREVIEW_SYMBOLOGY: 'symbology_preview_default',
    PRODUCT_BARCODE_GENERATING_ATTRIBUTE: 'product_barcode_generating_attribute',
    PRODUCT_BARCODE_TEMPLATE_TOP_LEFT: 'product_barcode_top_left',
    PRODUCT_BARCODE_TEMPLATE_TOP_MIDDLE: 'product_barcode_top_middle',
    PRODUCT_BARCODE_TEMPLATE_TOP_RIGHT: 'product_barcode_top_right',
    PRODUCT_BARCODE_TEMPLATE_BOTTOM_LEFT: 'product_barcode_bottom_left',
    PRODUCT_BARCODE_TEMPLATE_BOTTOM_MIDDLE: 'product_barcode_bottom_middle',
    PRODUCT_BARCODE_TEMPLATE_BOTTOM_RIGHT: 'product_barcode_bottom_right'
  }
});
