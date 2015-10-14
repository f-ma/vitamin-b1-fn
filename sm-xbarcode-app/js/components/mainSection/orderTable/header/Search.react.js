"use strict";

var React = require('react');
var className = require('classnames');
var Label = require('./search/Label.react');
var SubmitButton = require('./../../../inputs/SubmitButton.react');
var SymbologySelector = require('./../../../inputs/SymbologySelector.react');
var TextInput = require('./../../../inputs/TextInput.react');
var DataAPI = require('../../../../utils/Data');
var TimeoutStore = require('./../../../../stores/barcode/TimeoutStore');


var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  getSearchStringInputHtmlId: function() {
    return 'global-search-string-input';
  },

  getSearchStringInput: function() {
    return $('#' + this.getSearchStringInputHtmlId());
  },

  render: function () {
    return (
      <form className={className('search flex-container')} onSubmit={this.handleOnSubmit}>
        <Label key="label" />
        <TextInput htmlId={this.getSearchStringInputHtmlId()} className="input" placeHolder="Search products by name, SKU, ID or barcode" handleOnKeyPress={this.handleTextInputOnKeyPress} />
        <SymbologySelector labelText="by" inputName="symbology" />
        <SubmitButton labelName="Search" iconName="fa fa-search" className="btn btn-glass submit" />
      </form>
    );
  },

  handleOnSubmit: function() {
    /**
     * TODO: handle onSubmit event
     */
    console.log('Handle onSubmit event!');

  },

  handleTextInputOnKeyPress: function(event) {
    event.stopPropagation();
    var searchString = event.target.value + event.key;

    var timeouts = TimeoutStore.getTimeouts();
    if (!!timeouts && timeouts['orderSearchStringInputTimeout']) {
      clearTimeout(timeouts['orderSearchStringInputTimeout']);
    }
    var orderSearchStringInputTimeout = setTimeout(function(string) {
      DataAPI.getOrderData(string);
    }, 400, searchString);
    TimeoutStore.push('orderSearchStringInputTimeout', orderSearchStringInputTimeout);
  }
});

module.exports = Header;