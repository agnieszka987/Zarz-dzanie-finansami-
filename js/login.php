<?php
$servername = "v-ie.uek.krakow.pl";
$username = "s173529";
$password = "Parkowa3";
$dbname = "s173529";

$conn = mysqli_connect($servername, $username, $password, $dbname);
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
mysqli_close($conn);
?>