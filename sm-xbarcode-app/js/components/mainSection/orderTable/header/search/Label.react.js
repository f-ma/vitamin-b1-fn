"use strict";

var React = require('react');
var classNames = require('classnames');

var Label = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },
  render: function() {
    return (
      <label className="label"><span className="fa fa-tag"></span></label>
    );
  }
});

module.exports = Label;