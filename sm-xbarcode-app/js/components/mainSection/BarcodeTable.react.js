"use strict";

var React = require('react');
var classNames = require('classnames');
var Header = require('./barcodeTable/Header.react');
var Body = require('./barcodeTable/Body.react');

var BarcodeTable = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div className={classNames('barcode-table')}>
        <Header key="header" />
        <Body key="body" />
      </div>
    );
  }
});

module.exports = BarcodeTable;