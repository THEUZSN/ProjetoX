<?php

    require_once ('../../Database/connect.php');

    $user = filter_input(INPUT_POST ,'username', FILTER_SANITIZE_STRING);
    $pass = filter_input(INPUT_POST,'password');

    if($user && $pass){
        //Consulta de busca do usuario 
        $sql = $conn->prepare('SELECT password FROM users WHERE name = ?');

        if($sql){
            $sql->bind_param('s', $user);
            $sql->execute();
            $result = $sql->get_result();
            //Verifica se o user existe
            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                $stored_pass = $row['password'];

                if($pass === $stored_pass){
                    echo'Login bem-sucedido';
                    header('Location: ../../index.html');
                    exit;
                }else{echo'Senha incorreta';}
            }else{echo 'Usuario não encontrado';}
        }else{echo 'Erro ao preparar consulta'.$conn->error;}    
    }