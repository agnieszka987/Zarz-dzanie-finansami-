<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT id_grupy, login FROM Grupy");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_grupy":"'  . $rs["id_grupy"] . '",';
    $outp .= '"login":"'  . $rs["login"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>
