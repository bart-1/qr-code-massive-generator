<?php

$_POST = json_decode(file_get_contents("php://input"), true);
$img = $_POST['img'];
$name = $_POST['fileName'];

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);

define('ROOTPATH', __DIR__ . "/img/");

$file = "./".$name.'.png';

file_put_contents($file, base64_decode($img));

