<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$keyhm = $header1->keyhm;
$addtab = $header1->addtab;

$keyinca = $db->fetchOne('SELECT Key_Inca FROM vproducersactive WHERE Key_Hm = ' . $keyhm, [1], [0]);

$idharvest = $db->fetchOne('SELECT IdHarvest FROM harvest WHERE Status_ = 1', [1], [0]);


if ($keyinca > 0) {

  $count = $db->executeStatement('INSERT tables_ (Keyinca, KeyHm, KeyTable, IdHarvest) Values (?,?,?,?)', [$keyinca, $keyhm, $addtab, $idharvest]);

  $Query1 = "select keyhm, keyinca, producer, keytable, period from vTables";
} else {

  $Query1 = "select 0 as keyhm, 0 as keyinca, '' as producer, 0 as keytable, 0 as period";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
