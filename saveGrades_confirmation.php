    <?php

      if ($_POST[gradesclassselect] != '') {

        $ini = parse_ini_file('config.ini');
        $server = $ini['server'];
        $username = $ini['username'];
        $password = $ini['password'];
        $database = $ini['database'];

        // create connection
        $conn = new mysqli($server, $username, $password, $database);

        // check connection
        if ($conn->connect_error) {
          echo '<script>';
          echo "alert('Not able to connect to the database at the moment, please try again later.')";
          echo '</script>';
          die('Connection failed: '.$conn->connect_error);
        }

        $sql = 'update classes set ';
        $sql .= 'A="'.$_POST[amin].'", ';
        $sql .= 'B="'.$_POST[bmin].'", ';
        $sql .= 'C="'.$_POST[cmin].'", ';
        $sql .= 'D="'.$_POST[dmin].'" ';
        $sql .= 'where className="'.$_POST[gradesclassselect].'"';

        //echo $sql;
        //echo '<br><br>';
        if ($conn->query($sql) === TRUE) {
          $response_array["status"] = "success";
        } else {
          $response_array["status"] = "error";
        }

        $conn->close();

        header('Content-Type: application/json');
        echo json_encode($response_array);

      } 


    ?>