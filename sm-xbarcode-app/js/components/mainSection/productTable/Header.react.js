"use strict";

var React = require('react');
var className = require('classnames');
var Search = require('./header/Search.react');
var Print = require('./header/Print.react');


var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },

  render: function () {
    return (
      <div className={className('header')}>
        <Search key="search" />
        <Print key="print" />
      </div>
    );
  }
});

module.exports = Header;