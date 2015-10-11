"use strict";

var React = require('react');
var classNames = require('classnames');
var NavigatorActions = require('../../actions/NavigatorActions');
var loggerify = require('../../helpers/Loggerify');

var TabItem = React.createClass({

  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return null;
  },

  render: function() {
    var item = this.props.item;

    return (
      <a href="#" className={classNames('item','flex-container', {active: this.props.item.active})} onClick={this._onClick}>
        <span key="decorator" className={classNames('decorate', item.iconName)}></span>
        <span key="label" className={classNames('label')}>{item.name}</span>
      </a>
    );
  },

  _onClick: function() {
    NavigatorActions.selectSidebarTabItem(this.props.item);
  }
});

module.exports = TabItem;