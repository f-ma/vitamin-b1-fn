<?php

class SM_XBarcode_Model_Setting extends Mage_Core_Model_Abstract
{
  protected function _construct()
  {
    $this->_init('xBarcode/setting');
  }

  protected function _prepareSettingCollection() {
    $collection = Mage::getModel('xBarcode/setting')->getCollection();
    $collection->addFieldToSelect('*');

    return $collection;
  }

  protected function _prepareSettingData($settingCollection) {
    $data = array();

    foreach ($settingCollection as $setting) {
      $data[$setting->getCodeName()] = array(
        "id" => $setting->getid(),
        "code_name" => $setting->getCodeName(),
        "label" => $setting->getLabel(),
        "description" => $setting->getDescription(),
        "value" => $setting->getValue()
      );
    }

    return $data;
  }

  public function getJSONAllSettings() {
    $settingCollection = $this->_prepareSettingCollection()
    ->setOrder('id', 'DESC');

    return json_encode($this->_prepareSettingData($settingCollection));
  }
}
