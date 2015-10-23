"use strict";

var React = require('react');
var classNames = require('classnames');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var BarcodeSourceSelector = require('./../../../inputs/BarcodeSourceSelector.react');
var PrinterActions = require('./../../../../actions/PrinterActions');
var ProductActions = require('./../../../../actions/ProductActions');
var BarcodeEncoderConstants = require('./../../../../stores/barcode/constants/EncoderConstant');
var BarcodeStore = require('./../../../../stores/barcode/BarcodeStore');
var BarcodeConstants = require('./../../../../constants/BarcodeConstants');
var Data = require('./../../../../utils/Data');

function _getState() {
  return null;
}

var _valuePattern = {
  symbology: 1,
  barcodeSource: 2
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

  getValuePattern: function() {
    var item = this.props.data;
    switch (this.props.valuePattern) {
      case _valuePattern.barcodeSource:
        return (
          <BarcodeSourceSelector key={item.code_name} htmlId={item.code_name} defaultInputValue={item.value} onChangeHandler={this._handleSelectorOnChange} />
        );
      default:
        return (
          <SymbologySelector key={item.code_name} htmlId={item.code_name} defaultInputValue={item.value} onChangeHandler={this._handleSelectorOnChange} />
        );
    }
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
            {this.getValuePattern()}
          </div>
        </div>
        <div className={classNames('guide')}>
          <p>{item.description}</p>
        </div>
      </div>
    );
  },

  _handleSelectorOnChange: function(event) {
    var item = this.props.data;
    Data.Setting.update({id: item.id, value: event.target.value});
  }
});

module.exports = Item;
