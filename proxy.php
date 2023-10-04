<?php
// Get the URL to fetch from the query parameter
if(isset($_GET['url'])) {
    $url = $_GET['url'];
} else {
    die("URL parameter is missing");
}

// Initialize a cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL session and fetch the content
$response = curl_exec($ch);

// Check for cURL errors
if(curl_errno($ch)) {
    die("cURL Error: " . curl_error($ch));
}

// Get the HTTP status code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($ch);

// Set the appropriate content type and return the response with the HTTP status code
http_response_code($httpCode);
header("Content-Type: application/json");
echo $response;
?>
