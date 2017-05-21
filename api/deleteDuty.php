<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("DELETE FROM Zadania WHERE id_zadania = '$data->id_zadania'");

$conn->close();

echo json_encode($result);

?>