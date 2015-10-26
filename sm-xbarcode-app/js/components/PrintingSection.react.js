"use strict";

var React = require('react');
var classNames = require('classnames');
var PrintingStore = require('./../stores/ui/PrintingSectionStore');
var PrinterActions = require('./../actions/PrinterActions');
var BarcodeConstants = require('./../constants/BarcodeConstants');
var PrintingSectionConstants = require('./../constants/PrintingSectionConstant');
var BarcodeStore = require('./../stores/barcode/BarcodeStore');
var SettingStore = require('./../stores/base/SettingStore');
var SettingConstants = require('./../constants/base/SettingConstants');

function _getState() {
  return {
    active: PrintingStore.getIsActivated(),
    isProductBarcodeRenderingComplete: BarcodeStore.getIsBarcodeRenderingComplete(),
    totalNumberProductBarcodeOnQueue: BarcodeStore.getTotalNumberBarcodeOnQueue(),
    totalNumberProductBarcodeRendered: BarcodeStore.getTotalNumberBarcodeRendered()
  };
}
var PrintingSection = React.createClass({
  propTypes: {

  },

  getInitialState: function() {
    return _getState();
  },

  componentDidMount: function() {
    PrintingStore.addChangeListener(this._onchange);
    PrintingStore.addPushListener(this._onPush)
  },

  componentWillMount: function() {
    PrintingStore.removeChangeListener(this._onchange);
    PrintingStore.removePushListener(this._onPush);
  },

  render: function() {
    return (
      <section id="printing-section" className={classNames({active: this.state.active})} onClick={this._handleSectionOnClick}>
        <div className={classNames('printer')} onClick={this._handlePrinterOnClick}>
          <header className={classNames('bar')}>
            <div className={classNames('title')}>
              <span id={BarcodeConstants.HtmlId.RENDERING_STATUS_TITLE}>{PrintingSectionConstants.RENDERING_HEADER_TITLE}</span>
              <strong><span id={BarcodeConstants.HtmlId.RENDERING_STATUS_RENDERED_NUMBER}></span></strong>
            </div>
            <div id={BarcodeConstants.HtmlId.RENDERING_STATUS_BAR} className={classNames('progress-bar')}></div>
          </header>
          <div id={BarcodeConstants.HtmlId.PRODUCT_BARCODE_CONTAINER}></div>
          <button className={classNames('btn', 'btn-blue')} onClick={this._handlePrintButtonOnClick}><strong>PRINT</strong></button>
        </div>
      </section>
    );
  },

  /**
   *
   * @param barcode <canvas /> element, <img /> element
   * @private
   */
  _appendProductBarcode: function(item) {
    if (item !== null) {
      console.log(item);
      console.log(item.canvas);
      var frame = '';
      var leftSide = '', leftSideTop = '', leftSideBottom = '';
      var central = '', centralTop = '', centralBarcode = '', centralBottom = '';
      var rightSide = '', rightSideTop = '', rightSideBottom = '';

      frame = $("<div>", {class: "frame"});

      leftSide = $("<div>", {
        class: "side left"
      });

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_LEFT).value) {
        case 'name':
          leftSideTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          leftSideTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_LEFT).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_LEFT).value]}));
          break;
      }

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_LEFT).value) {
        case 'name':
          leftSideBottom = $("<div>", {
            class: "bottom"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          leftSideBottom = $("<div>", {
            class: "bottom"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_LEFT).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_LEFT).value]}));
          break;
      }

      leftSide.append(leftSideTop);
      leftSide.append(leftSideBottom);

      rightSide = $("<div>", {
        class: "side right"
      });

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_RIGHT).value) {
        case 'name':
          rightSideTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          rightSideTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_RIGHT).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_RIGHT).value]}));
          break;
      }

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_RIGHT).value) {
        case 'name':
          rightSideBottom = $("<div>", {
            class: "bottom"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          rightSideBottom = $("<div>", {
            class: "bottom"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_RIGHT).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_RIGHT).value]}));
          break;
      }
      rightSide.append(rightSideTop);
      rightSide.append(rightSideBottom);


      central = $("<div>", {class: "central"});

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_MIDDLE).value) {
        case 'name':
          centralTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          centralTop = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_MIDDLE).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_TOP_MIDDLE).value]}));
          break;
      }


      central.append(centralTop).append($("<div>", {class: "barcode"}).append(item.canvas));

      switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_MIDDLE).value) {
        case 'name':
          centralBottom = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "value", text: item.product.name}));
          break;
        case 'price':

          break;
        default:
          centralBottom = $("<div>", {
            class: "top"
          }).
            append($("<span>", {class: "label", text: SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_MIDDLE).value})).
            append($("<span>", {class: "value", text: item.product[SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_TEMPLATE_BOTTOM_MIDDLE).value]}));
          break;
      }

      central.append(centralBottom);

      frame = $("<div>", {class: "frame"}).append(leftSide).append(central).append(rightSide);

      $('#' + BarcodeConstants.HtmlId.PRODUCT_BARCODE_CONTAINER).append(frame);
    }
  },

  /**
   *
   * @private
   */
  _updateProgressBar: function() {
    var progressBarWidth = 100 * (this.state.totalNumberProductBarcodeRendered) / this.state.totalNumberProductBarcodeOnQueue;
    $('#' + BarcodeConstants.HtmlId.RENDERING_STATUS_BAR).width(progressBarWidth + '%');
  },

  /**
   *
   * @private
   */
  _updateStatusTitle: function() {
    if (this.state.isProductBarcodeRenderingComplete) {
      $('#' + BarcodeConstants.HtmlId.RENDERING_STATUS_TITLE).text(PrintingSectionConstants.RENDERING_DONE_HEADER_TITLE);
    } else {
      $('#' + BarcodeConstants.HtmlId.RENDERING_STATUS_TITLE).text(PrintingSectionConstants.RENDERING_HEADER_TITLE);
    }
    $('#' + BarcodeConstants.HtmlId.RENDERING_STATUS_RENDERED_NUMBER).text(' (' + this.state.totalNumberProductBarcodeRendered + '/' + this.state.totalNumberProductBarcodeOnQueue + ')');
  },

  _onchange: function() {
    this.setState(_getState());
    this._updateProgressBar();
    this._updateStatusTitle();
  },

  _onPush: function() {
    this.setState(_getState());
    var currentAddedProductBarcode = PrintingStore.getCurrentAddedProductBarcode();
    this._appendProductBarcode(currentAddedProductBarcode);
    this._updateProgressBar();
    this._updateStatusTitle();
  },

  _handleSectionOnClick: function(event) {
    event.stopPropagation();
    PrinterActions.hide();
  },

  _handlePrinterOnClick: function(event) {
    event.stopPropagation();
  },

  _handlePrintButtonOnClick: function(event) {
    event.stopPropagation();
    window.print();
  }
});

module.exports = PrintingSection;