<?php
	
    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        http_response_code(405);
        exit();
    }

    $obj = new \stdClass();  

	if(!unlink("../img/" . $_POST['image'])){
		http_response_code(400);
		$obj->succes = FALSE;
		$obj->msg = 'Error while deleting old image';
		$jsnObj = json_encode($obj);
		echo($jsnObj);
		exit();	
	}

    require_once ("db.php");

	$sql = "DELETE FROM contacts WHERE id = ?";
	
	if($stmt = $db_conn->prepare($sql))
	{
		$stmt->bind_param("i", $_POST["id"]);

		if($stmt->execute())
		{
			$obj->succes = TRUE;
            $obj->msg = 'Contact deleted successfully';
		}
        else{
            http_response_code(400);
            $obj->succes = FALSE;
            $obj->msg = 'Error while deleting Contact';
        }
	}
	
	$stmt->close();
	mysqli_close($db_conn);
	$jsnObj = json_encode($obj);
	echo($jsnObj);
	exit();

?>