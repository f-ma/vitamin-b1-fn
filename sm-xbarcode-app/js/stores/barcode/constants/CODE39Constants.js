"use strict";

var keyMirror = require('keymirror');

module.exports = {
  Validation: {
    /**
     * This regexp is used for validation
     * @type {RegExp}
     */
    VALID_STRING_PATTERN: /^[0-9a-zA-Z\-\.\ \$\/\+\%]+$/
  },

  Mapping: {
    CODE_39: [
      [0,"0","101000111011101"]
      ,[1,"1","111010001010111"]
      ,[2,"2","101110001010111"]
      ,[3,"3","111011100010101"]
      ,[4,"4","101000111010111"]
      ,[5,"5","111010001110101"]
      ,[6,"6","101110001110101"]
      ,[7,"7","101000101110111"]
      ,[8,"8","111010001011101"]
      ,[9,"9","101110001011101"]
      ,[10,"A","111010100010111"]
      ,[11,"B","101110100010111"]
      ,[12,"C","111011101000101"]
      ,[13,"D","101011100010111"]
      ,[14,"E","111010111000101"]
      ,[15,"F","101110111000101"]
      ,[16,"G","101010001110111"]
      ,[17,"H","111010100011101"]
      ,[18,"I","101110100011101"]
      ,[19,"J","101011100011101"]
      ,[20,"K","111010101000111"]
      ,[21,"L","101110101000111"]
      ,[22,"M","111011101010001"]
      ,[23,"N","101011101000111"]
      ,[24,"O","111010111010001"]
      ,[25,"P","101110111010001"]
      ,[26,"Q","101010111000111"]
      ,[27,"R","111010101110001"]
      ,[28,"S","101110101110001"]
      ,[29,"T","101011101110001"]
      ,[30,"U","111000101010111"]
      ,[31,"V","100011101010111"]
      ,[32,"W","111000111010101"]
      ,[33,"X","100010111010111"]
      ,[34,"Y","111000101110101"]
      ,[35,"Z","100011101110101"]
      ,[36,"-","100010101110111"]
      ,[37,".","111000101011101"]
      ,[38," ","100011101011101"]
      ,[39,"$","100010001000101"]
      ,[40,"/","100010001010001"]
      ,[41,"+","100010100010001"]
      ,[42,"%","101000100010001"]
    ]
  }
};