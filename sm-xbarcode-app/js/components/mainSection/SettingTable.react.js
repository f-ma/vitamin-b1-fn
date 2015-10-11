"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingStore = require('./../../stores/base/SettingStore');
var IO = require('./settingTable/IO.react');
var KeyValuePairs = require('./settingTable/KeyValuePairs.react');
var Saver = require('./settingTable/Saver.react');

function _getState() {
  return null;
}

var SettingTable = React.createClass({
  propTypes: {

  },
  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  render: function() {
    return (
      <div className={classNames('setting-table')}>
        <IO key="io" />
        <KeyValuePairs key="key-value-pairs" />
        <Saver key="saver" />
      </div>
    );
  }


});

module.exports = SettingTable;