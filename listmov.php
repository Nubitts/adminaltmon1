<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$hash = $header1->hash_;

$Query = "select dout, key_hm, producer, neto, descto, liquido, tipo from vGMovements1";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = "select dout, key_hm, producer, neto, descto, liquido, tipo from vGMovements1";
} else {

  $Query1 = "select '' as dout, 0 as key_hm, '' as producer, 0 as neto, 0 as descto, 0 as liquido, '' as tipo";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
