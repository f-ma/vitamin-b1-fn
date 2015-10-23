"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EncoderConstants = require('./constants/EncoderConstant');
var assign = require('object-assign');

var PrintingSectionStore = require('./../ui/PrintingSectionStore');
var BarcodeConstants = require('./../../constants/BarcodeConstants');
var SettingStore = require('./../base/SettingStore');
var SettingConstants = require('./../../constants/base/SettingConstants');

/** Individual encoders declaration */
var CODE128 = require('./encoders/CODE128');
var CODE39 = require('./encoders/CODE39');

/**
 *
 * @type {string}
 */
var CHANGE_EVENT = 'change';

/**
 * The default options
 * @type {{width: number, height: number, quite: number, format: string, displayValue: boolean, font: string, textAlign: string, fontSize: number, backgroundColor: string, lineColor: string}}
 * @private
 */
var _options = {
  width: 2,
  height:	100,
  quite: 10,
  format:	EncoderConstants.ENCODERS[SettingStore.getSettingData(SettingConstants.CodeName.DEFAULT_GLOBAL_SYMBOLOGY).value],
  displayValue: true,
  font: "monospace",
  textAlign: "center",
  fontSize: 13,
  backgroundColor: "",
  lineColor: "#000"
};

/**
 *
 * @type {boolean}
 * @private
 */
var _isRenderingBarcodes = false;

/**
 *
 * @type {Array}
 * @private
 */
var _barcodeRenderQueue = [];


/**
 *
 * @type {number}
 * @private
 */
var _totalNumberBarcodeRendered = 0;

/**
 *
 * @type {boolean}
 * @private
 */
var _isBarcodeRenderingComplete = true;


/**
 *
 * @param item
 * @private
 */
function _push(item) {
  _barcodeRenderQueue.push(item);
}

/**
 *
 * @param options
 * @returns {*}
 * @private
 */
function _setDefaultOptions(options) {
  return assign(_options, options);
}

/**
 *
 * @param target
 * @param string
 * @param options
 * @private
 */
function _drawBarcodeLabel(target, string, options) {
  var x,y, targetContext = target.getContext('2d');
  y = options.height;

  targetContext.font = options.fontSize + "px "+options.font;
  targetContext.textBaseline = "bottom";
  targetContext.textBaseline = 'top';

  if(options.textAlign == "left"){
    x = options.quite;
    targetContext.textAlign = 'left';
  }
  else if(options.textAlign == "right") {
    x = target.width - options.quite;
    targetContext.textAlign = 'right';
  }
  else{ //All other center
    x = target.width / 2;
    targetContext.textAlign = 'center';
  }

  targetContext.fillText(string, x, y);
}

/**
 *
 * @param target
 * @returns {*}
 * @private
 */
function _prepareCanvas(target) {
  var canvas = target;

  /** check if it is a jQuery object */
  if (window.jQuery && canvas instanceof jQuery) {
    // get the DOM element of the object
    canvas = target.get(0);
  }

  /** check if DOM element is a canvas, otherwise it will be probably an image so create a canvas */
  if (!(canvas instanceof HTMLCanvasElement)) {
    canvas = document.createElement('canvas');
  }

  /** Abort if the browser does not support HTML5canvas */
  if (!canvas.getContext) {
    return target;
  }

  return canvas;
}

function _prepareBinary(string, options) {
  switch (options.format) {
    case EncoderConstants.ENCODERS.CODE128:
      var encoder = CODE128.prepare(string);
      /** Abort if the barcode format does not support the content */
      if(!encoder.valid()){
        return null;
      }
      return encoder.encoded();
    case EncoderConstants.ENCODERS.CODE39:
      var encoder = CODE39.prepare(string);
      if (!encoder.valid()) {
        return null;
      }
      return encoder.encoded();
  }
}

var BarcodeStore = assign({}, EventEmitter.prototype, {
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
  },

  getDefaultOptions: function() {
    return _options;
  },

  getMergedOptions: function(options) {
    return assign({}, this.getDefaultOptions(), options);
  },

  getAvailableSymbologies: function() {
    return Object.keys(EncoderConstants.ENCODERS);
  },

  getTotalNumberBarcodeOnQueue: function() {
    var total = 0;
    _barcodeRenderQueue.forEach(function(queueItem, queueItemIndex) {
      total += queueItem.quantity;
    });
    return total;
  },

  getTotalNumberBarcodeQueueItem: function() {
    return _barcodeRenderQueue.length;
  },

  getBarcodeRenderQueueItemByIndex: function(index) {
    return _barcodeRenderQueue[index];
  },

  getTotalNumberBarcodeRendered: function() {
    return _totalNumberBarcodeRendered;
  },


  getIsBarcodeRenderingComplete: function() {
    return _isBarcodeRenderingComplete;
  },

  draw: function(target, string, options) {
    /** Merge the user options with the default */
    var mergedOptions = this.getMergedOptions(options);

    /** Create the target canvas where the barcode will be drawn on */
    var canvas = _prepareCanvas(target);

    /** Get string encode */
    var binary = _prepareBinary(string, mergedOptions);

    /** Get the target context  */
    var canvasContext = canvas.getContext('2d');

    /** Set the width and height of the barcode */
    canvas.width = binary.length * mergedOptions.width + 2 * mergedOptions.quite;

    /**
     * Set extra height if the value is displayed under the barcode.
     * Multiplication with 1.3 to ensure that some characters are not cut in half
     */
    canvas.height = mergedOptions.height + (mergedOptions.displayValue ? mergedOptions.fontSize * 1.3 : 0);

    /** Paint the canvas */
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if(mergedOptions.backgroundColor) {
      canvasContext.fillStyle = mergedOptions.backgroundColor;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    /** Creates the barcode out of the encoded binary */
    canvasContext.fillStyle = mergedOptions.lineColor;
    for (var i=0; i < binary.length; i++) {
      var x = i * mergedOptions.width + mergedOptions.quite;

      if(binary[i] == "1"){
        canvasContext.fillRect(x, 0, mergedOptions.width, mergedOptions.height);
      }
    }

    if(mergedOptions.displayValue){
      _drawBarcodeLabel(canvas, string, mergedOptions);
    }

    //Grab the dataUri from the canvas
    var uri = canvas.toDataURL('image/png');

    /** check if given image is a jQuery object */
    if (window.jQuery && target instanceof jQuery) {
      /** check if DOM element of jQuery selection is not a canvas, so assume that it is an image */
      if (!(target.get(0) instanceof HTMLCanvasElement)) {
        //Put the data uri into the image
        target.attr("src", uri);
      }
    } else if (!(target instanceof HTMLCanvasElement)) {
      // There is no jQuery object so just check if the given image was a canvas, if not set the source attr
      target.setAttribute("src", uri);
    }
  },

  renderBarcodes: function() {
    if (_isRenderingBarcodes) {
      console.log('Previous rendering has not been done...');
      return false;
    }

    _isRenderingBarcodes = true;

    /**
     *
     * @type {BarcodeStore}
     */
    var self = this;

    /**
     *
     * @type {number}
     */
    var queueItemIndex = 0;

    /**
     * Index
     * @type {number}
     */
    var quantityBishop = 0;

    (function _goThroughQueueItems() {
      if (queueItemIndex < self.getTotalNumberBarcodeQueueItem()) {
        _isBarcodeRenderingComplete = false;

        var renderItem = self.getBarcodeRenderQueueItemByIndex(queueItemIndex);
        if (!renderItem.isRendered) {
          var barcodeQuantity = renderItem.quantity;
          var barcodeContent = '';
          var canvasIdPrefix = '';
          if (renderItem.product) {
            canvasIdPrefix = renderItem.product.id;
            switch (SettingStore.getSettingData(SettingConstants.CodeName.PRODUCT_BARCODE_GENERATING_ATTRIBUTE).value) {
              case 'ID':
                barcodeContent = renderItem.product.id;
                break;
              case 'SKU':
                barcodeContent= renderItem.product.sku;
                break;
              default:
                barcodeContent = renderItem.product.id;
                break;
            }
          } else if (renderItem.anonymous) {
            canvasIdPrefix = renderItem.anonymous.id;
            barcodeContent = renderItem.anonymous.content;
          } else {
            console.error('Null barcode value given');
            return false;
          }

          (function _run(){

            if (quantityBishop < barcodeQuantity) {

              /** Create a new product barcode canvas */
              var newCanvas = $('<canvas/>', {'id': canvasIdPrefix + BarcodeConstants.HtmlId.DELIMITER + quantityBishop});
              /** Draw barcode's bars on top of the new product barcode canvas  */
              self.draw(newCanvas, barcodeContent, renderItem.options);

              /** Add the new product barcode canvas to printing section container */
              PrintingSectionStore.addProductBarcodeItem(newCanvas);

              /** Emit the changing of adding a brand new item to printing barcode container */
              PrintingSectionStore.emitChange();
              quantityBishop++;
              _totalNumberBarcodeRendered++;

              setTimeout(_run, 1);

            } else {
              quantityBishop = 0;
              _isRenderingBarcodes = false;
              renderItem.isRendered = true;

              PrintingSectionStore.emitChange();
              queueItemIndex++;
              setTimeout(_goThroughQueueItems, 1);
            }
          })();
        } else {
          queueItemIndex++;
          setTimeout(_goThroughQueueItems, 1);
        }
      } else {
        _isBarcodeRenderingComplete = true;
        PrintingSectionStore.emitChange();
      }
    })();
  }
});

BarcodeStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case BarcodeConstants.RENDER_PRODUCT_BARCODE:
      _push(action.item);
      BarcodeStore.renderBarcodes();
      BarcodeStore.emitChange();
      break;
  }
});

module.exports = BarcodeStore;
