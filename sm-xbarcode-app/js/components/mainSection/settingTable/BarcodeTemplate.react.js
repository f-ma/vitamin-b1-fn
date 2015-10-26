"use strict";

var React = require('react');
var classNames = require('classnames');
var SettingStore = require('./../../../stores/base/SettingStore');
var interact = require('interact.js');

function _getState() {
  return null;
}

var BarcodeTemplate = React.createClass({
  propTypes: {

  },

  getInitialState: function () {
    return _getState();
  },

  componentWillMount: function() {

  },

  componentDidMount: function () {
    (function(window, undefined){
      interact('.el', {context: document.querySelector('#element-zone')}).draggable({
        max: 1,
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        snap: {

        },
        restrict: {
          restriction: "self",
          endOnly: true
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener
      });

      interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        accept: '.yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.10,

        // listen for drop related events:

        ondropactivate: function (event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
          var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

          // feedback the possibility of a drop
          dropzoneElement.classList.add('drop-target');
          draggableElement.classList.add('can-drop');

          if (dropzoneElement.innerHTML === '') {
            dropzoneElement.innerHTML = draggableElement.dataset.field;
          }

          event.relatedTarget.style.height= event.target.clientHeight +"px";
          event.relatedTarget.style.width= event.target.clientWidth +"px";

          var dropRect = interact.getElementRect(event.target),
            dropCenter = {
              x: dropRect.left + dropRect.width  / 2,
              y: dropRect.top  + dropRect.height / 2
            };


        },
        ondragleave: function (event) {

          // remove the drop feedback style
          event.target.classList.remove('drop-target');
          event.relatedTarget.classList.remove('can-drop');

          event.relatedTarget.style.height= "80px";
          event.relatedTarget.style.width= "180px";
        },
        ondrop: function (event) {
          event.target.classList.add('drop-active');
          event.target.classList.add('drop-target');
          event.target.style.borderColor = "#4d4d4d";

          var relatedTarget = event.relatedTarget;
          relatedTarget.addEventListener("dblclick", function(e) {
            e.target.parentNode.removeChild(e.target);
          });

          var substituteTarget = event.relatedTarget.cloneNode();

          /**
           * Set origin
           */
          substituteTarget.textContent = event.relatedTarget.textContent;
          substituteTarget.style.width = '180px';
          substituteTarget.style.height = '80px';
          substituteTarget.dataset.x = '0';
          substituteTarget.dataset.y = '0';
          substituteTarget.style.transform = 'none';
          substituteTarget.classList.remove('can-drop');

          event.relatedTarget.parentNode.appendChild(substituteTarget);

          event.target.innerHTML = '';
          event.target.appendChild(relatedTarget);
        },
        ondropdeactivate: function (event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
          //event.target.style.borderColor = "transparent";
          event.relatedTarget.style.transform = 'translate(0px, 0px)';
          event.relatedTarget.dataset.x = '0';
          event.relatedTarget.dataset.y = '0';
        },
        ondropmove: function(event) {

        }
      });

      function dragMoveListener (event) {
        var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }

      // this is used later in the resizing and gesture demos
      window.dragMoveListener = dragMoveListener;
    })(window, undefined);
  },

  componentWillUnmount: function () {

  },

  render: function() {
    return (
      <div className="setting-barcode-template setting-group no-select">
        <div className={classNames('label')}>
          PRODUCT BARCODE TEMPLATE
        </div>
        <div className="action-zone" id="action-zone">
          <div className="side">
            <div className="dropzone"></div>
            <div className="dropzone"></div>
          </div>
          <div className="center">
            <div className="top dropzone"></div>
            <div className="barcode no-select">
              <span>BARCODE</span>
            </div>
            <div className="bottom dropzone"></div>
          </div>
          <div className="side">
            <div className="dropzone"></div>
            <div className="dropzone"></div>
          </div>
        </div>
        <div className="element-zone" id="element-zone">
          <div className="el-container">
            <div className="wrapper">
              <div className="el-price el yes-drop drag-drop no-select" data-field="price">price</div>
            </div>
          </div>
          <div className="el-container">
            <div className="wrapper">
              <div className="el-name el yes-drop drag-drop no-select" data-field="name">name</div>
            </div>
          </div>
          <div className="el-container">
            <div className="wrapper">
              <div className="el-name el yes-drop drag-drop no-select" data-field="attribute">attribute</div>
            </div>
          </div>
        </div>
      </div>
    );
  }


});

module.exports = BarcodeTemplate;