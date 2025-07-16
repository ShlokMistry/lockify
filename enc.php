<?php

function encryptString($plainText, $secretKey){
    $method = "AES-256-CBC";
    $key = hash('sha256', $secretKey, true); // 32-byte key for AES-256
    $iv = openssl_random_pseudo_bytes(16); // 16-byte IV for AES-256-CBC
    $encrypted = openssl_encrypt($plainText, $method, $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $encrypted); // Combine IV and encrypted text
}

function decryptString($cipherText, $secretKey){
    $method = "AES-256-CBC";
    $key = hash('sha256', $secretKey, true);
    $data = base64_decode($cipherText);

    // Ensure the data is long enough to contain an IV and some encrypted text
    if (strlen($data) < 16) {
        // Return an empty string or throw an error if the cipherText is too short
        // This handles cases where the input is not a valid encrypted string
        return '';
    }

    $iv = substr($data, 0, 16); // Extract IV from the beginning
    $encryptedText = substr($data, 16); // Get the actual encrypted data
    // FIX: Changed $encrypted to $encryptedText
    return openssl_decrypt($encryptedText, $method, $key, OPENSSL_RAW_DATA, $iv);
}

// Make sure $secretKey is defined and has a good length (e.g., 32 characters for sha256 hash)
// Using a short key like "sss" is not secure for production.
$secretKey = "YourSuperSecretKeyForEncryptionDecryption12345"; // <--- CHANGE THIS TO A STRONG, UNIQUE KEY

?>