<?php
	
    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        http_response_code(405);
        exit();
    }

    $obj = new \stdClass();  
	
	$fType = pathinfo($_FILES["image"]["name"],PATHINFO_EXTENSION);
	$fName = uniqid($_POST["name_first"] . $_POST["name_last"]) . "." . $fType;
	$fTarget = "../img/" . $fName;

    if (!move_uploaded_file($_FILES["image"]["tmp_name"], $fTarget))
    {
        http_response_code(400);
        $obj->succes = FALSE;
        $obj->msg = 'Error while uploading image';
        exit();
    }

    require_once ("db.php");

	$sql = "INSERT INTO contacts VALUES (0,?,?,?,?)";
	
	if($stmt = $db_conn->prepare($sql))
	{
		$stmt->bind_param("ssss", $_POST["name_first"], $_POST["name_last"], $_POST["email"], $fName);

		if($stmt->execute())
		{
			$obj->succes = TRUE;
            $obj->msg = 'Contact created successfully';
		}
        else{
            http_response_code(400);
            $obj->succes = FALSE;
            $obj->msg = 'Error while creating Contact';
        }
	}
	
	$stmt->close();
	mysqli_close($db_conn);
	$jsnObj = json_encode($obj);
	echo($jsnObj);
	exit();
?>