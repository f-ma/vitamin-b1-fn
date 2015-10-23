"use strict";

var React = require('react');
var classNames = require('classnames');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var PrinterActions = require('./../../../../actions/PrinterActions');
var ProductActions = require('./../../../../actions/ProductActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');
var BarcodeStore = require('./../../../../stores/barcode/BarcodeStore');
var SettingStore = require('./../../../../stores/base/SettingStore');
var SettingConstants = require('./../../../../constants/base/SettingConstants');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');

function _getState() {
  return null;
}

var Item = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    index: React.PropTypes.number,
    isLocked: React.PropTypes.bool
  },

  getInitialState: function () {
    return _getState();
  },

  _fillPreviewBarcode: function() {
    var item = this.props.data;
    var barcodeValue = '';
    switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_GENERATING_ATTRIBUTE).value) {
      case 'ID':
        barcodeValue = item.id;
        break;
      case 'SKU':
        barcodeValue = item.sku;
        break;
      default:
        barcodeValue = item.id;
        break;
    }

    setTimeout(function(productPreviewBarcodeHtmlId, barcodeValue){
      BarcodeStore.draw($('#' + productPreviewBarcodeHtmlId), barcodeValue, {
        width: 2,
        displayValue: false
      })
    }, 1, this.getProductPreviewBarcodeHtmlId(), barcodeValue);
  },

  componentDidMount: function () {
    this._fillPreviewBarcode();
  },

  componentWillUnmount: function () {

  },

  componentDidUpdate: function() {
    this._fillPreviewBarcode();
  },

  getBarcodePreviewLabel: function() {
    var item = this.props.data;
    switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_GENERATING_ATTRIBUTE).value) {
      case 'ID':
        return item.id;
      case 'SKU':
        return item.sku;
      default:
        return item.id;
    }
  },

  render: function() {
    var item = this.props.data;
    var lockerButtonOnClickHandler = (!!this.props.isLocked) ? this._handleItemUnlockerButtonOnClick  : this._handleItemLockerButtonOnClick;

    return (
      <div className={classNames('item')}>
        <div className={classNames('locker', 'flex-container', {unlock: this.props.isLocked})} onClick={lockerButtonOnClickHandler}>
        </div>
        <div className={classNames('decorate')}><img src={item.thumbnail_url}/></div>
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
            <h5>{this.getBarcodePreviewLabel()}</h5>
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
    return (BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.PREVIEW +
      BarcodeConstants.HtmlId.DELIMITER +
      this.props.data.id +
      BarcodeConstants.HtmlId.DELIMITER +
      ((!!this.props.isLocked) ? 1 : 0));
  },

  getBarcodeQuantityInputId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.QUANTITY_INPUT +
      BarcodeConstants.HtmlId.DELIMITER +
      this.props.data.id +
      BarcodeConstants.HtmlId.DELIMITER +
      ((!!this.props.isLocked) ? 1 : 0));
  },

  getBarcodeQuantity: function() {
    return $('#' + this.getBarcodeQuantityInputId()).val();
  },

  getBarcodeSymbologyInputId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.SYNBOLOGY_INPUT +
      BarcodeConstants.HtmlId.DELIMITER +
      this.props.data.id +
      BarcodeConstants.HtmlId.DELIMITER +
      ((!!this.props.isLocked) ? 1 : 0));
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
  },

  _handleItemLockerButtonOnClick: function(event) {
    event.stopPropagation();
    var item = this.props.data;

    ProductActions.lock(item);
  },
  _handleItemUnlockerButtonOnClick: function(event) {
    event.stopPropagation();
    var item = this.props.data;

    ProductActions.unlock(item);
  }
});

module.exports = Item;
