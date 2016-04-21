<html>
<body>
<center><?php echo date("l, F j, Y") ?></center>
<HR>
<p>Thank you</p>
<br>
<b>First Name:</b> <?php echo $_POST["firstname"]; ?>
<br>
  <b>Middle Name:</b> <?php echo $_POST['middlename']; ?>
<br>
  <b>Last Name:</b> <?php echo $_POST['lastname']; ?>
<br>
  <b>Home Phone Number:</b> <?php echo $_POST['hphone']; ?>
<br>
  <b>Cell Phone Number:</b> <?php echo $_POST['cphone']; ?>
<br>
  <b>Address:</b> <?php echo $_POST['address']; ?>
<br>
  <b>Gender:</b> <?php echo $_POST['gender']; ?>
<br>
<p><b>Suggestion: </b></p>
<?php echo $_POST['suggestion']; ?>
<br>
<br>
<?php
if (isset($_POST['agree']))
    echo '<b>Agree Checkbox Checked</b>';
?>

<?php
  print_r($_POST);
?>
</body>
</html>
