<?php
/**
 * I am a model file which implements the logic of our API methods.
 */
class SM_XBarcode_Model_Product_Api extends Mage_Api_Model_Resource_Abstract {
  public function items() {
    $data = array();
    $products = Mage::getModel("catalog/product")
      ->getCollection()
      ->addAttributeToSelect(array(
        "entity_id",
        "sku",
        "name"
      ))
      ->setOrder("entity_id", "DESC")
      ->setPageSize(5);

    foreach ($products as $product) {
      array_push($data, $product->toArray(array("entity_id", "sku", "name")));
    }
    
    return $data;
  }
}
