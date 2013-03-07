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
  
  for(var i = 0; i < 5; i++){
    hand[i] = deck[Math.floor(Math.random()*51)];
  }    
  return hand;
}

function displayHand(hand) {
  var liClass = "";
  var html = "";
  
  for(card in hand) {
    liClass = "card ";
    liClass += "c" + hand[card].charAt(0) + " ";
    liClass += hand[card].charAt(1);
    html += "<li class='" + liClass + "'></li>";
  }

  $("#hand").html(html);


}


$(document).ready(function() {


  var hand = dealCards();
  displayHand(hand);
  
  $("#deal-cards").click(function(event){
    event.preventDefault();
    hand = dealCards();
    displayHand(hand);    
  });
  
  
  $("#analyze").click(function(event){
    event.preventDefault();  
    
    loadUrl = 'poker.php';
    params = "c1=" + hand[0];
    params += "&c2=" + hand[1];
    params += "&c3=" + hand[2];
    params += "&c4=" + hand[3];
    params += "&c5=" + hand[4];
    
    $("#results")  
        .html("loading")  
        .load(loadUrl, params);      
  });
  

});
