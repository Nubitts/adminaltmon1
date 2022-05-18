<?php

include('./connecto.php');


$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$keyhm = $header1->keyhm;
$filter = $header1->filter;

$filterc = "";

if (strlen(trim($filter)) > 0) {
  $filterc = " and " . $filter;
}



$Query = "select ticket, ciclo, tabla, fletero, neto, descto, liquido, Entrada, salida, quema, tipo from vMovementsntlnk where clave = " . $keyhm . " " . $filterc . " order by salida desc";
$Query1 = "";


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = $Query;
} else {

  $Query1 = "select 0 as ticket, '' as ciclo, 0 as tabla, 0 as fletero, 0 as neto, 0 as descto, 0 as liquido, '' as Entrada, '' as salida, '' as quema, '' as tipo";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();



echo json_encode($movi);
