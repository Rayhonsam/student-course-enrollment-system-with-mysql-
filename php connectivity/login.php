<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername="localhost";
$username="root";
$password="";
$dbname="test";

$conn=new mysqli($servername,$username,$password,$dbname);

if($conn->connect_error)
{
    die("error in connection");
}

if(isset($_POST['login']))
{
    $user_name=$_POST['username'];
    $passwords=$_POST['password'];

    $stmt="SELECT * FROM login WHERE username='$user_name' AND password='$passwords'";
    $result=$conn->query($stmt);
    if($result->num_rows==1)
    {
        $row=$result->fetch_assoc();
        session_start();
        $_SESSION['username']=$row['username'];
        $_SESSION['password']=$row['password'];
        $_SESSION['role']=$row['role'];
        if ($row['role'] == 'admin') {
            header("Location: admin.php");
            exit();
        } elseif ($row['role'] == 'student') {
            header("Location: enrollment.html");
        } else {
            echo "Invalid role.";
        }
    }
    else
    {
        echo "invalid username or password1";
    }
   $conn->close();
}