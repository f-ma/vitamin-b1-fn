"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingConstants = require('./../../../constants/base/SettingConstants');
var SettingStore = require('./../../../stores/base/SettingStore');
var SymbologySelector = require('./../../inputs/SymbologySelector.react');

function _getState() {
  return {
    settings: SettingStore.getSettingData()
  }
}

var KeyValuePairs = React.createClass({
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
      <div className={classNames('setting-key-value-pairs')}>
        <div className={classNames('setting-group', 'setting-symbology')}>
          <div className={classNames('label')}>
            <span>SYMBOLOGY</span>
          </div>
          <div className={classNames('children')}>
            <div id={SettingConstants.HtmlId.Item.DEFAULT_SYMBOLOGY} key={SettingConstants.HtmlId.Item.DEFAULT_SYMBOLOGY} className={classNames('item')}>
              <div className={classNames('pair')}>
                <div className={classNames('label')}>
                  <span>Default Symbology</span>
                </div>
                <div className={classNames('value')}>
                  <SymbologySelector key="symbology-selector" htmlId={SettingConstants.HtmlId.Input.DEFAULT_SYMBOLOGY_SELECTOR} />
                </div>
              </div>
              <div className={classNames('guide')}>
                <p>The default barcode symbology</p>
              </div>
            </div>

            <div id={SettingConstants.HtmlId.Item.SEARCH_SYMBOLOGY} key={SettingConstants.HtmlId.Item.SEARCH_SYMBOLOGY} className={classNames('item')}>
              <div className={classNames('pair')}>
                <div className={classNames('label')}>
                  <span>Search Symbology</span>
                </div>
                <div className={classNames('value')}>
                  <SymbologySelector key="symbology-selector" htmlId={SettingConstants.HtmlId.Input.SEARCH_SYMBOLOGY_SELECTOR} />
                </div>
              </div>
              <div className={classNames('guide')}>
                <p>The default barcode symbology that's used for Product searching, Order searching</p>
              </div>
            </div>

            <div id={SettingConstants.HtmlId.Item.PREVIEW_SYMBOLOGY} key={SettingConstants.HtmlId.Item.PREVIEW_SYMBOLOGY} className={classNames('item')}>
              <div className={classNames('pair')}>
                <div className={classNames('label')}>
                  <span>Preview Symbology</span>
                </div>
                <div className={classNames('value')}>
                  <SymbologySelector key="symbology-selector" htmlId={SettingConstants.HtmlId.Input.PREVIEW_SYMBOLOGY_SELECTOR} />
                </div>
              </div>
              <div className={classNames('guide')}>
                <p>The barcode symbology that's used for Product barcode previewing on filter tables</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(_getState());
  }

});

module.exports = KeyValuePairs;