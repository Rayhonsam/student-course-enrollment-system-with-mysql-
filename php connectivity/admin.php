<?php
session_start();

// Check if the user is logged in and is an admin
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    // Redirect to the login page or show an error message
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Page</title>
</head>
<style>
    body {
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
    }
    
    #drawer {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 250px;
        background-color: #333;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    
    #content {
        margin-left: 250px;
        padding: 20px;
    }
    
    h1, p {
        color: #333;
    }
    
    table {
        border-collapse: collapse;
        width: 100%;
    }
    
    th, td {
        text-align: left;
        padding: 8px;
    }
    
    th {
        background-color: #f2f2f2;
    }
    
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    
    tr:hover {
        background-color: #ddd;
    }
</style>
<body>
    <h1>Welcome, <?php echo $_SESSION['username']; ?> (Admin)</h1>
    <p>This is the admin page for the course enrollment system.</p>
    <?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo "error";
    }

    $stmt = $conn->prepare("SELECT * FROM enroll");
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
        echo "<table>";
        echo "<tr><th>name</th><th>mail</th><th>info_sec</th><th>web_tech</th><th>data_mining</th><th>update</th><th>delete</th>";
        while ($row = $res->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['name'] . "</td>";
            echo "<td>" . $row['mail'] . "</td>";
            echo "<td>" . $row['info_sec'] . "</td>";
            echo "<td>" . $row['web_tech'] . "</td>";
            echo "<td>" . $row['data_mining'] . "</td>";
            $url = "update.php?param1=" . urlencode($row['name']) . "&param2=" . urlencode($row['mail']);
            echo "<td><a href='$url'>update</a></td>";
            $deleteUrl = "delete.php?mail=" . urlencode($row['mail']);
            echo "<td><a href='$deleteUrl'>delete</a></td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "no record found";
    }
    ?>
    <a href="logout.php">Logout</a>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var updateButtons = document.querySelectorAll('.updateButton');
            updateButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "update.php", true);
                    xhr.send();
                });
            });
        });
    </script>
</body>
</html>
