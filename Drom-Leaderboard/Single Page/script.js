//vars to grab the info
let rank1name;
/*let rank2name = document.querySelector("#teamTwoName");
let rank3name = document.querySelector("#teamThreeName");
let rank4name = document.querySelector("#teamFourName");
let rank5name = document.querySelector("#teamFiveName");
let rank6name = document.querySelector("#teamSixName");
let rank7name = document.querySelector("#teamSevenName");
let rank8name = document.querySelector("#teamEightName");
let rank9name = document.querySelector("#teamNineName");
let rank10name = document.querySelector("#teamTenName");*/

var scores = {
    rank1: {"name":"Team Name","score":"Team Score","streak":""},
    rank2: {"name":"Team Name","score":"Team Score","streak":""},
    rank3: {"name":"Team Name","score":"Team Score","streak":""},
    rank4: {"name":"Team Name","score":"Team Score","streak":""},
    rank5: {"name":"Team Name","score":"Team Score","streak":""},
    rank6: {"name":"Team Name","score":"Team Score","streak":""},
    rank7: {"name":"Team Name","score":"Team Score","streak":""},
    rank8: {"name":"Team Name","score":"Team Score","streak":""},
    rank9: {"name":"Team Name","score":"Team Score","streak":""},
    rank10: {"name":"Team Name","score":"Team Score","streak":""},
    temp: {"name":"","score":"","streak":""},
};

window.onload = function(){
  rank1name = "changed";
  //Set the blank 
  document.querySelector("#teamOneName").innerHTML = rank1name;
}


function rank() {
  //Collect inputed data
  let newTeam = document.querySelector("#team");
  let newScore = document.querySelector("#score");
  //Compare Scores
  for(var i = 0; i < scores.length; i++){
    
  }
  //When rank is found put name, score, and streak in appropriate ranking
  
  //Push last ranking out
}