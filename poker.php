<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$c1 = $_GET['c1'];
$c2 = $_GET['c2'];
$c3 = $_GET['c3'];
$c4 = $_GET['c4'];
$c5 = $_GET['c5'];

$cmd = "./gpu_poker --c1 {$c1} --c2 {$c2} --c3 {$c3} --c4 {$c4} --c5 {$c5}";

print $cmd;

$output = shell_exec($cmd);

print "<pre>";
print $output;
print "</pre>";

?>
