"use strict";

var React = require('react');
var classNames = require('classnames');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
//var OrderActions = require('./../../../../actions/OrderActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');
var BarcodeStore = require('./../../../../stores/barcode/BarcodeStore');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');

function _getState() {
  return null;
}

var Item = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    index: React.PropTypes.number,
  },

  getInitialState: function () {
    return _getState();
  },

  _fillPreviewBarcode: function() {
    setTimeout(function(orderPreviewBarcodeHtmlId, barcodeValue){
      BarcodeStore.draw($('#' + orderPreviewBarcodeHtmlId), barcodeValue, {
        width: 2,
        displayValue: false
      })
    }, 1, this.getOrderPreviewBarcodeHtmlId(), this.props.data.increment_id);
  },

  _fillProductPreviewBarcode: function() {
    var self = this;
    var orderItem = this.props.data;
    var products = orderItem.items;

    products.forEach(function(product) {
      setTimeout(function(productPreviewBarcodeHtmlId, barcodeValue){
        BarcodeStore.draw($('#' + productPreviewBarcodeHtmlId), barcodeValue, {
          width: 2,
          displayValue: false
        })
      }, 1, self.getProductPreviewBarcodeHtmlId(product.product_id), product.product_id);
    });
  },

  componentDidMount: function () {
    this._fillPreviewBarcode();
    this._fillProductPreviewBarcode();
  },

  componentWillUnmount: function () {

  },

  componentDidUpdate: function() {
    this._fillPreviewBarcode();
    this._fillProductPreviewBarcode();
  },


  render: function() {
    var self = this;
    var orderItem = this.props.data;
    var products = orderItem.items;

    return (
      <div className={classNames('item')}>
        <div className={classNames('order-detail')}>
          <div className={classNames('decorate')}>
            <span>{orderItem.status}</span>
          </div>
          <div className={classNames('description')}>
            <div className={classNames('name')}><span>{orderItem.base_gt}</span></div>
            <div className={classNames('id')}><span>ID: {orderItem.increment_id}</span></div>
            <div className={classNames('customer-name')}>Customer: <span>{orderItem.customer_name}</span></div>
            <div className={classNames('store-name')}>Store: <span>{orderItem.store_name}</span></div>
          </div>
          <div className={classNames('barcode-preview')}>
            <canvas id={this.getOrderPreviewBarcodeHtmlId()} />
          </div>
          <div className={classNames('actions')}>
            <div className={classNames('row', 'complete', 'no-select')}>
              <button>COMPLETE</button>
            </div>
            <div className={classNames('row')}>
              <button className={classNames('partial', 'no-select')}>PARTIAL</button>
              <button className={classNames('hold', 'no-select')}>HOLD</button>
            </div>
          </div>
        </div>
        <div className={classNames('product-container')}>
          {products.map(function(product, productIndex) {
            return (
              <div key={productIndex} className={classNames('product')}>
                <div className={classNames('quantities')}>
                  <div className={classNames('shipped')}>{parseInt(product.qty_shipped)}</div>
                  <div className={classNames('ordered')}>{parseInt(product.qty_ordered)}</div>
                </div>
                <div className={classNames('description')}>
                  <div className={classNames('name')}><span>{product.name}</span></div>
                  <div className={classNames('id')}><span>ID: {product.product_id}</span></div>
                  <div className={classNames('sku')}><span>SKU: {product.sku}</span></div>
                </div>
                <div className={classNames('barcode-preview')}>
                  <canvas id={self.getProductPreviewBarcodeHtmlId(product.product_id)} />
                </div>
                <div className={classNames('actions')}>
                  <div className={classNames('minus', 'no-select')}>-</div>
                  <div className={classNames('plus', 'no-select')}>+</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  getOrderPreviewBarcodeHtmlId: function() {
    return (BarcodeConstants.HtmlId.PREFIX.ORDER_BARCODE.PREVIEW +
    BarcodeConstants.HtmlId.DELIMITER +
    this.props.data.increment_id);
  },

  getProductPreviewBarcodeHtmlId: function(productId) {
    return (BarcodeConstants.HtmlId.PREFIX.PRODUCT_BARCODE.PREVIEW +
      BarcodeConstants.HtmlId.DELIMITER +
      productId
    );
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
