<?php
class SM_XBarcode_Model_Order {
  const Order_THUMBNAIL_WIDTH = 60;
  const Order_THUMBNAIL_HEIGHT = 90;

  protected function _prepareOrderCollection() {
    $collection = Mage::getModel('sales/order')->getCollection();
    $collection->addFieldToSelect(array(
      'entity_id',
      'increment_id',
      'status',
      'base_grand_total',
      'customer_firstname',
      'customer_lastname',
      'store_name'
    ));
    return $collection;
  }

  public function getCustomerName($order) {
    return ($order->getCustomerFirstname() . ' ' . $order->getCustomerLastname());
  }

  public function getOrderItems($order) {
    $items = $order->getAllItems();
    $data = array();
    foreach ($item as $item) {

      array_push($data, array(

      ));
    }
  }

  protected function _prepareOrderItemData($order) {
    $data = [];
    foreach ($order->getAllItems() as $item) {
      $itemData = array(
        "id" => $item->getId(),
        "qty_ordered" => $item->getQtyOrdered(),
        "qty_shipped" => $item->getQtyShipped(),
        "qty_invoiced" => $item->getQtyInvoiced(),
        "qty_refunded" => $item->getQtyRefunded(),
        "qty_canceled" => $item->getQtyCanceled(),
        "product_id" => $item->getProductId(),
        "product_type" => $item->getProductType(),
        "name" => $item->getName(),
        "sku" => $item->getSku(),
      );
      array_push($data, $itemData);
    }
    return $data;
  }

  protected function _prepareOrderData($orderCollection) {
    $data = array();

    foreach ($orderCollection as $order) {
      $customerName = $this->getCustomerName($order);
      $itemData = $this->_prepareOrderItemData($order);
      array_push($data, array(
        "id" => $order->getId(),
        "increment_id" => $order->getIncrementId(),
        "status" => $order->getStatus(),
        "base_gt" => $order->getBaseGrandTotal(),
        "customer_name" => $customerName,
        "store_name" => $order->getStoreName(),
        "items" => $itemData,
      ));
    }

    return $data;
  }

  public function getJSONOrderById($string) {
    $orderCollection = $this->_prepareOrderCollection();
    $orderCollection->addFieldToFilter(
      array('increment_id', 'entity_id'),
      array(array('eq'=>$string), array('eq'=>$string))
      )->setOrder('entity_id', 'DESC')
      ->setPageSize(1);
    return json_encode($this->_prepareOrderData($orderCollection));
  }

  public function getJSONOrderByEntityId($string) {
    $orderCollection = $this->_prepareOrderCollection();
    $orderCollection->addFieldToFilter('entity_id', $string)
    ->setPageSize(1);
    return json_encode($this->_prepareOrderData($orderCollection));
  }

  public function getJSONOrderByIncrementId($string) {
    $orderCollection = $this->_prepareOrderCollection();
    $orderCollection->addFieldToFilter('increment_id', $string)
    ->setPageSize(1);
    return json_encode($this->_prepareOrderData($orderCollection));
  }

  public function getJSONAllOrders($limit = 1) {
    $orderCollection = $this->_prepareOrderCollection()
    ->setOrder('entity_id', 'DESC')
    ->setPageSize($limit);
    return json_encode($this->_prepareOrderData($orderCollection));
  }
}
