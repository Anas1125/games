//JSON.parse converts jason code into javascript code and json code only supports string 
  //localstorage stores data and when we close or refresh page it wont get deleted like variable and geitem items gets the items which is stored
  let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  //score === null and !score are both same 
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */

  updateScoreElement();

  let isAutoPlaying = false;
  let intervalId;

  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(function () {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  function playGame (gameMover){
    const computerMove = pickComputerMove();

    let result = '';

    if(gameMover === 'Scissors'){
      if(computerMove === 'Rock') {
        result = 'You Lose.'
      } else if (computerMove === 'Paper') {
        result = 'You Win.';
      } else if (computerMove === 'Scissors') {
        result = 'tie.';
      } 
    } else if (gameMover === 'Paper'){
        if(computerMove === 'Rock') {
          result = 'You Win.'
        } else if (computerMove === 'Paper') {
          result = 'tie.';
        } else if (computerMove === 'Scissors') {
          result = 'You Lose.';
        }
      } else if (gameMover === 'Rock'){
          if (computerMove === 'Rock') {
            result = 'tie.';
          } else if (computerMove === 'Paper') {
            result = 'You Lose.';
        } else if (computerMove === 'Scissors') {
            result = 'You Win.';
      }
    }

    if (result === 'You Win.') {
      // score.wins = score.wins +1 both are same
      score.wins += 1;
    } else if (result === 'You Lose.') {
      score.losses += 1;
    } else if (result === 'tie.') {
      score.ties += 1;
    }
    
    //JSON.stringify converts javascripts into json code and local storage setitem let us save an item  
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${gameMover}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
  } 

  function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`;
  }

  function pickComputerMove(){
    const randomNumber = Math.random()
    let computerMove = '';

    if(randomNumber >=0 && randomNumber < 1/3) {
      computerMove = 'Rock';
    }  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove =  'Paper';
    } else if (randomNumber >= 2/3 && randomNumber < 2) {
      computerMove =  'Scissors';
    }
    return computerMove;
  }

 
