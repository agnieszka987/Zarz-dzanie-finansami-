<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("INSERT INTO Koszty_wsp (id_grupy, id_koszt_wsp_typ, data_od, data_do, koszt) VALUES('$data->id_grupy','$data->id_koszt_wsp_typ','$data->data_od', '$data->data_do', '$data->koszt')");

$conn->close();

echo json_encode($result);

?>