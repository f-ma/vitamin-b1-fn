"use strict";

var React = require('react');
var classNames = require('classnames');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');
var ProductLockAreaStore = require('./../../../../stores/ui/ProductLockedAreaStore');
var Item = require('./Item.react');

function _getState() {
  return {
    lockedProducts: ProductLockAreaStore.getLockedProducts()
  }
}

var ProductLockArea = React.createClass({
  propTypes: {
    productData: React.PropTypes.object,
  },

  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {
    ProductLockAreaStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ProductLockAreaStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div id={BarcodeConstants.HtmlId.PRODUCT_LOCKED_AREA}>
        {this.state.lockedProducts.map(function (item, itemIndex) {
          return (
            <Item key={"item-locked" + itemIndex} data={item} index={itemIndex} isLocked={true} />
          );
        })}
      </div>
    );
  },

  _onChange: function() {
    this.setState(_getState());
  }


});

module.exports = ProductLockArea;
