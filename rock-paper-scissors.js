//Restoring the score from the local storage
let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  updateScoreElement();

  function getComputerMove() {
    const randomNumber = Math.random();
    let computerMove = "";
    if (randomNumber < 0.34) {
      computerMove = "Rock";
    } else if (randomNumber < 0.67) {
      computerMove = "Paper";
    } else {
      computerMove = "Scissors";
    }
    return computerMove;
  }
  let isAutoPlay = false;
  let intervalId;
  function autoPlay() {
    if (isAutoPlay===false) {
      isAutoPlay = true;
      document.getElementById("auto-play-id").innerHTML = "Stop Auto Play";
      intervalId = setInterval(() => {
        playGame(getComputerMove());
      },1000)
    }else{
      isAutoPlay = false;
      clearInterval(intervalId);
      document.getElementById("auto-play-id").innerHTML = "Auto Play";
    }
  }

  document.querySelector(".js-rock-btn").addEventListener("click",() =>  { playGame("Rock")});
  document.querySelector(".js-paper-btn").addEventListener("click",() =>  { playGame("Paper")});
  document.querySelector(".js-scissors-btn").addEventListener("click",() =>  { playGame("Scissors")});

  //Play the game with keyboard entries
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});
  function playGame(choice) {
    computerMove = getComputerMove();
    if (choice === "Rock") {
      if (computerMove === "Rock") {
        result = "It's a tie!";
        score.ties++;
      } else if (computerMove === "Paper") {
        result = "You Lose!";
        score.losses++;
      } else {
        result = "You Win!";
        score.wins++;
      }
    } else if (choice === "Paper") {
      if (computerMove === "Rock") {
        result = "You Win!";
        score.wins++;
      } else if (computerMove === "Paper") {
        result = "It's a tie!";
        score.ties++;
      } else {
        result = "You Lose!";
        score.losses++;
      }
    } else if (choice === "Scissors") {
      if (computerMove === "Rock") {
        result = "You Lose!";
        score.losses++;
      } else if (computerMove === "Paper") {
        result = "You Win!";
        score.wins++;
      } else {
        result = "It's a tie!";
        score.ties++;
      }
    }
    //Saving the score in the local storage
    localStorage.setItem("score", JSON.stringify(score));
    /*alert(
      `You picked ${choice}. Computer picked ${computerMove}.${result}. \nWins:${score.wins}, Losses:${score.losses}, Ties: ${score.ties}`
    );*/

    updateScoreElement();
    /*
    document.querySelector(
      ".js-score"
    ).innerHTML = `You picked ${choice}. Computer picked ${computerMove}.${result}.\nWins:${score.wins}, Losses:${score.losses}, Ties: ${score.ties}`;*/
    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(
      ".js-move"
    ).innerHTML = `You <img src="images/${choice}-emoji.png" alt=${choice} />
  <img src="images/${computerMove}-emoji.png" alt=${computerMove} />
  Computer`;
  }

  function updateScoreElement() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties: ${score.ties}`;
  }