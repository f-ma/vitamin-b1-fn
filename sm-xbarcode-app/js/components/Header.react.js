"use strict";

/**
 * Copyright (c) 2015, SmartOSC
 * All rights reserved.
 *
 */

var React = require('react');
var Logo = require('./header/Logo.react');
var Title = require('./header/Title.react');

var Header = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return null;
  },

  /**
   * @return {object}
   */
  render: function () {
    return (
      <header id="header" className="flex-container">
        <Logo key="logo" handleNavigatorClick={this.props.handleNavigatorClick} />
        <Title key="title" content={this.props.title} />
      </header>
    );
  }
});

module.exports = Header;