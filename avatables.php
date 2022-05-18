<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$idprod = $header1->idprod;

$keyinca = $db->fetchOne('SELECT Key_Inca FROM vproducersactive WHERE Key_Hm = ' . $idprod, [1], [0]);

$Query = "select tabla from vAvaliablestabl where keyinca = " . $keyinca;
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = $Query;
} else {

  $Query1 = "select 0 as tabla";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
