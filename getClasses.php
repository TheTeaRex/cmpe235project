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

  $sql = 'select * from classes order by className';
  $result = mysqli_query($conn, $sql) or die('Error in selecting' . mysqli_error($conn));

  $newarray = array();
  while( $row = mysqli_fetch_assoc($result)) {
    $newarray[] = $row;
  }

  /*
  $size = count($newarray);
  for( $i = 0; $i < $size; $i++) {
    echo $newarray[$i]['className'];
    echo '<br><br>';
  }
  */

  echo json_encode($newarray);

  $result->free();
  $conn->close();
?>
