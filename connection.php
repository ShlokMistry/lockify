<?php

// Fix the underscores to hyphens in header names
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type"); // Fixed: Content_type -> Content-Type
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Credentials: true");

if($_SERVER['REQUEST_METHOD']==='OPTIONS'){
    http_response_code(200);
    exit;
}

$obj= new mysqli("localhost","root","","lockify");

// The connect_error property will be set if a connection error occurs.
// It's good to check this and immediately die with the error for debugging.
if ($obj->connect_error) {
    die("Connection failed: " . $obj->connect_error);
}

// Removed this redundant check as $obj->connect_error already handles it.
/*
if($obj->connect_errno !=0)
{
    echo $obj->connect_error;
    exit;
}
*/

?>