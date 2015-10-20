<?php
class SM_XBarcode_Model_Resource_Setting_Collection extends Mage_Core_Model_Resource_Db_Collection_Abstract
{
    public function _construct()
    {
        $this->_init('xBarcode/setting');
    }
}
