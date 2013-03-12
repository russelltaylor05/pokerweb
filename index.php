<?php 
error_reporting(E_ALL);
ini_set('display_errors', '1');
?>
<html>
<head>
  <title>Monte Carlo Poker Simulation</title>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="main.js"></script>

</head>
<body>

<div id="container" class="clearfix"><div>
  <div class="right">
    <div id="analyze-results" class="results">
      <h2>Hand Results <span></span></h2>
      <div class="content"><p>NO Results</p></div>
    </div>
  
    <div id="throw-results" class="results">
      <h2>Throw Card Results <span></span></h2>
      <div class="content"><p>NO Results</p></div>
    </div>
  </div>

  <div class="left">
    <a href="#" id="deal-cards" class="deal">Deal Cards</a>
    <ul id="hand" class="clearfix"></ul>
    
    <a href="#" id="analyze-hand" class="button analyze-action">Analyze Hand</a>
    <a href="#" id="analyze-throw" class="button analyze-action">Analyze Throw Cards</a>  
    <a href="#" id="predict" class="button analyze-action">Predict</a>

    <div id="raw-results">
      <textarea></textarea>
    </div>

  </div>

  
</div></div>

</body>
</html>
