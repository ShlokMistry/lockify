<?php

include 'connection.php';
$data = json_decode(file_get_contents("php://input"), true);

$reg_id = $data["user_id"];
$result = $obj->query("SELECT * FROM addweb WHERE reg_id='$reg_id'");

$r = array();

while ($row = $result->fetch_object()) {
    $r[] = $row;
}

$response = ["message"=>"Website Details fetched Successfully","website"=>$r,"status"=>true];
echo json_encode($response); // Changed to echo the full response object

?>