<?php 
error_reporting(E_ALL);
ini_set('display_errors', '1');
?>
<html>
<head>
  <title>Monte Carlo Poker Simulation</title>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="main.js"></script>
</head>
<body>

<div id="container"><div>
  <?php
    $output = shell_exec("./poker");
    preg_match("/Random Hand: (.+?)\n/si", $output, $matches);
    preg_match_all("/\w\w/si", $matches[1], $matches);
    print "<ul class='clearfix'>";
    foreach($matches[0] as $card) {
      $class = substr($card, -1)." ";
      $class .= "c".substr($card, 0, 1);
      print "<li class='card {$class}'></li>";
    }
    print "</ul>";
    print "<pre>".$output."</pre>";
    
  ?>
</div></div>

</body>
</html>
