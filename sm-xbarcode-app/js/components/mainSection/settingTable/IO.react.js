"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingStore = require('./../../../stores/base/SettingStore');

function _getState() {
  return null;
}

var IO = React.createClass({
  propTypes: {

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
      <div className={classNames('setting-io setting-group')}>
        <div className={classNames('label')}>
          IMPORT/EXPORT
        </div>
        <div className={classNames('item')}>
          <a href="#" className={classNames('pseudo-btn pseudo-btn-paper-cut')}>Import product barcodes from CSV</a>
        </div>
      </div>
    );
  }


});

module.exports = IO;