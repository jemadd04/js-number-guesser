/*
GAME FUNCTION:
  -Player must guess a number between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player of the correct answer if loose
  - Let player choose to play again
*/

// 1. Game values
let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// 2. UI elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// 3. Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play Again event listener
UIgame.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// 4. Create event listener for button
UIguessBtn.addEventListener('click', function() {
  let guess = parseInt(UIguessInput.value);
  
  // 5. Validate input with conditional to check to make sure its not blank, less than min, or higher than max
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // 7. Check if winning number
  if(guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct! You win!`);

  } else {
    // Wrong number
    guessesLeft -= 1; // Takes one guess away

    // Check to see if there are any guesses left
    if(guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      UIguessInput.style.borderColor = 'red';

      // Clear input
      UIguessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');   
    }
  };
});

// Game over function 
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  UIguessInput.disabled = true;
  // Change border color
  UIguessInput.style.borderColor = color;
  // Set text color
  UImessage.style.color = color;
  // Let user know that they won - set message
  setMessage(msg);

  // Play Again?
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

// Get Random Number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

// 6. Set message
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}


