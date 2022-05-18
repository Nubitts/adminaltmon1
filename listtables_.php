<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$hash = $header1->hash_;

$Query = "select idproducer , key_hm, name_, MiddleName, LastName, Key_Inca, Group_,NameGroup, division, DivName, zone, status_ from producers where Status_ = 1";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = "select keyhm, keyinca, producer, keytable, period from vTables";
} else {

  $Query1 = "select '' as keyhm, '' as keyinca, '' as producer, 0 as keytable, '' as period ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
