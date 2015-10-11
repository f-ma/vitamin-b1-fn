"use strict";

var React = require('react');
var classNames = require('classnames');

var SubmitButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    iconName: React.PropTypes.string,
    labelName: React.PropTypes.string
  },

  getInitialState: function() {
    return null;
  },

  /**
   *
   * @returns {XML}
   */
  getLabel: function() {
    /**
     * TODO: change condition-ing
     */
    if (!this.props.iconName) {
      return (
        <span>{!!this.props.labelName ? this.props.labelName : 'Submit'}</span>
      );
    }

    return (
      <span className={this.props.iconName}></span>
    );
  },

  render: function() {
    return (
        <button className={classNames(this.props.className)} type="submit">{this.getLabel()}</button>
    );
  }
});

module.exports = SubmitButton;