<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT login, haslo FROM Uzytkownicy");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"login":"'  . $rs["login"] . '",';
    $outp .= '"haslo":"'. $rs["haslo"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>
