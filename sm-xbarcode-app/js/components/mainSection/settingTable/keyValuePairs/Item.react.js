"use strict";

var React = require('react');
var classNames = require('classnames');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var PrinterActions = require('./../../../../actions/PrinterActions');
var ProductActions = require('./../../../../actions/ProductActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');
var BarcodeStore = require('./../../../../stores/barcode/BarcodeStore');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');
var Data = require('./../../../../utils/Data');

function _getState() {
  return null;
}

var Item = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },

  getInitialState: function () {
    return _getState();
  },

  componentWillUnmount: function () {

  },

  render: function() {
    var item = this.props.data;

    return (
      <div id={this.props.htmlId} className={classNames('item')}>
        <div className={classNames('pair')}>
          <div className={classNames('label')}>
            <span>{item.label}</span>
          </div>
          <div className={classNames('value')}>
            <SymbologySelector key={item.code_name} htmlId={item.code_name} defaultInputValue={item.value} onChangeHandler={this._handleSymbologyOnChange} />
          </div>
        </div>
        <div className={classNames('guide')}>
          <p>{item.description}</p>
        </div>
      </div>
    );
  },

  _handleSymbologyOnChange: function(event) {
    var item = this.props.data;
    Data.Setting.update({id: item.id, value: event.target.value});
  }
});

module.exports = Item;
