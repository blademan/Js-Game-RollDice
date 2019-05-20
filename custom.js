/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;
init();
var prevDice;
var player0 = document.querySelector(".player-0-panel");
var player1 = document.querySelector(".player-1-panel");

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1.rand number
 
    dice = Math.floor(Math.random() * 6) + 1;
    

    // 2. Display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update Round score if the rolled number was NOT 1.
    
    if(dice === 6 && prevDice === 6){
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent =0;
        console.log('LOSE');
        nextPlayer();
        dice = 0;
    } else if (dice !== 1 ) {
        //add score
        roundScore += dice;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        //next player
        nextPlayer();
      }

    prevDice = dice;



  }
});

var btnHold = document.querySelector(".btn-hold");
var curentScore = document.getElementById("current-0");

btnHold.addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if player won game
    if (scores[activePlayer] >= 10) {
      gamePlaying = false;

      document.getElementById("name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

  
    } else {
      nextPlayer();
    }
  }
});

// Next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  player0.classList.toggle("active");

  player1.classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
