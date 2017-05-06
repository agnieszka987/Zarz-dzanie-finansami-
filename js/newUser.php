<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Uzytkownicy (imie, nazwisko, login, haslo, email) VALUES('$data->name','$data->surname','$data->username','$data->password','$data->email')");

$conn->close();

echo json_encode($result);

?>