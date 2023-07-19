<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error in connection: " . $conn->connect_error);
}

if (isset($_POST['enroll'])) {
    $user_name = $_POST['username'];
    $passwords = $_POST['password'];
    $info_sec = $_POST['info_sec'];
    $web_tech = $_POST['web_tech'];
    $data_mining = $_POST['data_mining'];

    $stmt = $conn->prepare("SELECT * FROM login WHERE username=? AND password=?");

    $stmt->bind_param("ss", $user_name, $passwords);

    $stmt->execute();

    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
        $stmt = $conn->prepare("INSERT INTO enroll values(?,?,?,?,?)");
        $stmt->bind_param("sssss", $user_name, $passwords, $info_sec, $web_tech, $data_mining);

        if ($stmt->execute()) {
            echo "Successfully enrolled in all courses";
            $stmt->close(); 
        } else {
            echo "Error in enrolling: " . $stmt->error;
        }
    } else {
        echo "Invalid enrollment";
    }

    $stmt->close(); 
}

$conn->close();
?>
