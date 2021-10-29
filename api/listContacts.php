<?php
	require_once ("db.php");
	require_once ("classes/contact.php");

	$results = array();
	$obj = new \stdClass(); 
    $jsnObj;
	
	$sql = "SELECT * FROM contacts";
	
	$query_result = $db_conn->query($sql);

	while($result = $query_result->fetch_array(MYSQLI_NUM)):
		$results[] = new Contact($result);
		endwhile;
	
	$query_result->free_result();
	
	mysqli_close($db_conn);

	$obj->contacts = $results;
    
	$jsnObj = json_encode($obj);
	echo($jsnObj);
	exit();
?>