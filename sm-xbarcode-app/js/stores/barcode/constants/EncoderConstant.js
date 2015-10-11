"use strict";

var keyMirror = require('keymirror');

module.exports = {
  ENCODERS: keyMirror({
    CODE128: null,
    CODE39: null,
    EAN13: null,
    UPC: null
  })
};