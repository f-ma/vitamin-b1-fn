"use strict";

var React = require('react');
var className = require('classnames');

var TextInput = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    handleOnKeyPress: React.PropTypes.func,
    handleOnChange: React.PropTypes.func
  },

  getInitialState: function() {
    return null;
  },
  render: function() {
    return (
      <input className={this.props.className} type="text" placeholder={this.props.placeHolder} onKeyPress={this.props.handleOnKeyPress} onChange={this.props.handleOnChange} />
    );
  }
});

module.exports = TextInput;