"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 */

var React = require('react');
var TabCategory = require('./sidebar/TabCategory');
var classNames = require('classnames');

var Sidebar = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    tabCategories: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return null;
  },

  /**
   * @return {object}
   */
  render: function () {
    if (Object.keys(this.props.tabCategories).length < 1) {
      return null;
    }

    var tabCategories = this.props.tabCategories;
    var tabCategoriesForRendering = [];

    for (var key in tabCategories) {
      var _tabItems = tabCategories[key];
      tabCategoriesForRendering.push(
        <TabCategory className={classNames(key)} key={key} tabItems={_tabItems} />
      );

    }

    return (
      <aside id="sidebar" className={classNames('sidebar', {active: this.props.active})}>
        {tabCategoriesForRendering}
      </aside>
    );
  }
});

module.exports = Sidebar;