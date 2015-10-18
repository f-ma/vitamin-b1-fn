"use strict";

var React = require('react');
var classNames = require('classnames');
var BarcodeConstants = require('./../../../constants/BarcodeConstants');
var TextInput = require('./../../inputs/TextInput.react');
var SymbologySelector = require('./../../inputs/SymbologySelector.react');
var BarcodeStore = require('./../../../stores/barcode/BarcodeStore');


var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {
    $('#' + this.getBarcodeStringInputHtmlId()).focus();
    BarcodeStore.draw($('#' + BarcodeConstants.HtmlId.PREFIX.BARCODE.PREVIEW), 'BARCODE PREVIEWER', {format: this.getBarcodeSymbology(), height: 50});
  },

  render: function () {
    return (
      <div className={classNames('header')}>
        <div className={classNames('barcode-content')}>
          <label className={classNames('label')}><span className={classNames('fa', 'fa-barcode')}></span></label>
          <TextInput htmlId={this.getBarcodeStringInputHtmlId()} className="input" placeHolder="eVeeeeerythingthatvalid" handleOnKeyDown={this.handleTextInputOnKeyDown} />
          <SymbologySelector inputName="barcode-creator-symbology" htmlId={this.getSymbologyHtmlId()} />
        </div>
      </div>
    );
  },

  getSymbologyHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.SYNBOLOGY_INPUT);
  },

  getBarcodeStringInputHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.STRING_INPUT);
  },

  getBarcodeStringInputValue: function() {
    return $('#' + this.getBarcodeStringInputHtmlId()).val();
  },

  getBarcodeSymbology: function() {
    return $('#' + this.getSymbologyHtmlId()).val();
  },

  handleTextInputOnKeyDown: function(event) {
    event.stopPropagation();
    if (event.target.value) {
      BarcodeStore.draw($('#' + BarcodeConstants.HtmlId.PREFIX.BARCODE.PREVIEW), event.target.value, {format: this.getBarcodeSymbology(), height: 50});
    }
  }

});

module.exports = Header;