"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var NavigatorConstants = require('../constants/NavigatorConstants');
/** __ENV **/
var loggerify = require('../helpers/Loggerify');

var NavigatorActions = {
  toggleMain: function() {
    AppDispatcher.dispatch({
      actionType: NavigatorConstants.NAVIGATOR_TOGGLE_MAIN
    });
  },

  offMain: function() {
    AppDispatcher.dispatch({
      actionType: NavigatorConstants.NAVIGATOR_OFF_MAIN
    });
  },

  /**
   *
   * @param item
   */
  selectSidebarTabItem: function(item) {
    AppDispatcher.dispatch({
      actionType: NavigatorConstants.NAVIGATOR_SELECT_SIDEBAR_TAB_ITEM,
      item: item
    });
  }
};

module.exports = NavigatorActions;
