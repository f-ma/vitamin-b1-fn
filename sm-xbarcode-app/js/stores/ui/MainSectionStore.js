"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NavigatorConstants = require('../../constants/NavigatorConstants');
var MainSectionConstants = require('../../constants/MainSectionConstants');
var TabCategoryContants = require('../../constants/TabCategoryConstants');
var TabItemContants = require('../../constants/TabItemConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _subject = MainSectionConstants.MAIN_SECTION_MANAGERS_PRODUCTS;

function _setSubject(sidebarTabItem) {
  switch (sidebarTabItem.type) {
    case TabCategoryContants.MANAGER:
      switch (sidebarTabItem.name) {
        case TabItemContants.MANAGER_PRODUCT:
          if (_subject !== MainSectionConstants.MAIN_SECTION_MANAGERS_PRODUCTS) {
            _subject = MainSectionConstants.MAIN_SECTION_MANAGERS_PRODUCTS;
            MainSectionStore.emitChange();
          }
          break;
        case TabItemContants.MANAGER_ORDER:
          if (_subject !== MainSectionConstants.MAIN_SECTION_MANAGERS_ORDERS) {
            _subject = MainSectionConstants.MAIN_SECTION_MANAGERS_ORDERS;
            MainSectionStore.emitChange();
          }
          break;
      }
      break;
    case TabCategoryContants.PRINTER:
      switch (sidebarTabItem.name) {
        case TabItemContants.PRINTER_BARCODE:
          if (_subject !== MainSectionConstants.MAIN_SECTION_PRINTERS_BARCODES) {
            _subject = MainSectionConstants.MAIN_SECTION_PRINTERS_BARCODES;
            MainSectionStore.emitChange();
          }
          break;
        case TabItemContants.PRINTER_DOCUMENT:
          _subject = MainSectionConstants.MAIN_SECTION_PRINTERS_DOCUMENTS;
          MainSectionStore.emitChange();
          break;
      }
      break;
    case TabCategoryContants.SYSTEM:
      switch (sidebarTabItem.name) {
        case TabItemContants.SYSTEM_SETTING:
          if (_subject !== MainSectionConstants.MAIN_SECTION_SYSTEM_SETTINGS) {
            _subject = MainSectionConstants.MAIN_SECTION_SYSTEM_SETTINGS;
            MainSectionStore.emitChange();
          }
          break;
      }
  }
}

var MainSectionStore = assign({}, EventEmitter.prototype, {
  getSubject: function() {
    return _subject;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

MainSectionStore.dispatchToken = AppDispatcher.register(function(payloads) {
  switch (payloads.actionType) {
    case NavigatorConstants.NAVIGATOR_SELECT_SIDEBAR_TAB_ITEM:
      _setSubject(payloads.item);
      break;
  }
});

module.exports = MainSectionStore;