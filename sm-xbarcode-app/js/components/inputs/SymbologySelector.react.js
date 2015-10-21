"use strict";

var React = require('react');
var classNames = require('classnames');
var BarcodeStore = require('./../../stores/barcode/BarcodeStore');
var SettingStore = require('./../../stores/base/SettingStore');
var SettingConstants = require('./../../constants/base/SettingConstants');

var SymbologySelector = React.createClass({
  propTypes: {
    labelText: React.PropTypes.string,
    inputName: React.PropTypes.string,
    htmlId: React.PropTypes.string,
    defaultInputValue: React.PropTypes.string
  },

  getInitialState: function() {
    return null;
  },

  getLabel: function() {
    return !!this.props.labelText ?
      (<label>{this.props.labelText}</label>) :
      null;
  },

  getInputName: function() {
    return !!this.props.inputName ?
      this.props.inputName :
      null;
  },

  getHtmlId: function() {
    return !!this.props.htmlId ?
      this.props.htmlId :
      null;
  },

  getDefaultValue: function() {
    var settings = SettingStore.getSettingData();
    return (this.props.defaultInputValue) ? this.props.defaultInputValue : settings[SettingConstants.CodeName.DEFAULT_GLOBAL_SYMBOLOGY].value;
  },

  getSymbologyOptions: function() {
    var availabelSymbologies = BarcodeStore.getAvailableSymbologies();
    return (
      <select id={this.getHtmlId()} name={this.getInputName()} defaultValue={this.getDefaultValue()}>
        {availabelSymbologies.map(function(value, index) {
          return (
            <option key={index} value={value}>{value}</option>
          );
        })}
      </select>
    );
  },
  render: function() {
    return (
      <div className={classNames('symbology', 'flex-container')}>
        {this.getLabel()}
        <div className={classNames('wrapper')}>
          {this.getSymbologyOptions()}
        </div>
      </div>
    );
  }
});

module.exports = SymbologySelector;
