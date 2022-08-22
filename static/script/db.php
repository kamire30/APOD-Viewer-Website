<?php
    if (isset($_POST['submitQuiz'])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        $conn = mysqli_connect("localhost", "root", "", "apodviewer");

        if ($conn->connect_error) {
            die("Connection failed: ".$conn->connect_error);
        } else {
            die("Connection success!");
        }
?>