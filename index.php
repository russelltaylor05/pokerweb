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

    <div id="predict-results" class="results">
      <h2>Prediction Results <span></span></h2>
      <div class="content"><p>NO Results</p></div>
    </div>
    <a href="#" id="debug" class="button">Debug</a>
  </div>

  <div class="left">
    <a href="#" id="deal-cards" class="deal clearfix">Random Cards</a>

    <form id="card-set" class="clearfix">
      <input type="text" size="2" maxlength="2" name="c1" id="c1" />
      <input type="text" size="2" maxlength="2" name="c2" id="c2" />
      <input type="text" size="2" maxlength="2" name="c3" id="c3" />
      <input type="text" size="2" maxlength="2" name="c4" id="c4" />
      <input type="text" size="2" maxlength="2" name="c5" id="c5" />                      
      <input type="submit" value="Set Cards" class="button" />
    </form>
    
    <ul id="hand" class="clearfix"></ul>
    
    <div class="analyze-buttons" class="clearfix">
      <a href="#" id="analyze-hand" class="button analyze-action">Analyze Hand</a>
      <a href="#" id="analyze-throw" class="button analyze-action">Analyze Throw Cards</a>  
      <a href="#" id="predict" class="button analyze-action">Predict</a>
    </div>


    <div id="raw-results" style="display: none;">
      <textarea></textarea>
    </div>

  </div>

  
</div></div>

</body>
</html>
