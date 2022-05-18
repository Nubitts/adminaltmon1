<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$keyinca = $header1->key_inca;
$name = $header1->name;
$middlename = $header1->middlename;
$lastname = $header1->lastname;
$keyalt = $header1->keyalt;

$rinca = $db->fetchAssociative('SELECT count(*) as conteoinca FROM producers WHERE Key_Inca = ?', [$keyinca]);

$inca = reset($rinca);

$ralta = $db->fetchAssociative('SELECT count(*) as conteoalt FROM producers WHERE Key_Hm = ?', [$keyalt]);

$alta = reset($ralta);


if ($inca > 0 && $alta == 0) {

  $count = $db->executeStatement('INSERT producers (Key_Hm, Name_, MiddleName, LastName, Key_Inca, Status_, Zone) Values (?,?,?,?,?,?,?)', [$keyalt, $name, $middlename, $lastname, $keyinca, 1, 5]);

  $count = $db->executeStatement('UPDATE producers a, vOProducers b SET a.Group_ = b.grupo, a.Namegroup = b.nombre_grupo, a.Division = b.Division, a.DivName = b.DivName WHERE a.Key_inca = b.clave', ['']);

  $Query1 = "select idproducer , key_hm, name_, MiddleName, LastName, Key_Inca, Group_,NameGroup, division, DivName, zone, status_ from producers where Status_ = 1";
} else {

  $Query1 = "select 0 as idproducer , ''  as key_hm, '' as name_, '' as MiddleName, '' as LastName, '' as Key_Inca, '' as Group_, '' as NameGroup, 0 as division, '' as DivName, 0 as zone, 0 as status_ ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
