"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 */

/**
 * This component operates as a "controller-view".
 */

var React = require('react');
var classNames = require('classnames');
var XBarcodeStore = require('../stores/barcode/BarcodeStore');
var Header = require('./Header.react');
var Sidebar = require('./Sidebar.react');
var MainSection = require('./MainSection.react');
var PrintingSection = require('./PrintingSection.react.js');
//var Footer = require('./Footer.react');

var NavigatorStore = require('../stores/ui/NavigatorStore');
var SidebarStore = require('../stores/ui/SidebarStore');
var TitleStore = require('../stores/ui/TitleStore');
var MainSectionStore = require('../stores/ui/MainSectionStore');
var BarcodeStore = require('./../stores/barcode/BarcodeStore');
var SettingStore = require('./../stores/base/SettingStore');

var Data = require('./../utils/Data');

window.BarcodeStore = BarcodeStore;

/**
 *
 */

function _getXBarcodeState() {
  return {
    title: TitleStore.getTitle(),
    isSidebarActivated: NavigatorStore.getMainNavigatorShowedStatus(),
    sidebarTabCategories: SidebarStore.getTabCategories(),
    mainSectionSubject: MainSectionStore.getSubject()
  }
}

function _loadSetting() {
  Data.getSettingData();
}

function _prepareData() {
  _loadSetting();
}

var XBarcodeApp = React.createClass({
  getInitialState: function () {
    return _getXBarcodeState();
  },

  componentDidMount: function () {
    _prepareData();

    NavigatorStore.addToggleMainNavigatorListener(this._onToggleMainNavigator);
    SidebarStore.addChangeListener(this._onChange);
    TitleStore.addChangeListener(this._onChange);
    MainSectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    NavigatorStore.removeToggleMainNavigatorListener(this._onToggleMainNavigator);
    SidebarStore.removeChangeListener(this._onChange);
    TitleStore.removeChangeListener(this._onChange);
    MainSectionStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    return (
      <div className="glhf">
        <PrintingSection key="printing-section" active={this.state.isPrintingActivated} />
        <div className={classNames('container')}>
          <Header key="main-header" title={this.state.title} />
          <div className={classNames('flex-container', 'main-wrapper')}>
            <Sidebar key="sidebar" active={this.state.isSidebarActivated} tabCategories={this.state.sidebarTabCategories} ref='sidebar' />
            <section id="main-section" className={classNames('main-section')}>
              <MainSection key="main-section" subject={this.state.mainSectionSubject} />
            </section>
          </div>
        </div>
      </div>
    );
  },

  _onToggleMainNavigator: function() {
    this.setState(_getXBarcodeState());
  },

  _onChange: function() {
    this.setState(_getXBarcodeState());
  }

});

module.exports = XBarcodeApp;