"use strict";

var React = require('react');
var NavigatorActions = require('../../actions/NavigatorActions');
/** __ENV **/
var loggerify = require('../../helpers/Loggerify');

var Navigator = React.createClass({
  /**
   * @return {object}
   */
  render: function () {
    return (
      <button className="btn btn-glass" onClick={this._onClick}>
        <span key="icon" className="fa fa-bars"></span>
      </button>
    );
  },

  _onClick: function() {
    NavigatorActions.toggleMain();

    if (typeof __ENV !== 'undefined' && __ENV === "development") {
      loggerify.logViewInteracting('header/Navigator', '_onClick');
    }
  }
});

module.exports = Navigator;