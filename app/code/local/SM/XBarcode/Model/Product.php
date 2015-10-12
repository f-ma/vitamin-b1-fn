<?php
class SM_XBarcode_Model_Product {
  const PRODUCT_THUMBNAIL_WIDTH = 60;
  const PRODUCT_THUMBNAIL_HEIGHT = 90;

  protected function _prepareProductCollection() {
    $collection = Mage::getModel('catalog/product')->getCollection();
    $collection->addAttributeToSelect(array(
      'entity_id',
      'type_id',
      'sku',
      'name',
      'thumbnail'
    ));

    return $collection;
  }

  public function getStoreNames($product) {
    $stores = array();
    foreach($product->getStoreIds() as $storeId) {
      array_push($stores, array("name"=>Mage::app()->getStore($storeId)->getName()));
    }

    return $stores;
  }

  public function getThumbnailUrl($product) {
    $thumbnailUrl = '';
    try {
      $thumbnailUrl = (string)Mage::helper('catalog/image')->init($product, 'thumbnail')->resize(self::PRODUCT_THUMBNAIL_WIDTH,self::PRODUCT_THUMBNAIL_HEIGHT);
    } catch(Exception $e) {
      Mage::log('Image '.$e->getMessage(), null, 'image_exception.log');
    }
    return $thumbnailUrl;
  }

  protected function _prepareProductData($productCollection) {
    $data = array();

    foreach ($productCollection as $product) {
      $stores = $this->getStoreNames($product);
      $thumbnailUrl = $this->getThumbnailUrl($product);

      array_push($data, array(
        "id" => $product->getId(),
        "name" => $product->getName(),
        "sku" => $product->getSku(),
        "type_id" => $product->getTypeId(),
        "stores" => $stores,
        "thumbnail_url" => $thumbnailUrl,
      ));
    }

    return $data;
  }

  public function getJSONProductByBarcode($string) {
    $productCollection = $this->_prepareProductCollection();
    $productCollection->addAttributeToFilter('xbarcode', $string)
    ->setPageSize(1);
    return json_encode($this->_prepareProductData($productCollection));
  }

  public function getJSONProductByEntityId($string) {
    $productCollection = $this->_prepareProductCollection();
    $productCollection->addAttributeToFilter('entity_id', $string)
    ->setPageSize(1);
    return json_encode($this->_prepareProductData($productCollection));
  }

  public function getJSONProductBySku($string) {
    $productCollection = $this->_prepareProductCollection();
    $productCollection->addAttributeToFilter('sku', $string)
    ->setPageSize(1);
    return json_encode($this->_prepareProductData($productCollection));
  }

  public function getJSONProductsByName($string, $limit = 10) {
    $productCollection = $this->_prepareProductCollection();
    $productCollection->addAttributeToFilter('name', array(array('like' => '%'.$string.'%')))
    ->setOrder('name', 'ASC')
    ->setPageSize($limit);
    return json_encode($this->_prepareProductData($productCollection));
  }

  public function getJSONProductsBySearchString($string, $limit = 10) {
    $productCollection = $this->_prepareProductCollection();
    $productCollection
    ->addAttributeToFilter(array(
        array('attribute'=> 'entity_id', 'like' => $string),
        array('attribute'=> 'sku', 'like' => '%'.$string.'%'),
        array('attribute'=> 'name','like' => '%'.$string.'%'),
    ))->setOrder('entity_id', 'DESC')
    ->setPageSize($limit);
    return json_encode($this->_prepareProductData($productCollection));
  }

  public function getJSONAllProducts($limit = 10) {
    $productCollection = $this->_prepareProductCollection()
    ->setOrder('entity_id', 'DESC')
    ->setPageSize($limit);
    return json_encode($this->_prepareProductData($productCollection));
  }
}
