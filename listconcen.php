<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$filter = $header1->filter;

$filterc = "";

if (strlen(trim($filter)) > 0) {
  $filterc = " where " . $filter;
}

$Query = "select key_hm, producer, sum(neto) as neto, sum(descto) as descto, sum(liquido) as liquido from vMovements " . $filterc . " group by key_hm, producer";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = $Query;
} else {

  $Query1 = "select 0 as key_hm, '' as producer, 0 as neto, 0 as descto, 0 as liquido";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
