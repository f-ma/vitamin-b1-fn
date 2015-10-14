"use strict";

var React = require('react');
var MainStoreConstants = require('../constants/MainSectionConstants');
var classNames = require('classnames');
var ProductTable = require('./mainSection/ProductTable.react');
var OrderTable = require('./mainSection/OrderTable.react');
var SettingTable = require('./mainSection/SettingTable.react');

function _getMainSectionState() {
  return null;
}

var MainSection = React.createClass({

  render: function() {
    switch (this.props.subject) {
      case MainStoreConstants.MAIN_SECTION_MANAGERS_PRODUCTS:
        return (
            <ProductTable key="product-table" />
        );
      case MainStoreConstants.MAIN_SECTION_MANAGERS_ORDERS:
        return (
          <OrderTable key="order-table" />
        );
      case MainStoreConstants.MAIN_SECTION_PRINTERS_BARCODES:
        return (
        /**
         * TODO: render barcode printer component
         */
          <h1>BARCODE PRINTER STANDS HERE!</h1>
        );
      case MainStoreConstants.MAIN_SECTION_PRINTERS_DOCUMENTS:
        return (
        /**
         * TODO: render document printer component
         */
          <h1>DOCUMENT PRINTER STANDS HERE!</h1>
        );
      case MainStoreConstants.MAIN_SECTION_SYSTEM_SETTINGS:
        return (
          <SettingTable key="setting-table" />
        );
    }
  }
});

module.exports = MainSection;