"use strict";

var React = require('react');
var classNames = require('classnames');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var PrinterActions = require('./../../../../actions/PrinterActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');
var BarcodeStore = require('./../../../../stores/barcode/BarcodeStore');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');

function _getState() {
  return null;
}

var Item = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    index: React.PropTypes.number
  },

  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {
    BarcodeStore.draw($('#' + this.getProductPreviewBarcodeHtmlId()), this.props.data.id, {
      width: 2,
      displayValue: false
    })
  },

  componentWillUnmount: function () {

  },

  render: function() {
    var item = this.props.data;

    return (
      <div className={classNames('item')}>
        <div className={classNames('decorate')}><img src={"images/thumbnails/" + item.thumbnail}/></div>
        <div className={classNames('description')}>
          <div className={classNames('name')}><span>{item.name}</span></div>
          <div className={classNames('id')}><span>ID: {item.id}</span></div>
          <div className={classNames('sku')}><span>SKU: {item.sku}</span></div>
          <div className={classNames('available')}>Availability: {item.stores.map(function(store, storeIndex) {
            return(<span key={storeIndex}>{store.name} </span>);
          })}</div>
        </div>
        <div className={classNames('barcode-preview')}>
          <canvas id={this.getProductPreviewBarcodeHtmlId()} />
          <div className={classNames('label')}>
            <h5>{item.id}</h5>
          </div>
        </div>
        <form className={classNames('actions')} onSubmit={this._handlePrintFormOnSubmit}>
          <SymbologySelector htmlId={this.getBarcodeSymbologyInputId()} inputName={'symbology-product-' + this.props.index} />
          <div className={classNames('print-container')}>
            <div className={classNames('amount')}>
              <input id={this.getBarcodeQuantityInputId()} type="text" defaultValue="1" />
            </div>
            <div className={classNames('print')}>
              <button type="button" className="btn-glass" onClick={this._handlePrintButtonOnClick}>PRINT</button>
            </div>
          </div>
        </form>
      </div>
    );
  },

  getProductPreviewBarcodeHtmlId: function() {
    return BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.PREVIEW + BarcodeConstants.HtmlId.DELIMITER + this.props.data.id;
  },

  getBarcodeCanvasId: function() {
    return  BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.CANVAS + BarcodeConstants.HtmlId.DELIMITER + this.props.data.id;
  },

  getBarcodeQuantityInputId: function() {
    return BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.QUANTITY_INPUT + BarcodeConstants.HtmlId.DELIMITER + this.props.data.id;
  },

  getBarcodeQuantity: function() {
    return $('#' + this.getBarcodeQuantityInputId()).val();
  },

  getBarcodeSymbologyInputId: function() {
    return BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.SYNBOLOGY_INPUT + BarcodeConstants.HtmlId.DELIMITER + this.props.data.id;
  },

  getBarcodeSymbology: function() {
    return $('#' + this.getBarcodeSymbologyInputId()).val();
  },

  _onChange: function() {
    this.setState(_getState());
  },

  _handlePrintFormOnSubmit: function(event) {
    return false;
  },

  _handlePrintButtonOnClick: function(event) {
    event.stopPropagation();

    var self = this;
    var barcodeQuantity = parseInt(this.getBarcodeQuantity());

    PrinterActions.show();

    PrinterActions.renderProductBarcode({
      quantity: barcodeQuantity,
      product: self.props.data,
      options: {
        format: BarcodeEncoderConstants.ENCODERS[this.getBarcodeSymbology()]
      }
    });
  }
});

module.exports = Item;