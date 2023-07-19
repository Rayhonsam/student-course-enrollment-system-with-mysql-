
<?php

$mail = $_GET['mail'] ?? '';
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
$conn = new mysqli($servername, $username, $password, $dbname);
echo $mail;
if($conn->connect_error)
{
    die("connection error");
}


    $stmt=$conn->prepare("DELETE FROM enroll where mail=?");
    $stmt->bind_param("s",$mail);
    if($stmt->execute())
    {
        echo "record deleted successfully";
    }
    else
    {
        echo "error in deleting".$stmt->error;
    }
    $stmt->close();
$conn->close();
?>