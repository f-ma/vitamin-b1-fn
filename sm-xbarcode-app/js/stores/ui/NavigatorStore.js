"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NavigatorConstants = require('../../constants/NavigatorConstants');
var assign = require('object-assign');
/** __ENV **/
var loggerify = require('../../helpers/Loggerify');


var CHANGE_EVENT = 'change';
var TOGGLE_MAIN_NAVIGATOR_EVENT = 'togglemainnavigator';

var _mainNavigatorShowed = false;

function _toggleMainNavigator() {
  _mainNavigatorShowed = !_mainNavigatorShowed;
}

var NavigatorStore = assign({}, EventEmitter.prototype, {

  /**
   * @return {boolean}
   */
  getMainNavigatorShowedStatus: function() {
    return _mainNavigatorShowed;
  },

  emitToggleMainNavigator: function() {
    this.emit(TOGGLE_MAIN_NAVIGATOR_EVENT);
  },

  /**
   * @param {function} callback
   */
  addToggleMainNavigatorListener: function(callback) {
    this.on(TOGGLE_MAIN_NAVIGATOR_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeToggleMainNavigatorListener: function(callback) {
    this.removeListener(TOGGLE_MAIN_NAVIGATOR_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case NavigatorConstants.NAVIGATOR_TOGGLE_MAIN:
      _toggleMainNavigator();
      NavigatorStore.emitToggleMainNavigator();
      break;
  }
});

module.exports = NavigatorStore;
