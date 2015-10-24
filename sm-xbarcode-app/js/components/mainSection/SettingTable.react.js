"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingStore = require('./../../stores/base/SettingStore');
var IO = require('./settingTable/IO.react');
var KeyValuePairs = require('./settingTable/KeyValuePairs.react');
var Saver = require('./settingTable/Saver.react');
var BarcodeTemplate = require('./settingTable/BarcodeTemplate.react');

function _getState() {
  return {
    settings: SettingStore.getSettingData()
  };
}

var SettingTable = React.createClass({
  propTypes: {

  },
  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {
    SettingStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SettingStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className={classNames('setting-table')}>
        <IO key="io" />
        <KeyValuePairs key="key-value-pairs" settings={this.state.settings} />
        <BarcodeTemplate key="barcode-template" />
      </div>
    );
  },

  _onChange: function() {
    this.setState(_getState());
  }
});

module.exports = SettingTable;
