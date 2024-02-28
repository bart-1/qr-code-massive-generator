<?php

$_POST      = json_decode(file_get_contents("php://input"), true);
$img        = $_POST['img'];
$name       = $_POST['fileName'];
$folderName = $_POST['folderName'];

$path = '../img/' . $folderName;

if (!file_exists($path)) {
 mkdir($path, 0777, true);
}

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);

$file = $path. '/' . $name . '.png';

file_put_contents($file, base64_decode($img));
