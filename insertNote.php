<?php 
if(isset($_REQUEST)) {
  mysql_connect("thenergal.com","cmpe235user","cmpe235pass");
  mysql_select_db("cmpe202projectdb");
  error_reporting(E_ALL && ~E_NOTICE);
  $className = $_POST['selectclassselectN'];
  $note = $_POST['selectclassnameN'];
  $sql="INSERT INTO notes(className, note) VALUES ('$className', '$note')";
  $result = mysql_query($sql);
  if($result){
    echo "You have been successfully subscribed.";
  }
}
?>
