<?php

$settings = array(
    array(
        'label' => 'Default Symbology',
        'code_name' => 'symbology_global_default',
        'description' => 'The default barcode symbology',
        'value' => 'CODE128',
    ),
    array(
        'label' => 'Search Symbology',
        'code_name' => 'symbology_search_default',
        'description' => 'The default product searching, order searching barcode symbology',
        'value' => 'CODE128',
    ),
    array(
        'label' => 'Preview Symbology',
        'code_name' => 'symbology_preview_default',
        'description' => 'The product\'s previewing barcode symbology on filter tables',
        'value' => 'CODE128',
    ),
    array(
        'label' => 'Product Attribute for Barcode Generating',
        'code_name' => 'product_barcode_generating_attribute',
        'description' => 'Notice that some barcode symbologies support ONLY numeric character',
        'value' => 'CODE128',
    ),
);

foreach ($settings as $setting) {
    Mage::getModel('xBarcode/setting')
        ->setData($setting)
        ->save();
}
