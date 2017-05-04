<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Grupy (login, haslo) VALUES('$data->login','$data->password')");

$result1 = $conn->query("SELECT id_grupy FROM Grupy WHERE login = '$data->login' AND haslo = '$data->password'");

$outp = "";


while($rs = $result1->fetch_array(MYSQLI_ASSOC)) {
	$id_grupy = $rs["id_grupy"];

    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_grupy":"'  . $rs["id_grupy"] . '"}';
}

$result2 = $conn->query("UPDATE Uzytkownicy SET id_grupy = '$id_grupy' WHERE login = '$data->username'");

$outp ='{"records":['.$outp.'], "resultUpdUzy": '. $result2 . ', "resultInsGr": ' . $result . '}';


$conn->close();

echo json_encode($outp);

?>