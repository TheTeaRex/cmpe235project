<html>
<body>
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

  $size = $_POST[compSize];
  $sql = "insert into classes (className";

  for ($x = 0; $x < $size; $x++){
    $sql .= ", comp" . $x . ", mpoint" . $x . ", percentage" . $x;
  }

  $sql .= ") values ('".$_POST[classname]."'";

  for ($x = 0; $x < $size; $x++){
    $comp = $_POST[component.$x];
    $point = $_POST[point.$x];
    $per = $_POST[per.$x];
    $sql .= ", '" . $comp . "', '" . $point . "', '" . $per."'";
  }

  $sql .= ")";

  echo $sql;
  echo '<br><br>';

  if($conn->query($sql) === TRUE){
    echo 'New record created sucessfully';
  } else {
    echo 'Error: ' . $sql.'<br>'. $conn->error;
  }

  $conn->close();

  echo '<br><br>';
  print_r($_POST);
  echo '<br><br>';
  print_r($_POST[classname]);
  echo '<br><br>';
  print_r($_POST[component0]);
  echo '<br><br>';
  print_r($_POST[per0]);


?>
</body>
</html>
