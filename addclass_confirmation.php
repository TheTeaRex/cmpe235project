<!doctype html>
<html>
  <head>
    <title>Welcome to Professor Menu</title>
    <link rel='stylesheet' href='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css' />
    <script src='/jquery.mobile-1.4.5/jquery.min.js'></script>
    <script src='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js'></script>
  </head>
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
    if ($conn->connect_error) {
      echo '<script>';
      echo "alert('Not able to connect to the database at the moment, please try again later.')";
      echo '</script>';
      die('Connection failed: '.$conn->connect_error);
    }

    $size = $_POST[compSize];
    $sql = "insert into classes (className";

    for ($x = 0; $x < $size; $x++){
      $sql .= ", comp" . $x . ", mpoint" . $x . ", percentage" . $x;
    }

    $sql .= ") values ('".$_POST[classname]."'";

    for ($x = 0; $x < $size; $x++) {
      $comp = $_POST[component.$x];
      $point = $_POST[point.$x];
      $per = $_POST[per.$x];
      $sql .= ", '" . $comp . "', '" . $point . "', '" . $per."'";
    }

    $sql .= ")";

    //echo $sql;
    //echo '<br><br>';

    if ($conn->query($sql) === TRUE) {
      //echo 'New record created successfully';
      echo '<script>';
      echo "alert('New record created successfully');";
      echo "document.location.href = 'prof_menu.php';";
      echo '</script>';
    } elseif ($conn->errno == 1062) {
      //echo 'Error: ' . $sql.'<br>'. $conn->error;
      echo '<script>';
      echo "document.location.href = 'prof_menu.php#addaclass';";
      echo "alert('Class name already exists in the database.');";
      echo '</script>';
    } else {
      //echo 'Error: ' . $sql.'<br>'. $conn->error;
      echo '<script>';
      echo "alert('Uh Oh, I hit an error.');";
      echo "document.location.href = 'prof_menu.php';";
      echo '</script>';
    }

    $conn->close();

    echo "<a href='#menu' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Go Back</a>";
    /*
    echo '<br><br>';
    print_r($_POST);
    echo '<br><br>';
    print_r($_POST[classname]);
    echo '<br><br>';
    print_r($_POST[component0]);
    echo '<br><br>';
    print_r($_POST[per0]);
     */
  ?>
</body>
</html>
