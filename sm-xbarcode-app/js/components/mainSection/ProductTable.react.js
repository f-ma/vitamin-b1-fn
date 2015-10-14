"use strict";

var React = require('react');
var classNames = require('classnames');
var Header = require('./productTable/Header.react');
var Body = require('./productTable/Body.react');
var DataAPI = require('./../../utils/Data');

var ProductTable = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {
    DataAPI.getProductData(null, '');
  },

  render: function() {
    return (
      <div className={classNames('product-table')}>
        <Header key="header" />
        <Body key="body" />
      </div>
    );
  }
});

module.exports = ProductTable;