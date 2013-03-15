var deck = new Array();
deck.push("2s");
deck.push("3s");
deck.push("4s");
deck.push("5s");
deck.push("6s");
deck.push("7s");
deck.push("8s");
deck.push("9s");
deck.push("Ts");
deck.push("Js");
deck.push("Qs");
deck.push("Ks");
deck.push("As");
deck.push("2d");
deck.push("3d");
deck.push("4d");
deck.push("5d");
deck.push("6d");
deck.push("7d");
deck.push("8d");
deck.push("9d");
deck.push("Td");
deck.push("Jd");
deck.push("Qd");
deck.push("Kd");
deck.push("Ad");
deck.push("2h");
deck.push("3h");
deck.push("4h");
deck.push("5h");
deck.push("6h");
deck.push("7h");
deck.push("8h");
deck.push("9h");
deck.push("Th");
deck.push("Jh");
deck.push("Qh");
deck.push("Kh");
deck.push("Ah");
deck.push("2c");
deck.push("3c");
deck.push("4c");
deck.push("5c");
deck.push("6c");
deck.push("7c");
deck.push("8c");
deck.push("9c");
deck.push("Tc");
deck.push("Jc");
deck.push("Qc");
deck.push("Kc");
deck.push("Ac");

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function dealCards() 
{
  var hand = Array();
  var index;
  var tempDeck = deck.slice();
  var tempCard = 0;

  console.log(tempDeck);

  for(var i = 0; i < 5; i++){
    while(tempCard == 0) {
      index = Math.floor(Math.random()*51);
      tempCard = tempDeck[index];
    }
    hand[i] = tempDeck[index];
    tempDeck[index] = 0;
    tempCard = 0;
  }
  return hand;
}

function grabThrowaway() {
  var card, suit;
  var results = Array()

  $("li.card").each(function( key, value ) {
    if($(this).hasClass('throwaway')) {
      card = $(this).attr("class").match(/card-(\w)/i);
      suit = $(this).attr("class").match(/suit-(\w)/i);
      results.push(card[1] + suit[1]);
    }
  });
  return results;
} 

function displayHand(hand) {
  var liClass = "";
  var html = "";
  
  for(card in hand) {
    liClass = "card ";
    liClass += "card-" + hand[card].charAt(0) + " ";
    liClass += "suit-" + hand[card].charAt(1);
    html += "<li class='" + liClass + "'></li>";
  }

  $("#hand").html(html);
  throwActions();
}

function throwActions(){

  $(".card").click(function(event){
    event.preventDefault();      
    if($(this).hasClass("throwaway")) {
      $(this).removeClass("throwaway")
    } else {
      $(this).addClass("throwaway")    
    }
  });
}

function parseParams(hand, throwAway)
{
  var i, tIndex, params;
  
  params = "c1=" + hand[0];
  params += "&c2=" + hand[1];
  params += "&c3=" + hand[2];
  params += "&c4=" + hand[3];
  params += "&c5=" + hand[4];
  
  for(i in throwAway) {
    tIndex = parseInt(i) + parseInt(1);  
    params += "&t" + tIndex +"=" + throwAway[i];  
  }
  return params;
}

/***********/
/* RESULTS */
/***********/

function buildAnalyzeResults(responseText)
{
  var obj = $.parseJSON(responseText);
  return obj.Win + "%";
}

function buildAnalyzeDetails(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>Rank</dt><dd>"+obj.Rank+"</dd>";
  html += "<dt>GPU Time</dt><dd>"+obj.Kernel_Time+"ms</dd>";
  html += "<dt>Comparisons</dt><dd>"+obj.Analyze_Res+"</dd>";
  html += "</dl>"
  return html;
}
function buildAnalyzeCPUDetails(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>CPU Time</dt><dd>"+obj.Time+"ms</dd>";
  html += "</dl>"    
  return html;  
}
function buildThrowResults(responseText)
{
  var obj = $.parseJSON(responseText);
  return obj.Win + "%";
}
function buildGPUThrowDetails(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";

  html += "<dt>GPU Time</dt><dd>" + numberWithCommas(obj.Kernel_Time) + "ms</dd>";
  html += "<dt>CPU Time</dt><dd>12 minutes</dd>";
  html += "<dt>Comparisons</dt><dd>" + numberWithCommas(obj.Thread_cnt) +"</dd>";
  html += "<dt>Throw Res</dt><dd>" + numberWithCommas(obj.Throw_Res) +"</dd>";
  html += "</dl>"    
  return html;  
}

function buildPredictResults(responseText)
{
  var obj = $.parseJSON(responseText);
  return obj.best_win + "%";
}

function buildGPUPredictDetails(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>Odds</dt><dd>"+obj.best_win+"%</dd>";
  html += "<dt>Best Throw</dt><dd>"+obj.best_throw+" &nbsp;</dd>";
  html += "<dt>GPU Time</dt><dd>" + numberWithCommas(obj.Kernel_Time) +"ms</dd>";
  html += "<dt>Comparisons</dt><dd>" + numberWithCommas(parseInt(obj.Thread_cnt) * 32) +"</dd>";
  html += "</dl>"
  return html;
}



/**********/
/* MAIN   */
/**********/


$(document).ready(function() 
{
  var hand = dealCards();
  var throwAway;

  displayHand(hand);
  
  $("#deal-cards").click(function(event){
    event.preventDefault();
    hand = dealCards();
    displayHand(hand);
    $("#analyze-results .content").html("<p>No Results</p>");
    $("#throw-results .content").html("<p>No Results</p>");      
    $("#predict-results .content").html("<p>No Results</p>");      
    $("#throw-results h2 span").html("");    
    $("#analyze-results h2 span").html("");    
    $("#predict-results h2 span").html("");    
  });

  $("#debug").click(function(event){
    event.preventDefault();
    $('#raw-results').toggle();
    
  });
  
  $("#card-set").submit(function(){

    var tempHand = Array();
    tempHand[0] = $("#card-set #c1").val();
    tempHand[1] = $("#card-set #c2").val();
    tempHand[2] = $("#card-set #c3").val();  
    tempHand[3] = $("#card-set #c4").val();      
    tempHand[4] = $("#card-set #c5").val();      

    console.log(tempHand);  
    for(card in tempHand) {
      console.log(deck);
      console.log(tempHand[card] + ".  ." + deck.indexOf(tempHand[card]));
      if(deck.indexOf(tempHand[card]) < 0) {
        alert("Bad Card Values: " + tempHand[card]);
        return false;
      }
    }
    
    hand = tempHand.slice();
    displayHand(hand);
    return false;
  });


  $("#analyze-hand").click(function(event){
    event.preventDefault();
    var tIndex;
    throwAway =  grabThrowaway();
    loadUrl = 'poker.php';
    var params = parseParams(hand, throwAway);
    var gpuParams = params + "&action=gpu_analyze";
    var cpuParams = params + "&action=cpu_analyze";

    $("#analyze-results .content").html("<p class='loading'><img src='/images/loader.gif' />Loading</p>");
    $("#analyze-results h2 span").html("");
    $.get(  
      loadUrl, gpuParams,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");        
        $("#analyze-results .content").prepend(buildAnalyzeDetails(responseText));
        $("#analyze-results h2 span").html(buildAnalyzeResults(responseText));
        
      },  
      "html"
    );

    $.get(  
      loadUrl, cpuParams,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");  
        $("#analyze-results .content").html(buildAnalyzeCPUDetails(responseText));        
      },  
      "html"
    );
  });
  
  
  $("#analyze-throw").click(function(event){
    event.preventDefault();  
    var tIndex;
    var throwAway =  grabThrowaway();
    var loadUrl = 'poker.php';
    var params = parseParams(hand, throwAway);
    params += "&action=gpu_throw";
    
    $("#throw-results .content").html("<p class='loading'><img src='/images/loader.gif' />Loading</p>");
    $("#throw-results h2 span").html("");
    $.get( 
      loadUrl, params,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");  
        $("#throw-results .content").html(buildGPUThrowDetails(responseText));        
        $("#throw-results h2 span").html(buildThrowResults(responseText));        
      },  
      "html"
    );
  });  

  $("#predict").click(function(event){
    event.preventDefault();  
    var tIndex;
    var throwAway =  grabThrowaway();
    var loadUrl = 'poker.php';
    var params = parseParams(hand, throwAway);
    params += "&action=gpu_predict";
    
    $("#predict-results .content").html("<p class='loading'><img src='/images/loader.gif' />Loading</p>");
    $("#predict-results h2 span").html("");
    $.get( 
      loadUrl, params,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");  
        $("#predict-results .content").html(buildGPUPredictDetails(responseText));        
        $("#predict-results h2 span").html(buildPredictResults(responseText));        
      },  
      "html"
    );
  });  



});
