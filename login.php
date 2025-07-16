<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL); 

include 'connection.php';
$data = json_decode(file_get_contents("php://input"),true);

$username = $data["username"]; 
$password = $data["password"]; 

$result = $obj->query("select * from registration where name='$username' and password='$password'"); 
$rowcount = $result->num_rows;

if($rowcount==1)
{
    $row = $result->fetch_object();
    $response = ["message"=>"Login Successful","user"=>$row,"status"=>true];
    echo json_encode($response);
}
else
{
    $response = ["message"=>"Invalid Username or Password","status"=>false];
    echo json_encode($response);
}

?>