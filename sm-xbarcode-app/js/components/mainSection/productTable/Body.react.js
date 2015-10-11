"use strict";

var React = require('react');
var classNames = require('classnames');
var Item = require('./body/Item.react');
var ProductConstants = require('./../../../constants/ProductConstants');
var ProductStore = require('./../../../stores/base/ProductStore');

function _getState() {
  return {
    productData: ProductStore.getProductData()
  };
}

var Header = React.createClass({
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

module.exports = Header;