<?php
  $ini = parse_ini_file('config.ini');
  $server = $ini['server'];
  $username = $ini['username'];
  $password = $ini['password'];
  $database = $ini['database'];

  // create connection
  $conn = new mysqli($server, $username, $password, $database);

  // check connection
  if( $conn->connect_error ){
    die('Connection failed: '.$conn->connect_error);
  }

  $sql = 'select * from classes';
  //$sql = 'select * from blank';
  $result = mysqli_query($conn, $sql) or die('Error in selecting' . mysqli_error($conn));

  $newarray = array();
  while( $row = mysqli_fetch_assoc($result)) {
    $newarray[] = $row;
  }

  echo json_encode($newarray);

  $result->free();
  $conn->close();
?>
