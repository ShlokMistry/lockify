<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST,GET,OPTIONS");
header("Access-Control-Allow-Credentials: true");

if($_SERVER['REQUEST_METHOD']==='OPTIONS'){
    http_response_code(200);
    exit;
}

// Assuming connection.php sets up $obj as your mysqli connection
include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);

// Basic validation to ensure data is received and decoded
if ($data === null) {
    $response = ["message" => "Invalid JSON data received", "status" => false];
    echo json_encode($response);
    exit();
}

// Check if all expected keys are present
$required_keys = ["username", "email", "contact", "password", "profile_password"];
foreach ($required_keys as $key) {
    if (!isset($data[$key])) {
        $response = ["message" => "Missing data: " . $key, "status" => false];
        echo json_encode($response);
        exit();
    }
}

$name = $data["username"];
$email = $data["email"];
$contact = $data["contact"];
$password = $data["password"]; // In a real application, hash this password!
$profile_password = $data["profile_password"]; // In a real application, hash this password!

// *** IMPORTANT: Use Prepared Statements to prevent SQL Injection ***
// This is a critical security fix and good practice.
$stmt = $obj->prepare("INSERT INTO registration(name, email, contact, password, profile_password) VALUES (?, ?, ?, ?, ?)");

if ($stmt === false) {
    // If prepare fails, it's usually a SQL syntax error in the query itself.
    $response = ["message" => "Failed to prepare statement: " . $obj->error, "status" => false];
    echo json_encode($response);
    exit();
}

// "sssss" indicates all five parameters are strings.
$stmt->bind_param("sssss", $name, $email, $contact, $password, $profile_password);

$exe = $stmt->execute();

if($exe)
{
    $id = $stmt->insert_id; // Get the ID of the newly inserted row
    
    // Fetch the inserted user if truly needed, but be mindful of security (e.g., don't return passwords)
    // The previous error was here: trying to cast an object ($row) to a string ["user"=>"$row"]
    $res = $obj->query("SELECT * FROM registration WHERE user_id='$id'");
    $row = $res->fetch_object();
    
    // Corrected: Pass the object directly to be JSON encoded.
    $response = ["message"=>"Registered Successfully", "user"=>$row, "status"=>true];
    echo json_encode($response);
}
else
{
    // Return a more specific error message from the database if execution fails
    $response = ["message"=>"Please try again: " . $stmt->error, "status"=>false];
    echo json_encode($response);
}

$stmt->close(); // Close the prepared statement
// Consider moving $obj->close() to connection.php or a dedicated closing function
// if $obj is used across multiple scripts in the same request, otherwise it's fine here.
$obj->close(); // Close the database connection

?>