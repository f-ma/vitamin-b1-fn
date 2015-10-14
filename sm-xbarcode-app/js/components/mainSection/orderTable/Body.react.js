"use strict";

var React = require('react');
var classNames = require('classnames');
var Item = require('./body/Item.react');
var OrderStore = require('./../../../stores/base/OrderStore');
var BarcodeConstants = require('./../../../constants/BarcodeConstants');

function _getState() {
  return {
    orderData: OrderStore.getOrderData()
  };
}

var Body = React.createClass({
  propTypes: {},

  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {
    OrderStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    OrderStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div className="body">
        <div id={BarcodeConstants.HtmlId.ORDER_LOADING_STATUS_BAR} className={classNames('progress-bar')}></div>
        {this.state.orderData.map(function (item, itemIndex) {
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