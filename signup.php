				<?php

				// echo 'Hello world before...';
				// ini_set('display_errors', 1);
				// ini_set('display_startup_errors', 1);
				// error_reporting(E_ALL);	

				//echo "reached signup.php....";

				require 'db.php';

				


				if(isset($_POST['signup'])) {
					$email=mysqli_real_escape_string($con,$_POST['email']);
					$password=mysqli_real_escape_string($con,$_POST['password']);
					$password2=mysqli_real_escape_string($con,$_POST['password2']);
					$fname=mysqli_real_escape_string($con,$_POST['fname']);
					$lname=mysqli_real_escape_string($con,$_POST['lname']);
					$phone=mysqli_real_escape_string($con,$_POST['phone']);
					

				//$query="SELECT * FROM User where `email`='$email'";
					//$td = "select count(email) from `User` where `email`= "$_POST['email']" ";
				
				$sql="insert into `User` (id, email, password, password2, fname, lname, phone) values (NULL ,'$email','$password','$password2','$fname','$lname','$phone')";

				if ($result = $con->query("SELECT * FROM `User` where `email`='$email'")) {

		    	/* determine number of rows result set */
		    	$row_cnt = $result->num_rows;

		    	//printf("Result set has %d rows.\n", $row_cnt);
		    	
		    	}
		    	
		    	if($row_cnt > 0) {
		    	
		    	echo "exist";
				
		    	}
				elseif ($con->query($sql) === TRUE) {
				echo "success";
				}
				else {	
				echo "Error: " . $sql . "<br>" . $conn->error;
				}     
				
				$result->close();
				mysqli_close($con);

				}
				?>
