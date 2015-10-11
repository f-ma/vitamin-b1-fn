"use strict";

var React = require('react');
var Navigator = require('./Navigator.react');

var Logo = React.createClass({
  /**
   * @return {object}
   */
  render: function () {
    return (
      <div className="logo-container flex-container">
        <a key="link" id="logo" href="#"></a>
        <Navigator key="navigator" handleClick={this.props.handleNavigatorClick}/>
      </div>
    );
  }
});

module.exports = Logo;