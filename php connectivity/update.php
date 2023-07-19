<?php
session_start();

// Check if the user is logged in and is an admin
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    // Redirect to the login page or show an error message
    header("Location: login.php");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "Error: " . $conn->connect_error;
}

$name = $_GET['param1'] ?? '';
$user_mail = $_GET['param2'] ?? '';

if (isset($_POST['update'])) {
    $user_name = $_POST['username'];
    $mail = $_POST['mail'];
    $info_sec = $_POST['info_sec'];
    $web_tech = $_POST['web_tech'];
    $data_mining = $_POST['data_mining'];

    $stmt = $conn->prepare("UPDATE enroll SET name=?, mail=?, info_sec=?, web_tech=?, data_mining=? WHERE name=? AND mail=?");

    $stmt->bind_param("sssssss", $user_name, $mail, $info_sec, $web_tech, $data_mining, $name, $user_mail);

    if ($stmt->execute()) {
        echo "Successfully updated in all courses" . $name;
        $stmt->close();
    } else {
        echo "Error in updating: " . $stmt->error;
    }
}

$stmt = $conn->prepare("SELECT * FROM enroll");
$stmt->execute();
$res = $stmt->get_result();

?>

<!DOCTYPE html>
<html>
<head>
    <title>Update Page</title>
</head>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<style>
    body {
        background-color: #f8f9fa;
        padding: 40px;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        margin-bottom: 40px;
    }

    .form-group label {
        font-weight: bold;
    }

    .form-group input[type="text"],
    .form-group input[type="email"] {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }

    .form-group select {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }

    .form-group button {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        background-color: #007bff;
        border: none;
        color: #fff;
        font-weight: bold;
    }
</style>

<body>
    <h1>Welcome, <?php echo $_SESSION['username']; ?> (Admin)</h1>
    <p>This is the admin page for the course enrollment system.</p>

    <?php if ($res->num_rows > 0) : ?>
        <form method="POST" action="update.php?param1=<?php echo urlencode($name); ?>&param2=<?php echo urlencode($user_mail); ?>">
            <?php while ($row = $res->fetch_assoc()) : ?>
                <?php if ($row['name'] === $name && $row['mail'] === $user_mail) : ?>
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="username" value="<?php echo $row['name']; ?>" required />
                    </div>
                    <div class="form-group">
                        <label>Mail:</label>
                        <input type="text" name="mail" value="<?php echo $row['mail']; ?>" required />
                    </div>
                    <div id="output"></div>
                    <input type="submit" value="Submit" name="update" />
                <?php endif; ?>
            <?php endwhile; ?>
        </form>
    <?php else : ?>
        <p>No record found.</p>
    <?php endif; ?>

    <a href="logout.php">Logout</a>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const doc = document.getElementById("output");
            const info = [
                {
                    subject: "info_sec",
                    slot: ["slot a", "slot b"],
                },
                {
                    subject: "web_tech",
                    slot: ["slot a", "slot b"],
                },
                {
                    subject: "data_mining",
                    slot: ["slot a", "slot b"],
                },
            ];
            let content = '';
            info.forEach((element, index) => {
                content += `
                    <div class="form-group">
                        <label>${element.subject}</label>
                        <select id=${index} name=${element.subject}>
                            <option name=${element.slot[0]}>${element.slot[0]}</option>
                            <option name=${element.slot[1]}>${element.slot[1]}</option>
                        </select>
                    </div>
                `;
            });
            doc.innerHTML = content;
        });
    </script>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
