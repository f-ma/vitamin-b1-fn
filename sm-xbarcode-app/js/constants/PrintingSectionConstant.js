"use strict";

var keyMirror = require('keymirror');
var assign = require('object-assign');

module.exports =  assign(
  keyMirror({
    TOGGLE: null,
    SHOW: null,
    HIDE: null,
    ADD_PRODUCT_BARCODE: null,
    RENDER: null,
    COMPLETE_RENDERING: null
  }),
  {
    RENDERING_HEADER_TITLE: 'RENDERING...',
    RENDERING_DONE_HEADER_TITLE: 'DONE'
  }
);