"use strict";

var React = require('react');
var className = require('classnames');
var Search = require('./header/Search.react');


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
      </div>
    );
  }
});

module.exports = Header;