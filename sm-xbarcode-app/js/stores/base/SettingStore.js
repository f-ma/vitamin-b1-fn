var AppDispatcher = require("../../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var SettingConstants = require('../../constants/base/SettingConstants');
var assign = require('object-assign');
var keyMirror = require('keymirror');

var CHANGE_EVENT = 'change';

var _data = {};

function _setData(data) {
  _data = data;
}

var SettingStore = assign({}, EventEmitter.prototype, {
  /**
   *
   * @returns {*}
   */
  getSettingData: function(codeName) {
    return (codeName) ? _data[codeName] : _data;
  },

  getMergedSettingData: function(data) {
     return assign({}, _data, data);
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

SettingStore.dispatchToken = AppDispatcher.register(function(payloads) {
  switch(payloads.actionType) {
    case SettingConstants.SETTING_GET:
      _setData(payloads.data);
      SettingStore.emitChange();
      break;
    case SettingConstants.SETTING_UPDATE:
      _setData(payloads.data);
      SettingStore.emitChange();
      break;
  }
});

module.exports = SettingStore;
