"use strict";

var React = require('react');
var classNames = require('classnames');
var Header = require('./orderTable/Header.react');
var Body = require('./orderTable/Body.react');
var DataAPI = require('./../../utils/Data');

var OrderTable = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {
    DataAPI.getOrderData('');
  },

  render: function() {
    return (
      <div className={classNames('manager-table', 'order-table')}>
        <Header key="header" />
        <Body key="body" />
      </div>
    );
  }
});

module.exports = OrderTable;