"use strict";

var React = require('react');

var Title = React.createClass({
  /**
   * @return {Object}
   */
  render: function () {
    return (
      <div id="title" className="title">{this.props.content}</div>
    );
  }
});

module.exports = Title;