"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _timeouts = {};

var TimeoutStore = assign({}, EventEmitter.prototype, {
  push: function(timeoutKey, timeout) {
    _timeouts[timeoutKey] = timeout;
  },

  getTimeouts: function() {
    return _timeouts;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   *
   * @param callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   *
   * @param callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = TimeoutStore;