"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NavigatorConstants = require('../../constants/NavigatorConstants');
var assign = require('object-assign');
var SidebarStore = require('./SidebarStore');

/**
 *
 * @type {string}
 */
var CHANGE_EVENT = "change";

var _title = SidebarStore.getTitle();

/**
 *
 * @return {*}
 * @private
 */
function _updateTitle() {
  _title = SidebarStore.getTitle();
}

var TitleStore = assign({}, EventEmitter.prototype, {

  /**
   *
   * @return {*}
   */
  getTitle: function() {
    return _title;
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

TitleStore.dispatchToken = AppDispatcher.register(function(payload){
  switch(payload.actionType) {
    case NavigatorConstants.NAVIGATOR_SELECT_SIDEBAR_TAB_ITEM:
      AppDispatcher.waitFor([SidebarStore.dispatchToken]);
      _updateTitle(payload.title);
      TitleStore.emitChange();
      break;
  }
});

module.exports = TitleStore;