"use strict";

var keyMirror = require('keymirror');
var assign = require('object-assign');
var CODE128Constants = require('./../constants/CODE128Constants');

/**
 *
 * @type {string}
 * @private
 */
var _code = '';

/**
 *
 * @type {string}
 * @private
 */
var _string = '';

function _encodingByChar(character) {
  for (var i = 0; i < CODE128Constants.Mapping.CODE_128.length; i++) {
    if (CODE128Constants.Mapping.CODE_128[i][0] == character) {
      return CODE128Constants.Mapping.CODE_128[i][1];
    }
  }
  return "";
}

/**
 * Get the encoded data by the id of the character
 * @param id
 * @returns {*}
 * @private
 */
function _encodingById(id) {
  for (var i = 0; i < CODE128Constants.Mapping.CODE_128.length; i++) {
    if (CODE128Constants.Mapping.CODE_128[i][2] == id) {
      return CODE128Constants.Mapping.CODE_128[i][1];
    }
  }
  return "";
}

/**
 * Get the id (weight) of a character
 * @param character
 * @returns {*}
 */
function _weightByCharacter(character) {
  for (var i = 0; i < CODE128Constants.Mapping.CODE_128.length; i++) {
    if (CODE128Constants.Mapping.CODE_128[i][0] == character) {
      return CODE128Constants.Mapping.CODE_128[i][2];
    }
  }
  return 0;
}

var CODE128 = assign({}, {
  prepare: function(string, code) {
    _code = code || "B";
    /** Ensure string actually is a string */
    _string = string + "";
    return this;
  },

  /** Use the regexp variable for validation */
  valid: function () {
    return !(_string.search(CODE128Constants.Validation.VALID_STRING_PATTERN) == -1);
  },

  encoded: function () {
    if (this.valid(_string)) {
      switch (_code) {
        case CODE128Constants.CodeTypes.B:
          return this.calculateCode128(_string, this.encodeB, 104, this.checksumB);
        case CODE128Constants.CodeTypes.C:
          var _replaceString = _string.replace(/ /g, "");
          return this.calculateCode128(_replaceString, this.encodeC, 105, this.checksumC);
      }
    } else {
      return "";
    }
  },

  /**
   * The encoders function that return a complete binary string. Data need to be validated before sent to this function
   * This is general calculate function, which is called by code specific calculate functions
   * @param string
   * @param encodeFn
   * @param startCode
   * @param checksumFn
   * @returns {string}
   */
  calculateCode128: function (string, encodeFn, startCode, checksumFn) {
    var result = "";

    //Add the start bits
    result += _encodingById(startCode);

    //Add the encoded bits
    result += encodeFn(string);

    //Add the checksum
    result += _encodingById(checksumFn(string, startCode));

    //Add the end bits
    result += CODE128Constants.ENDING_BINARY;

    return result;
  },

  /**
   * Encode the characters (128 B)
   * @param string
   * @returns {string}
   */
  encodeB: function (string) {
    var self = this;
    var result = "";
    if (string) {
      for (var i = 0; i < string.length; i++) {
        result += _encodingByChar(string[i]);
      }
    }

    return result;
  },

  /**
   * Encode the characters (128 C)
   * @param string
   * @returns {string}
   */
  encodeC: function (string) {
    if (!string) {
      return "";
    }
    var self = this;
    var result = "";
    for (var i = 0; i < string.length; i += 2) {
      result += _encodingById(parseInt(string.substr(i, 2)));
    }
    return result;
  },

  /**
   * Calculate the checksum (128 B)
   * @param string
   * @param startCode
   * @returns {number}
   */
  checksumB: function (string, startCode) {
    if (!string) {
      return startCode % 103;
    }
    var self = this;
    var sum = 0;
    for (var i = 0; i < string.length; i++) {
      sum += _weightByCharacter(string[i]) * (i + 1);
    }
    return (sum + startCode) % 103;
  },

  /**
   * Calculate the checksum (128 C)
   * @param string
   * @param startCode
   * @returns {number}
   */
  checksumC: function (string, startCode) {
    var self = this;
    var sum = 0;
    var w = 1;
    for (var i = 0; i < string.length; i += 2) {
      sum += parseInt(string.substr(i, 2)) * (w);
      w++;
    }
    return (sum + startCode) % 103;
  }
});

module.exports = CODE128;