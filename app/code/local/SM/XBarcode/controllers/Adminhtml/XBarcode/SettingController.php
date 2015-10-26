<?php
/**
 * Created by huypq@smartosc.
 * Date: 10/20/2015
 * Time: 14:59 PM
 */

/**
 * A backend controller extends another class as the frontend controller.
 * A backend controller always extends from the Mage_Adminhtml_Controller_Action class.
 * This class (Mage_Adminhtml_Controller_Action) adds the security to the controller so that only authenticated users can have access to the controllers actions(s)
 *
 * When we add the configuration in the config.xml file, we WILL extend the controllers folder of the Mage_Adminhtml module with the controllers/Adminhtml folder of our module.
 * With the before="Mage_Adminhtml" option, Magento WILL look for a controller file in the folder of the module. Later, it WILL look in the Mage_Adminhtml module.
 *
 * WARNING: When you create a backend controller for your module, make sure that you add the Adminhtml/Modulename folder in the controllers folder to avoid conflicts with the
 * existing Mage_Adminhtml controllers
 */

 class SM_XBarcode_Adminhtml_XBarcode_SettingController extends Mage_Adminhtml_Controller_Action {
   protected function _validateUrlFormKey($formKey) {
     $sessionFormKey = Mage::getSingleton('core/session')->getFormKey();
     return ($formKey === $sessionFormKey);
   }
   public function indexAction() {
      $this->getResponse()->setBody(Mage::getModel("xBarcode/setting")->getJSONAllSettings());
   }

   public function filterAction() {
     echo Mage::getSingleton('core/session')->getFormKey();
   }

   public function updateAction() {
     if (!$this->_validateUrlFormKey($this->getRequest()->getParam('fk'))) {
       return false;
     }

     $setting = Mage::getModel('xBarcode/setting')->load($this->getRequest()->getParam('id'));
     $setting->setValue($this->getRequest()->getParam('val'));
     $setting->save();
     
     $this->getResponse()->setBody(Mage::getModel("xBarcode/setting")->getJSONAllSettings());
   }
 }
