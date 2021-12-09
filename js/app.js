/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let GameApp; // Will hold new instance of the Game class below
let gameStarted = false;
const startButton = document.getElementById("btn__reset");
/**
 * Listens for "Start Game" button which creates a new Game object and starts the game by calling the startGame() method.
 */
document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", () => {
    gameStarted = true;
    GameApp = new Game();
    GameApp.startGame();
  });

  // keyboard buttons
  const keyboardButtonsWrapperDiv = document.getElementById("qwerty");

  /**
   * Listens for onscreen keyboard button click and calls handleInteraction() method on the Game object.
   */
  keyboardButtonsWrapperDiv.addEventListener("click", (e) => {
    if (e.target.className === "key") {
      GameApp.handleInteraction(e.target);
    }
  });

  /**
   * Extra Credit
   * Listens for keyboard letter clicks to guess letters and calls handleInteraction() method on the Game object.
   */
  document.addEventListener("keydown", (e) => {
    if (gameStarted && /^[a-z]$/.test(e.key)) {
      const keyboardButtons = document.getElementsByClassName("key");
      for (let key of keyboardButtons) {
        if (!key.disabled && key.innerText === e.key) {
          GameApp.handleInteraction(key);
        }
      }
    }
  });
}); // end on DOM load
