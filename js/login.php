<?php

//include('config.php');
/*
$DB_host = "v-ie.uek.krakow.pl";
$DB_user = "s173529";
$DB_pass = "Parkowa3";
$DB_name = "s173529";
*/
$conn = mysqli_connect($DB_host, $DB_user, $DB_pass, $DB_name);
if(!$conn){
	die("Connection failed: " .mysqli_connecet_error());
}

$showData = "SELECT login FROM uzytkownicy";
$data = array();
$result = mysqli_query($conn, $showData);

if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result)){
		$data[] = $row;
	}
} else {
	echo "0 results";
}; 
print json_encode($result); 

/*

require_once 'config.php';

global $DBcon;

$stmt = $DBcon->prepare("SELECT login, haslo from uzytkownicy WHERE login='".$_POST['user_login']."' && haslo='".$_POST['user_haslo']."'");
$stmt->execute();
$row = $stmt->rowCount();
if ($row > 0){
    echo "correct";
} else{
    echo 'wrong';
}
*/
?>