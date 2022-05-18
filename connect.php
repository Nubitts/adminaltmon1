<?php

require 'vendor/autoload.php';

use Doctrine\DBAL\DriverManager;


$connectionParams = array(
  'dbname' => 'cred_campo',
  'user' => 'luis',
  'password' => 'admin',
  'host' => '192.168.1.226:3306',
  'driver' => 'pdo_mysql',
);
$con = Doctrine\DBAL\DriverManager::getConnection($connectionParams);
