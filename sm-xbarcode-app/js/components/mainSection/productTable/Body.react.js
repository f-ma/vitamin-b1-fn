"use strict";

var React = require('react');
var classNames = require('classnames');
var Item = require('./body/Item.react');
var ProductLockedArea = require('./body/ProductLockArea.react');
var ProductConstants = require('./../../../constants/ProductConstants');
var ProductStore = require('./../../../stores/base/ProductStore');
var BarcodeConstants = require('./../../../constants/BarcodeConstants');

function _getState() {
  return {
    productData: ProductStore.getProductData()
  };
}

var Body = React.createClass({
  propTypes: {},

  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ProductStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div className="body">
        <ProductLockedArea key="product-lock-area" />
        <div id={BarcodeConstants.HtmlId.PRODUCT_LOADING_STATUS_BAR} className={classNames('progress-bar')}></div>
        {this.state.productData.map(function (item, itemIndex) {
          return (
            <Item key={"item" + itemIndex} data={item} index={itemIndex} />
          );
        })}
      </div>
    );
  },

  _onChange: function () {
    this.setState(_getState());
  }
});

module.exports = Body;