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

		$size = $_POST[compSize];
		$sql = "insert into classes (className";

		for ($x = 0; $x < $size; $x++) {
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
			$response_array["status"] = "success";
		} elseif ($conn->errno == 1062) {
			$response_array["status"] = "dup";
		} else {
			$response_array["status"] = "error";
		}

		$conn->close();

		header('Content-Type: application/json');
		echo json_encode($response_array);
	} ;

?>
