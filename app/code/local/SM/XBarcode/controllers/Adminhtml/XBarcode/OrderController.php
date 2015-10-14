<?php
/**
* Created by huypq@smartosc.
* Date: 10/15/2015
* Time: 1:28 AM
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

class SM_XBarcode_Adminhtml_XBarcode_OrderController extends Mage_Adminhtml_Controller_Action {
  public function indexAction() {
    $responseBody = ($this->getRequest()->getParam('id') && $this->getRequest()->getParam('id') != '') ?
      Mage::getModel("xBarcode/order")->getJSONOrderById($this->getRequest()->getParam('id')) :
      Mage::getModel("xBarcode/order")->getJSONAllOrders(1);
    $this->getResponse()->setBody($responseBody);
  }
}
