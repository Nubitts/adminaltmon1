<?php
$servername = "192.168.1.226:3306";
$username = "luis";
$password = "admin";

// Create connection
$cona = new mysqli($servername, $username, $password);

// Check connection
if ($cona->connect_error) {
    die("Connection failed: " . $conn->connect_error);
};
