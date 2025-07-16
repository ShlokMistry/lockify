<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'connection.php';
include 'enc.php'; // Make sure this file is included to get encryptString and $secretKey

$data = json_decode(file_get_contents("php://input"), true);


if (
    isset($data['websiteName']) &&
    isset($data['username']) &&
    isset($data['password']) &&
    isset($data['id'])
) {

    $websiteName = $obj->real_escape_string($data['websiteName']);
    $username = $obj->real_escape_string($data['username']);
    $plainPassword = $data['password']; // Get the plain password from the request
    $reg_id = $obj->real_escape_string($data['id']);

    // --- FIX: Encrypt the password before storing it ---
    global $secretKey; // Make sure $secretKey from enc.php is accessible
    $encryptedPassword = encryptString($plainPassword, $secretKey);
    $passwordToStore = $obj->real_escape_string($encryptedPassword); // Escape the encrypted string

    $sql = "INSERT INTO addweb (reg_id, web_name, username, password) VALUES ('$reg_id', '$websiteName', '$username', '$passwordToStore')";

    $exe = $obj->query($sql);

    if ($exe === TRUE)
    {
        $id = $obj->insert_id;
        $res = $obj->query("SELECT * FROM addweb WHERE web_id='$id'");
        $row = $res->fetch_object();
        // Do NOT decrypt here; the frontend will handle it if needed
        $response = ["message"=>"Details Added Successfully","website"=>$row,"status"=>true];
        echo json_encode($response);
    }
    else
    {
        error_log("MySQL Error in add_website.php: " . $obj->error);
        $response = [ "message" => "Error Try Again: " . $obj->error,"status" => false];
        echo json_encode($response);
    }
} else {
    $response = ["message" => "Invalid or incomplete data received.", "status" => false];
    echo json_encode($response);
}

?>