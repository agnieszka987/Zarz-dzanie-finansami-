<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Zadania (id_uzytkownika, id_grupy, id_zadania_typ, data_od, data_do) VALUES('$data->id_uzytkownika','$data->id_grupy','$data->id_zadania_typ','$data->data_od', '$data->data_do')");

$conn->close();

echo json_encode($result);

?>