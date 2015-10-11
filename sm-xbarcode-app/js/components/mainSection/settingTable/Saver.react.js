"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingStore = require('./../../../stores/base/SettingStore');

function _getState() {
  return null;
}

var Saver = React.createClass({
  propTypes: {
    saveButtonOnClickHandler: React.PropTypes.func
  },

  getInitialState: function () {
    return _getState();
  },

  componentWillMount: function() {

  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  render: function() {
    return (
      <div className={classNames('setting-group', 'setting-saver')}>
        <button className={classNames('btn', 'btn-blue')} onClick={this.saveButtonOnClickHandler}>Save</button>
      </div>
    );
  },

  saveButtonOnClickHandler: function(event) {
    if (typeof this.props.saveButtonOnClickHandler === 'function') {
      this.props.saveButtonOnClickHandler(event);
    } else {
      alert('TODO: Save!');
    }
  }
});

module.exports = Saver;