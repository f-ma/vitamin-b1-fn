"use strict";

var keyMirror = require('keymirror');
var assign = require('object-assign');

module.exports = assign({}, keyMirror({
  SETTING_GET: null
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
      PREVIEW_SYMBOLOGY: 'setting-preview-symbology'
    }
  }
});