<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Zakupy (id_uzytkownika, id_grupy, nazwa, koszt, data_zakupu) VALUES('$data->id_uzytkownika','$data->id_grupy','$data->shoppingProduct','$data->shoppingPrice', '$data->shoppingDate')");

$conn->close();

echo json_encode($result);

?>