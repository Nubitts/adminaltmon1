<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$hash = $header1->hash_;

$Query = "select productores,tablas from vsquaresdashb ";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = "select productores,tablas, movimientos from vsquaresdashb ";
} else {

  $Query1 = "select '0' as productores,0 as tablas, 0 as movimientos ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
