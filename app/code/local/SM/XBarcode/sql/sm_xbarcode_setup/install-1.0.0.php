<?php

$installer = $this;

$installer->startSetup();

$table = $installer->getConnection()
    ->newTable($installer->getTable('xBarcode/setting'))
    ->addColumn('id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
        'identity'  => true,
        'unsigned'  => true,
        'nullable'  => false,
        'primary'   => true,
        ), 'Id')
    ->addColumn('code_name', Varien_Db_Ddl_Table::TYPE_VARCHAR, null, array(
        'nullable'  => false,
    ), 'Code Name')
    ->addColumn('label', Varien_Db_Ddl_Table::TYPE_VARCHAR, null, array(
        'nullable'  => false,
    ), 'Label')
    ->addColumn('description', Varien_Db_Ddl_Table::TYPE_VARCHAR, null, array(
        'nullable'  => true,
    ), 'Label')
    ->addColumn('value', Varien_Db_Ddl_Table::TYPE_VARCHAR, null, array(
        'nullable' => true,
    ), 'Value');

$installer->getConnection()->createTable($table);

$installer->endSetup();
