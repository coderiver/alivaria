<?php
	if (isset($_POST["file"])) {
		$result = $_POST["config"];
		
		$imageName = $_POST["name"];
		$imageData = $_POST["file"];
		$imagePath = '/files/photo/' . $imageName;
		
		//Get the base-64 string from data
		$filteredData = substr($imageData, strpos($imageData, ",") + 1);
		 
		//Decode the string
		$unencodedData = base64_decode($filteredData);
		 
		//Save the image
		file_put_contents('../files/photo/' . $imageName, $unencodedData);
	};
?>