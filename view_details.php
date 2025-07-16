<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); // Enable all error reporting for debugging

include 'connection.php';
include 'enc.php'; // This file defines encryptString, decryptString, and $secretKey

// Make sure $secretKey is available (it should be if enc.php is included correctly)
global $secretKey;

$data = json_decode(file_get_contents("php://input"), true);

$user_id = isset($data["user_id"]) ? $data["user_id"] : null;
$wid = isset($data["wid"]) ? $data["wid"] : null;

// Default error response structure
$response = ["status" => false, "message" => "An unknown error occurred."];

if ($user_id === null || $wid === null) {
    $response = ["status" => false, "message" => "Missing user_id or web_id in request body."];
    echo json_encode($response);
    exit();
}

$user_id = $obj->real_escape_string($user_id);
$wid = $obj->real_escape_string($wid);


// Corrected SQL query to use 'reg_id' for user association
$result = $obj->query("SELECT * FROM addweb WHERE reg_id='$user_id' AND web_id='$wid'");

if ($result === FALSE) {
    error_log("MySQL Query Error in view_details.php: " . $obj->error);
    $response = ["message" => "Database query failed: " . $obj->error, "status" => false];
    echo json_encode($response);
    exit();
}

if ($result->num_rows > 0) {
    $row = $result->fetch_object();

    if ($row) { // Check if a row was successfully fetched
        // Check if $secretKey is defined before attempting decryption
        if (isset($secretKey)) {
            // Decrypt the password field of the fetched object
            $row->password = decryptString($row->password, $secretKey);
            $response = ["message" => "Website Data is Fetched Successfully", "website" => $row, "status" => true];
        } else {
            error_log("Error: \$secretKey not defined in view_details.php. Check enc.php.");
            $response = ["message" => "Encryption key missing, cannot decrypt.", "status" => false];
        }
    } else {
        $response = ["message" => "No website details found for provided IDs.", "status" => false];
    }
} else {
    $response = ["message" => "No website details found for provided IDs.", "status" => false];
}

echo json_encode($response);

?>