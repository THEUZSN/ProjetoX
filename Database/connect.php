<?php

    $host = 'localhost';
    $dbName = 'Login';
    $user = 'root';
    $password = '';

    $conn = new mysqli($host, $user, $password, $dbName);
    
    if ($conn->connect_error) {
        echo 'Erro: Falha de conexâo'. mysqli_connect_error();
        exit();
    }