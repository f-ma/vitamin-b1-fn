"use strict";

var keyMirror = require('keymirror');
var assign = require('object-assign');
var CODE39Constants = require('./../constants/CODE39Constants');

/**
 *
 * @type {string}
 * @private
 */
var _string = '';


/**
 * Get the encoded data of a character
 * @param character
 * @returns {*}
 * @private
 */
function _encodingByChar(character) {
  for(var i = 0; i< CODE39Constants.Mapping.CODE_39.length; i++){
    if(CODE39Constants.Mapping.CODE_39[i][1]==character){
      return CODE39Constants.Mapping.CODE_39[i][2];
    }
  }
  return "";
}

var CODE39 = assign({}, {
  /**
   *
   * @param string
   * @returns {CODE39}
   */
  prepare: function(string) {
    /** Ensure string actually is a string */
    _string = string + "";
    return this;
  },

  /**
   *
   * @returns {boolean}
   */
  valid: function() {
    return !(_string.search(CODE39Constants.Validation.VALID_STRING_PATTERN) == -1);
  },

  /**
   *
   * @returns {*}
   */
  encoded: function() {
    if (this.valid(_string)) {
      return this.encode(_string);
    } else {
      return "";
    }
  },

  /**
   *
   * @param string
   * @returns {string}
   */
  encode: function(string) {
    string = string.toUpperCase();

    var result = "";
    result += "1000101110111010";
    for(var i=0; i<string.length; i++){
      result += _encodingByChar(string[i]) + "0";
    }
    result += "1000101110111010";
    return result;
  }
});

module.exports = CODE39;