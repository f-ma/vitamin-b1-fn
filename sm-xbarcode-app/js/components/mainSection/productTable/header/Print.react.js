"use strict";

var React = require('react');
var classNames = require('classnames');

var Header = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return null;
  },



  render: function () {
    return (
      <div className={classNames('print')}>
        <button className={classNames('btn', 'btn-blue')}>
          <span>PRINT ALL</span>
        </button>
      </div>
    );
  }
});

module.exports = Header;