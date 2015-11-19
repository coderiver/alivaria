<?php
	if (isset($_POST["file"])) {
		$name = $_POST["name"];
		$data = $_POST["file"];
		$imagePath = '/files/sound/' . $imageName;
		
		//Get the base-64 string from data
		$filteredData = substr($data, strpos($data, ",") + 1);
		 
		//Decode the string
		$unencodedData = base64_decode($filteredData);
		 
		//Save the image
		file_put_contents('../files/sound/' . $name, $unencodedData);
	};
    /*if (isset($_FILES["audio"])) {
		move_uploaded_file($_FILES["audio"]["tmp_name"], '../files/sound/' . $_POST["name"]);
	};*/
?>