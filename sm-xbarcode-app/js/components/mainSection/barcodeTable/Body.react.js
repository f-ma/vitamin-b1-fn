"use strict";

var React = require('react');
var classNames = require('classnames');
var BarcodeConstants = require('./../../../constants/BarcodeConstants');
var BarcodeEncoderConstants = require('./../../../stores/barcode/constants/EncoderConstant');
var PrinterActions = require('./../../../actions/PrinterActions');
var Header = require('./Header.react');


var Body = React.createClass({
  propTypes: {},

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  render: function () {
    return (
      <div className={classNames('body')}>
        <div className={classNames('printer')}>
          <div className={classNames('barcode-preview')}>
            <canvas id={this.getPreviewBarcodeHtmlId()} />
          </div>
          <div className={classNames('barcode-quantity')}>
            <input id={this.getBarcodeQuantityHtmlId()} defaultValue="1" />
          </div>
          <div className={classNames('barcode-print')}>
            <button className={classNames('btn-blue')} onClick={this.handlePrintOnClick}>PRINT</button>
          </div>
        </div>
        <div className={classNames('options')}></div>
      </div>
    );
  },

  getPreviewBarcodeHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.PREVIEW);
  },

  getBarcodeQuantityHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.QUANTITY_INPUT);
  },

  getBarcodeQuantity: function() {
    return parseInt($('#' + this.getBarcodeQuantityHtmlId()).val());
  },

  getBarcodeStringInputHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.STRING_INPUT);
  },

  getBarcodeStringInputValue: function() {
    return $('#' + this.getBarcodeStringInputHtmlId()).val();
  },

  getSymbologyHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.BARCODE.SYNBOLOGY_INPUT);
  },

  getBarcodeSymbology: function() {
    return $('#' + this.getSymbologyHtmlId()).val();
  },

  handlePrintOnClick: function(event) {
    event.stopPropagation();

    var self = this;
    var barcodeQuantity = this.getBarcodeQuantity();

    if (this.getBarcodeStringInputValue() != '') {
      PrinterActions.show();

      PrinterActions.renderProductBarcode({
        quantity: barcodeQuantity,
        product: false,
        anonymous: {
          id: (new Date).getTime(),
          content: this.getBarcodeStringInputValue()
        },
        options: {
          format: BarcodeEncoderConstants.ENCODERS[this.getBarcodeSymbology()]
        }
      });
    }
  }

});

module.exports = Body;
