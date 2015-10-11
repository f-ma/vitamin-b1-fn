"use strict";

var React = require('react');
var classNames = require('classnames');
var TabItem = require('./TabItem');

var TabCategory = React.createClass({
  propTypes: {
    tabItems: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return null;
  },

  render: function() {
    if (Object.keys(this.props.tabItems).length < 1) {
      return null;
    }

    var tabItems = this.props.tabItems;
    var tabItemsForRendering = [];

    for (var key in tabItems) {
      var _tabItem = tabItems[key];
      tabItemsForRendering.push(
        <TabItem key={key} item={_tabItem} />
      );
    }

    return (
      <div className={classNames('category', this.props.className)}>
        {tabItemsForRendering}
      </div>
    );
  }
});

module.exports = TabCategory;