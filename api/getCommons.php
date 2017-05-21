<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli("10.254.94.2", "s173529", "Parkowa3", "s173529");

$result = $conn->query("SELECT Koszty_wsp.id_koszt_wsp, Koszty_wsp.id_grupy, Koszty_wsp.id_koszt_wsp_typ, data_od, data_do, koszt, Koszty_wsp_typ.nazwa as nazwa_kosztu FROM Koszty_wsp, Koszty_wsp_typ WHERE Koszty_wsp.id_koszt_wsp_typ = Koszty_wsp_typ.id_koszt_wsp_typ AND Koszty_wsp.id_grupy = '$data->id_grupy'");

$outp = "";

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id_koszt_wsp":"'  . $rs["id_koszt_wsp"] . '",';
    $outp .= '"id_koszt_wsp_typ":"'  . $rs["id_koszt_wsp_typ"] . '",';
    $outp .= '"data_od":"'  . $rs["data_od"] . '",';
    $outp .= '"data_do":"'  . $rs["data_do"] . '",';
    $outp .= '"koszt":"'  . $rs["koszt"] . '",';
    $outp .= '"nazwa_kosztu":"'  . $rs["nazwa_kosztu"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp); 

?>