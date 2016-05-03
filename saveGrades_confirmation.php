<!doctype html>
<html>
  <head>
    <title>Welcome to Professor Menu</title>
    <link rel='stylesheet' href='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css' />
    <script src='/jquery.mobile-1.4.5/jquery.min.js'></script>
    <script src='/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js'></script>
    <script>
      function linkTo(){
        document.location.href = 'prof_menu.php';
      }
    </script>
  </head>
  <body>
    <?php

      if ($_POST[classname] != '') {

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
        $sql .= 'A="'.$_POST['amin'].'", ';
        $sql .= 'B="'.$_POST['bmin'].'", ';
        $sql .= 'C="'.$_POST['cmin'].'", ';
        $sql .= 'D="'.$_POST['dmin'].'" ';
        $sql .= 'where className="'.$_POST['gradesclassselect'].'"';

        //echo $sql;
        //echo '<br><br>';
        if ($conn->query($sql) === TRUE) {
          //echo 'Configuration saved successfully';
          echo '<script>';
          echo "alert('Configuration saved successfully');";
          echo "document.location.href = 'prof_menu.php';";
          echo '</script>';
        } else {
          //echo 'Error: ' . $sql.'<br>'. $conn->error;
          echo '<script>';
          echo "alert('Uh Oh, I hit an error.');";
          echo "document.location.href = 'prof_menu.php';";
          echo '</script>';
        }

        $conn->close();

      }

    ?>
    <a href='#' onClick='linkTo()' data-transition='pop' class='ui-btn ui-shadow ui-corner-all'>Go Back</a>
  </body>
</html>
