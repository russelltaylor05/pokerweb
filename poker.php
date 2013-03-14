<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$cmd1 = NULL;
$cmd2 = NULL;

$c1 = $_GET['c1'];
$c2 = $_GET['c2'];
$c3 = $_GET['c3'];
$c4 = $_GET['c4'];
$c5 = $_GET['c5'];

$t1 = (isset($_GET['t1'])) ? $_GET['t1'] : 0;
$t2 = (isset($_GET['t2'])) ? $_GET['t2'] : 0;
$t3 = (isset($_GET['t3'])) ? $_GET['t3'] : 0;
$t4 = (isset($_GET['t4'])) ? $_GET['t4'] : 0;
$t5 = (isset($_GET['t5'])) ? $_GET['t5'] : 0;

$action = $_GET['action'];

if($action == "gpu_analyze") {
  $cmd = "./exec/analyze_gpu --c1 {$c1} --c2 {$c2} --c3 {$c3} --c4 {$c4} --c5 {$c5}";
}

if($action == "cpu_analyze") {
  $cmd = "./exec/cpu_analyze --c1 {$c1} --c2 {$c2} --c3 {$c3} --c4 {$c4} --c5 {$c5}";
}

if($action == "gpu_throw") {
  $cmd = "./exec/throw_gpu --c1 {$c1} --c2 {$c2} --c3 {$c3} --c4 {$c4} --c5 {$c5}";

  if($t1) {
    $cmd .= " --t1 {$t1}";
  }
  if($t2) {
    $cmd .= " --t2 {$t2}";
  }
  if($t3) {
    $cmd .= " --t3 {$t3}";
  }
  if($t4) {
    $cmd .= " --t4 {$t4}";
  }
  if($t5) {
    $cmd .= " --t5 {$t5}";
  }
}

if($action == "gpu_predict") {
  $cmd = "./exec/predict_gpu --c1 {$c1} --c2 {$c2} --c3 {$c3} --c4 {$c4} --c5 {$c5}";
}


if ($cmd) {

  $output = shell_exec($cmd);
  $output = "\"command\" : \"{$cmd}\",\n".$output;
  print "{\n".$output."}";
}

?>
