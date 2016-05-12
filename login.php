		<?php

		// echo 'Hello world before...';
		// ini_set('display_errors', 1);
		// ini_set('display_startup_errors', 1);
		// error_reporting(E_ALL);	

		//echo "reached signup.php....";

		require 'db.php';

		


		if(isset($_POST['login'])) {
			$email=mysqli_real_escape_string($con,$_POST['email']);
			$password=mysqli_real_escape_string($con,$_POST['password']);
			
		if ($result = $con->query("SELECT * FROM `User` where `email`='$email'")) {

		/* determine number of rows result set */
		$row_cnt = $result->num_rows;
   	
		}

		if($row_cnt > 0) {
		    	
		echo "exist";
				
		}
		else {
		echo "success";
		}     
				
		$result->close();
		
		}
		mysqli_close($con);


		?>
