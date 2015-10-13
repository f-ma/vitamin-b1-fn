"use strict";

var React = require('react');
var className = require('classnames');

var TextInput = React.createClass({
  propTypes: {
    htmlId: React.PropTypes.string,
    className: React.PropTypes.string,
    placeHolder: React.PropTypes.string,
    handleOnKeyPress: React.PropTypes.func,
    handleOnKeyDown: React.PropTypes.func,
    handleOnKeyUp: React.PropTypes.func,
    handleOnChange: React.PropTypes.func
  },

  getInitialState: function() {
    return null;
  },
  render: function() {
    return (
      <input id={this.props.htmlId} className={this.props.className} type="text" placeholder={this.props.placeHolder} onKeyUp={this.props.handleOnKeyUp} onKeyDown={this.props.handleOnKeyDown} onKeyPress={this.props.handleOnKeyPress} onChange={this.props.handleOnChange} />
    );
  }
});

module.exports = TextInput;