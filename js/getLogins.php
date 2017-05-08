<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT login, id_uzytkownika FROM Uzytkownicy WHERE id_grupy = '$data->id_grupy'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_grupy":"'  . $rs["id_grupy"] . '",';
    $outp .= '"login":"'. $rs["login"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>
