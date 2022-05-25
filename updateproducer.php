<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$Field = $header1->Field;
$Newvalue = $header1->Newvalue;
$Oldvalue = $header1->Oldvalue;
$IdProd = $header1->IdProd;

$db->update('producers', [$Field => $Newvalue], ['idproducer' => $IdProd]);

if ($Field == 'Key_Hm') {
  $db->update('tables_', ['KeyHm' => $Newvalue], ['KeyHm' => $Oldvalue]);
}


$Query = "select idproducer , key_hm, name_, MiddleName, LastName, Key_Inca, Group_,NameGroup, division, DivName, zone, status_ from producers where Status_ = 1";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = "select idproducer , key_hm, name_, MiddleName, LastName, Key_Inca, Group_,NameGroup, division, DivName, zone, status_ from producers where Status_ = 1";
} else {

  $Query1 = "select 0 as idproducer , ''  as key_hm, '' as name_, '' as MiddleName, '' as LastName, '' as Key_Inca, '' as Group_, '' as NameGroup, 0 as division, '' as DivName, 0 as zone, 0 as status_ ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
