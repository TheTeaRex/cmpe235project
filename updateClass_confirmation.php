<?php

  if ($_POST['selectclassselect'] != '') {

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

    $action = $_POST['action'];

    if ($action == 'Delete Class') {

      $sql = 'delete from classes where className="';
      $sql .= $_POST['selectclassselect'].'"';

      //echo $sql;
      if ($conn->query($sql) === TRUE) {
      $response_array["status"] = "success";
      } else {
      $response_array["status"] = "error";
      }

    } elseif ($action == 'Submit') {
      $comp = $_POST['component0'];
      $point = $_POST['point0'];
      $per = $_POST['per0'];
      $sql = 'update classes set ';
      $sql .= 'comp0="'.$comp.'", mpoint0="'.$point.'", percentage0="'.$per.'"';

      $size = $_POST['selectcompSize'];

      for ($x = 1; $x < 10; $x++) {
        if ($x < $size) {
          $comp = $_POST['component'.$x];
          $point = $_POST['point'.$x];
          $per = $_POST['per'.$x];
          $sql .= ', comp'.$x.'="'.$comp.'", mpoint'.$x.'="'.$point.'", percentage'.$x.'="'.$per.'" ';
        } else {
          $comp = NULL;
          $point = "NULL";
          $per = "NULL";
          $sql .= ', comp'.$x.'= NULL, mpoint'.$x.'= NULL, percentage'.$x.'= NULL ';
        }
      }
      $sql .= 'where className="'.$_POST['selectclassselect'].'"';

      //echo $sql;
      //echo '<br><br>';
      if ($conn->query($sql) === TRUE) {
      $response_array["status"] = "success";
      } else {
      $response_array["status"] = "Error";
      }
    }

    $conn->close();

  }

    header('Content-Type: application/json');
    echo json_encode($response_array);

?>
