<?php


if (isset($_POST['queja']) && isset($_POST['message'])) {
    $nombre = $_POST['message'];
    $queja  = $_POST['queja'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "register";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
      die("Conexion fallida: " . $conn->connect_error);
    }
    
    $sql = "INSERT INTO ayuda (nombre, queja)
    VALUES ('".$nombre."','".$queja."')";
    
    if ($conn->query($sql) === TRUE) {
      echo "Nuevo registro realizado";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
}
    
?>