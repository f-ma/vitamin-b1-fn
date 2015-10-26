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
    array(
        'label' => 'Top left of Product Barcode',
        'code_name' => 'product_barcode_top_left',
        'description' => 'The top left attribute/value of product barcode',
        'value' => '',
    ),
    array(
        'label' => 'Top middle of Product Barcode',
        'code_name' => 'product_barcode_top_middle',
        'description' => 'The top middle attribute/value of product barcode',
        'value' => '',
    ),
    array(
        'label' => 'Top right of Product Barcode',
        'code_name' => 'product_barcode_top_right',
        'description' => 'The top right attribute/value of product barcode',
        'value' => '',
    ),
    array(
        'label' => 'Bottom left of Product Barcode',
        'code_name' => 'product_barcode_bottom_left',
        'description' => 'The bottom left attribute/value of product barcode',
        'value' => '',
    ),
    array(
        'label' => 'Bottom middle of Product Barcode',
        'code_name' => 'product_barcode_bottom_middle',
        'description' => 'The bottom middle attribute/value of product barcode',
        'value' => '',
    ),
    array(
        'label' => 'Bottom right of Product Barcode',
        'code_name' => 'product_barcode_bottom_right',
        'description' => 'The bottom right attribute/value of product barcode',
        'value' => '',
    )
);

foreach ($settings as $setting) {
    Mage::getModel('xBarcode/setting')
        ->setData($setting)
        ->save();
}
