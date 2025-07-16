<?php

include 'connection.php';
$data = json_decode(file_get_contents("php://input"),true);

// Retrieve data from JSON input, not $_GET
$user_id = $data["user_id"];
$profile_password = $data["password"]; // Frontend sends 'password' key

$result = $obj->query("select * from registration where profile_password='$profile_password' and user_id='$user_id'");
$rowcount = $result->num_rows;


if($rowcount==1)
{
    $row = $result->fetch_object();
    $response = ["message"=>"Profile Password Matched Successfully","user"=>$row,"status"=>true];
    echo json_encode($response);
}
else
{
    $response = ["message"=>"Invalid Profile Password","status"=>false]; // Corrected message for clarity
    echo json_encode($response);
}

?>