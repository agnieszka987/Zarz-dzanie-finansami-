<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT id_koszt_wsp_typ, nazwa FROM Koszty_wsp_typ WHERE id_grupy = $data->id_grupy");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {    
    if ($outp != "") {$outp .= ",";}    
    $outp .= '{"id_koszt_wsp_typ":"'. $rs["id_koszt_wsp_typ"]     . '",';
    $outp .= '"nazwa":"'  . $rs["nazwa"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>
