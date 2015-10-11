"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NavigatorConstants = require('../../constants/NavigatorConstants');
var TabItemConstants = require('../../constants/TabItemConstants');
var TabCategoryConstants = require('../../constants/TabCategoryConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

/**
 *
 * @type {{managers, printers, system}|*}
 * @private
 */
var _tabCategories = _getDefaultValues().categories;

/**
 *
 * @type {string}
 * @private
 */
var _title = _getDefaultValues().title;

/**
 *
 * @return {object}
 * @private
 */
function _getInitialTabCategories() {
  var initialTabCategories = {};

  /* MANAGERS */
  initialTabCategories[TabCategoryConstants.MANAGER] = {};
  initialTabCategories[TabCategoryConstants.MANAGER][TabItemConstants.MANAGER_PRODUCT] = {
    name: TabItemConstants.MANAGER_PRODUCT,
    type: TabCategoryConstants.MANAGER,
    iconName: 'fa fa-tag',
    title: 'product manager',
    active: false
  };

  initialTabCategories[TabCategoryConstants.MANAGER][TabItemConstants.MANAGER_ORDER] = {
    name: TabItemConstants.MANAGER_ORDER,
    type: TabCategoryConstants.MANAGER,
    iconName: 'fa fa-shopping-cart',
    title: 'order manager',
    active: false
  };

  /* PRINTERS */
  initialTabCategories[TabCategoryConstants.PRINTER] = {};
  initialTabCategories[TabCategoryConstants.PRINTER][TabItemConstants.PRINTER_BARCODE] = {
    name: TabItemConstants.PRINTER_BARCODE,
    type: TabCategoryConstants.PRINTER,
    iconName: 'fa fa-barcode',
    title: 'barcode printer',
    active: false
  };

  initialTabCategories[TabCategoryConstants.PRINTER][TabItemConstants.PRINTER_DOCUMENT] = {
    name: TabItemConstants.PRINTER_DOCUMENT,
    type: TabCategoryConstants.PRINTER,
    iconName: 'fa fa-file-text-o',
    title: 'document printer',
    active: false
  };

  /* SYSTEM */
  initialTabCategories[TabCategoryConstants.SYSTEM] = {};
  initialTabCategories[TabCategoryConstants.SYSTEM][TabItemConstants.SYSTEM_SETTING] = {
    name: TabItemConstants.SYSTEM_SETTING,
    type: TabCategoryConstants.SYSTEM,
    iconName: '',
    title: 'application setting',
    active: false
  };

  return initialTabCategories;
}

/**
 *
 * @return {{categories: ({managers, printers, system}|*), title: *}}
 * @private
 */
function _getDefaultValues() {
  var categories = _getInitialTabCategories();
  categories[TabCategoryConstants.MANAGER][TabItemConstants.MANAGER_PRODUCT].active = true;
  var defaultValues = {
    categories: categories,
    title: categories[TabCategoryConstants.MANAGER][TabItemConstants.MANAGER_PRODUCT].title
  };
  return defaultValues;
}

/**
 *
 * @param item
 * @return {{managers, printers, system}|*}
 * @private
 */
function _selectTabItem(item) {
  _tabCategories = _getInitialTabCategories();
  _tabCategories[item.type][item.name].active = true;
  _title = _tabCategories[item.type][item.name].active ? _tabCategories[item.type][item.name].title : "";
  return _tabCategories;
}

var SidebarStore = assign({}, EventEmitter.prototype, {

  /**
   *
   * @return {{managers, printers, system}|*}
   */
  getTabCategories: function() {
    return _tabCategories;
  },

  /**
   *
   * @return {string}
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

SidebarStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case NavigatorConstants.NAVIGATOR_SELECT_SIDEBAR_TAB_ITEM:
      _selectTabItem(action.item);
      SidebarStore.emitChange();
      break;
  }
});

module.exports = SidebarStore;