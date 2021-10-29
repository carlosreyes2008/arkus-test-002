<?php
	
    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        http_response_code(405);
        exit();
    }

    $obj = new \stdClass();  
	
	$image_name = $_POST['image_name'];

	if(isset($_FILES["image"]))
	{
		$fType = pathinfo($_FILES["image"]["name"],PATHINFO_EXTENSION);
		$fName = uniqid($_POST["name_first"] . $_POST["name_last"]) . "." . $fType;
		$fTarget = "../img/" . $fName;

		if(file_exists("../img/" . $image_name)){
			if(!unlink("../img/" . $image_name)){
				http_response_code(400);
				$obj->succes = FALSE;
				$obj->msg = 'Error while deleting old image';
				$jsnObj = json_encode($obj);
				echo($jsnObj);
				exit();	
			}
		}
		
		if (!move_uploaded_file($_FILES["image"]["tmp_name"], $fTarget))
		{
			http_response_code(400);
			$obj->succes = FALSE;
			$obj->msg = 'Error while uploading image';
			$jsnObj = json_encode($obj);
			echo($jsnObj);
			exit();
		}

		$image_name = $fName;
	}

    require_once ("db.php");

	$sql = "UPDATE contacts SET name_first = ?, name_last = ?, email = ?, image = ? WHERE id = ?";
	
	if($stmt = $db_conn->prepare($sql))
	{
		$stmt->bind_param("ssssi", $_POST["name_first"], $_POST["name_last"], $_POST["email"], $image_name, $_POST["id"]);

		if($stmt->execute())
		{
			$obj->succes = TRUE;
            $obj->msg = 'Contact updated successfully';
		}
        else{
            http_response_code(400);
            $obj->succes = FALSE;
            $obj->msg = 'Error while updating Contact';
        }
	}
	
	$stmt->close();
	mysqli_close($db_conn);
	$jsnObj = json_encode($obj);
	echo($jsnObj);
	exit();

?>