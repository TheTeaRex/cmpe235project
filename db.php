<?php


//echo 'reached db.php.....';	

$servername = "localhost";
$username = "root";
$password = "admin";
$db = "m2compute";



// Create connection
$con = mysqli_connect($servername, $username, $password, $db)or die("cannot connect");

//echo $con ? 'true' : 'false';	

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$q = "SELECT ID FROM USER";
$res = mysqli_query($con, $q);

if(empty($res)) {
                $query = "CREATE TABLE USER (
                          id int(11) AUTO_INCREMENT,
                          email varchar(255) NOT NULL,
                          password varchar(255) NOT NULL,
                          password2 varchar(255),
                          fname varchar(255),
                          lname varchar(255),
                          phone int(11),
                          PRIMARY KEY  (ID)
                          )";
                $result = mysqli_query($con, $query);
}


?> 
