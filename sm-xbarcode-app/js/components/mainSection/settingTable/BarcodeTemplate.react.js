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
        interact('.el-drag-drop')
            .draggable(true);
    },

    componentWillUnmount: function () {

    },

    render: function() {
        return (
            <div className={classNames('setting-barcode-template setting-group')}>
                <div className={classNames('label')}>
                    BARCODE TEMPLATE
                </div>
                <div className={classNames('drag-drop')}>
                    <div className={classNames('action-zone')}>
                        <div className={classNames('side')}>
                            <div className={classNames('')}></div>
                        </div>
                        <div className={classNames('center')}>
                            <span>BARCODE</span>
                        </div>
                        <div className={classNames('side')}></div>
                    </div>
                    <div className={classNames('element-zone')}>
                        <div className={classNames('el-drag-drop')}>DRAG ME</div>
                    </div>
                </div>
            </div>
        );
    }


});

module.exports = BarcodeTemplate;