<?php

/*$servername = "v-ie.uek.krakow.pl";
$username = "s173529";
$password = "Parkowa3";
$dbname = "s173529"; */
$DB_host = "v-ie.uek.krakow.pl";
$DB_user = "s173529";
$DB_pass = "Parkowa3";
$DB_name = "s173529";

global $DBcon;

try {
	$DBcon = new PDO("mysql:host=149.156.208.36;dbname=s173529","s173529","Parkowa3");
   // $DBcon = new PDO("mysql:host={$DB_host};dbname={$DB_name}",$DB_user,$DB_pass);
    $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
    {
      echo "Error: " . $e->getMessage();
    }
 


?>


