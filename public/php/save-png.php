<?php

$_POST = json_decode(file_get_contents("php://input"), true);
$img = $_POST['img'];

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);

define('ROOTPATH', __DIR__ . "/img/");

$file = "./". time() . '.png';

file_put_contents($file, base64_decode($img));

