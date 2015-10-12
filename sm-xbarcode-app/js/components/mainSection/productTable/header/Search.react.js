"use strict";

var React = require('react');
var className = require('classnames');
var Label = require('./search/Label.react');
var SubmitButton = require('./../../../inputs/SubmitButton.react');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var TextInput = require('./../../../inputs/TextInput.react');
var DataAPI = require('../../../../utils/Data');


var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  render: function () {
    return (
      <form className={className('search flex-container')} onSubmit={this.handleOnSubmit}>
        <Label key="label" />
        <TextInput className="input" placeHolder="Search products by name, SKU, ID or barcode" handleOnKeyPress={this.handleTextInputOnKeyPress} />
        <SymbologySelector labelText="by" inputName="symbology" />
        <SubmitButton labelName="Search" iconName="fa fa-search" className="btn btn-glass submit" />
      </form>
    );
  },

  handleOnSubmit: function() {
    /**
     * TODO: handle onsubmit event
     */
    console.log('Handle onSubmit event!');

  },

  handleTextInputOnKeyPress: function(event) {
    event.stopPropagation();
    DataAPI.getProductData(null, event.target.value);
  }
});

module.exports = Header;