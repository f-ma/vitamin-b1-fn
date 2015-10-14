"use strict";

var React = require('react');
var classNames = require('classnames');
var ProductLockedStore = require('./../../../../stores/ui/ProductLockedAreaStore');
var ProductStore = require('./../../../../stores/base/ProductStore');
var PrinterActions = require('./../../../../actions/PrinterActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');

function _getLockedProducts() {
  return ProductLockedStore.getLockedProducts();
}

var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  render: function () {
    return (
      <div className={classNames('print')}>
        <button className={classNames('btn', 'btn-blue')} onClick={this._handleOnClick}>
          <span>PRINT ALL</span>
        </button>
      </div>
    );
  },

  _handleOnClick: function(event) {
    event.stopPropagation();
    var products = _getLockedProducts();

    PrinterActions.show();

    products.forEach(function(product, productIndex) {
      var barcodeQuantity = parseInt(ProductStore.getLockedQuantity(product));
      PrinterActions.renderProductBarcode({
        quantity: barcodeQuantity,
        product: product,
        options: {
          format: BarcodeEncoderConstants.ENCODERS[ProductStore.getLockedSymbology(product)]
        }
      });
    });
  }

});

module.exports = Header;