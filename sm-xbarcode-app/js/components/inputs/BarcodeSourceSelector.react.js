"use strict";

var React = require('react');
var classNames = require('classnames');
var BarcodeStore = require('./../../stores/barcode/BarcodeStore');
var SettingStore = require('./../../stores/base/SettingStore');
var SettingConstants = require('./../../constants/base/SettingConstants');

var BarcodeSourceSelector = React.createClass({
  propTypes: {
    labelText: React.PropTypes.string,
    inputName: React.PropTypes.string,
    htmlId: React.PropTypes.string,
    defaultInputValue: React.PropTypes.string,
    onChangeHandler: React.PropTypes.func
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
    return (this.props.defaultInputValue) ? this.props.defaultInputValue : settings[SettingConstants.CodeName.PRODUCT_BARCODE_GENERATING_ATTRIBUTE].value;
  },

  getProductBarcodeGeneratingAttributeOptions: function() {
    return (
      <select id={this.getHtmlId()} name={this.getInputName()} defaultValue={this.getDefaultValue()} onChange={this.props.onChangeHandler}>
        <option key="id" value="ID">ID</option>
        <option key="sku" value="SKU">SKU</option>
      </select>
    );
  },

  render: function() {
    return (
      <div className={classNames('selector barcode-source', 'flex-container')}>
        {this.getLabel()}
        <div className={classNames('wrapper')}>
          {this.getProductBarcodeGeneratingAttributeOptions()}
        </div>
      </div>
    );
  }
});

module.exports = BarcodeSourceSelector;
