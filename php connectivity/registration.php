<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['register'])) {
    $usernames = $_POST['username'];
    $passwords = $_POST['mail'];
    $role=$_POST['category'];

    $res = $conn->query("SELECT * FROM login WHERE username='$usernames' OR password='$passwords'");
    if ($res->num_rows > 0) {
        echo "User already exists";
    } else {
        $insert = "INSERT INTO login VALUES ('$usernames', '$passwords','$role')";
        if ($conn->query($insert) === true) {
            echo "Registration successful";
        } else {
            echo "Error in registering: " . $conn->error;
        }
    }
}

$conn->close();
?>
