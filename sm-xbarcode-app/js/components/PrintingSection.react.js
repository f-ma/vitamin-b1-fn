var React = require('react');
var classNames = require('classnames');
var PrintingStore = require('./../stores/ui/PrintingSectionStore');
var PrinterActions = require('./../actions/PrinterActions');
var BarcodeConstants = require('./../constants/BarcodeConstants');
var PrintingSectionConstants = require('./../constants/PrintingSectionConstant');
var BarcodeStore = require('./../stores/barcode/BarcodeStore');

function _getState() {
  return {
    active: PrintingStore.getIsActivated(),
    isProductBarcodeRenderingComplete: BarcodeStore.getIsProductBarcodeRenderingComplete(),
    totalNumberProductBarcodeOnQueue: BarcodeStore.getTotalNumberProductBarcodeOnQueue(),
    totalNumberProductBarcodeRendered: BarcodeStore.getTotalNumberProductBarcodeRendered()
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
  },

  componentWillMount: function() {
    PrintingStore.removeChangeListener(this._onchange);
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
  _appendProductBarcode: function(barcode) {
    $('#' + BarcodeConstants.HtmlId.PRODUCT_BARCODE_CONTAINER).append(barcode);
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
    this._appendProductBarcode(PrintingStore.getCurrentAddedProductBarcode());
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