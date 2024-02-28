<?php

$_POST   = json_decode(file_get_contents("php://input"), true);
$zipName = $_POST['zipName'];

// $imgPath = '../img/';
$imgPath = '../img/' . $zipName;
$zipPath = '../zip/' . $zipName;

// function dirToArray($dir)
// {
//  $result = array();
//  $cdir   = scandir($dir);
//  foreach ($$cdir as $key => $value) {

//   $result[] = $value;

//  }
//  return $result;
// }
function dirToArray($dir)
{
 $result = array();
 $cdir   = scandir($dir);
 foreach ($cdir as $key => $value) {
  if (!in_array($value, array(".", ".."))) {
   if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
    $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value);
   } else {
    $result[] = $value;
   }
  }
 }
 return $result;
}
function varDumpToString($var)
{
 ob_start();
 var_dump($var);
 $result = ob_get_clean();
 return $result;
}

$zip = new ZipArchive;
$zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE);

$files = dirToArray($imgPath);

foreach ($files as $file) {

 $zip->addFile($imgPath . "/" . $file, $file);

}
$zip->close();
