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


function dealCards() 
{
  var hand = Array();
  var n, index;
  
  for(var i = 0; i < 5; i++){
    index = 1;
    while(index > 0) {
      n = Math.floor(Math.random()*51);
      index = hand.indexOf(deck[n]);
    }
    hand[i] = deck[n];
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

function buildAnalyzeResults(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>Rank</dt><dd>"+obj.Rank+"</dd>";
  html += "<dt>Odds</dt><dd>"+obj.Win+"%</dd>";
  html += "<dt>Kernel Time</dt><dd>"+obj.Kernel_Time+"ms</dd>";
  html += "<dt>Comparisons</dt><dd>"+obj.Analyze_Res+"</dd>";
  html += "</dl>"
  return html;
}
function buildAnalyzeCPUResults(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>CPU Time</dt><dd>"+obj.Time+"ms</dd>";
  html += "</dl>"    
  return html;  
}
function buildGPUThrowResults(responseText)
{
  var obj = $.parseJSON(responseText);
  var html= "<dl>";
  html += "<dt>CPU Time</dt><dd>"+obj.Time+"ms</dd>";
  html += "</dl>"    
  return html;  
}



$(document).ready(function() {


  var hand = dealCards();
  var throwAway;

  displayHand(hand);
  throwActions();
  
  $("#deal-cards").click(function(event){
    event.preventDefault();
    hand = dealCards();
    displayHand(hand);
    $("#analyze-results .content").html("<p>No Results</p>");
    $("#throw-results .content").html("<p>No Results</p>");      
  });

  $("#analyze-hand").click(function(event){
    event.preventDefault();
    var tIndex;
    throwAway =  grabThrowaway();
    loadUrl = 'poker.php';
    var params = parseParams(hand, throwAway);
    var gpuParams = params + "&action=gpu_analyze";
    var cpuParams = params + "&action=cpu_analyze";

    $("#analyze-results .content").html("<p>Loading</p>");
    $.get(  
      loadUrl, gpuParams,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");        
        $("#analyze-results .content").prepend(buildAnalyzeResults(responseText));
      },  
      "html"
    );

    $.get(  
      loadUrl, cpuParams,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");  
        $("#analyze-results .content").html(buildAnalyzeCPUResults(responseText));        
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
    
    $("#throw-results .content").html("<p>Loading</p>");
    $.get( 
      loadUrl, params,  
      function(responseText){  
        $("#raw-results textarea").prepend(responseText + "\n");  
        $("#throw-results .content").html(buildGPUThrowResults(responseText));        
        console.log(responseText);
      },  
      "html"
    );
  });  

});
