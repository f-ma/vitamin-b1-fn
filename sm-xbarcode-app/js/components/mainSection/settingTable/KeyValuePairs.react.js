"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingConstants = require('./../../../constants/base/SettingConstants');
var SettingStore = require('./../../../stores/base/SettingStore');
var SymbologySelector = require('./../../inputs/SymbologySelector.react');
var Item = require('./keyValuePairs/Item.react');

function _getState() {
  return null;
}

var KeyValuePairs = React.createClass({
  propTypes: {
    settings: React.PropTypes.object
  },

  getInitialState: function () {
    return _getState();
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  render: function() {
    var settings = this.props.settings;
    return (
      <div className={classNames('setting-key-value-pairs')}>
        <div className={classNames('setting-group', 'setting-symbology')}>
          <div className={classNames('label')}>
            <span>SYMBOLOGY</span>
          </div>
          <div className={classNames('children')}>

            <Item htmlId={SettingConstants.HtmlId.Item.DEFAULT_SYMBOLOGY} key={SettingConstants.HtmlId.Item.DEFAULT_SYMBOLOGY} data={settings[SettingConstants.CodeName.DEFAULT_GLOBAL_SYMBOLOGY]} />

            <Item htmlId={SettingConstants.HtmlId.Item.SEARCH_SYMBOLOGY} key={SettingConstants.HtmlId.Item.SEARCH_SYMBOLOGY} data={settings[SettingConstants.CodeName.DEFAULT_SEARCH_SYMBOLOGY]} />

            <Item htmlId={SettingConstants.HtmlId.Item.PREVIEW_SYMBOLOGY} key={SettingConstants.HtmlId.Item.PREVIEW_SYMBOLOGY} data={settings[SettingConstants.CodeName.DEFAULT_PREVIEW_SYMBOLOGY]} />

          </div>
        </div>

        <div className={classNames('setting-group', 'setting-resource')}>
          <div className={classNames('label')}>
            <span>BARCODE RESOURCES</span>
          </div>
          <div className={classNames('children')}>
            <Item htmlId={SettingConstants.HtmlId.Item.PRODUCT_BARCODE_GENERATING_ATTRIBUTE} key={SettingConstants.HtmlId.Item.PRODUCT_BARCODE_GENERATING_ATTRIBUTE} data={settings[SettingConstants.CodeName.PRODUCT_BARCODE_GENERATING_ATTRIBUTE]} />
          </div>
        </div>
      </div>
    );
  },

});

module.exports = KeyValuePairs;
