/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  /**
     * Constructor
     *  Recieves an array of ranodm phrases and initializes the following properties:
        missed: initialized to 0, tracks number of missed guesses.
        phrases: five Phrase class objects array. 
        activePhrase: initialized to null, Phrase object that’s currently in play.
     */
  constructor() {
    this.missed = 0;
    this.phrases = [];
    const randomPhrases = [
      "Hello World",
      "Null Pointer",
      "English Premier League",
      "Do Not Repeat Yourself",
      "Full Stack Javascript",
    ];
    for (let phrase of randomPhrases) {
      const cleanPhrase = phrase.replace(/[^A-Za-z\s]/g, "").trim(); // only letters & spaces
      this.phrases.push(new Phrase(cleanPhrase));
    }
    this.activePhrase = null;
  }

  /**
   * Method startGame()
   * Hides start screen overlay, sets activePhrase to random phrase and adds it to  the display.
   */
  startGame() {
    // Resets Game
    const phraseDiv = document.getElementById("phrase");
    phraseDiv.firstElementChild.innerHTML = "";
    // Enables all onscreen keyboard buttons
    const keyboardButtons = document.getElementsByClassName("key");
    for (let key of keyboardButtons) {
      key.disabled = false;
      key.className = "key";
    }
    // Reset all of the heart images
    const lifeImgsContainer = document.getElementsByClassName("tries");
    for (let imgParent of lifeImgsContainer) {
      imgParent.firstElementChild.src = "./images/liveHeart.png";
      imgParent.firstElementChild.className = ""; // reset class for css purposes
    }
    // Hides start screen overlay
    const startScreenOverlay = document.getElementById("overlay");
    startScreenOverlay.style.display = "none";

    this.activePhrase = this.getRandomPhrase();
    // randomly getting console log errors that activePhrase was undefined, added loop to keep trying to get a random phrase until it succeeds.
    while (this.activePhrase === undefined) {
      this.activePhrase = this.getRandomPhrase();
    }
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Method getRandomPhrase()
   * Randomly retrieves one of the phrases stored in the phrases array and returns it.
   * @returns {Phrase} - random phrase object
   */
  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * 6); // random number 0-5
    return this.phrases[randomNumber];
  }

  /**
   * Methode handleInteraction()
   * Controls most of the game logic.
   * Checks if button matches a phrase letter then disables letter’s onscreen keyboard button. Wrong guesses calls the removeLife(). Correct guesses calls showMatchedLetter() and checkForWin() and calls gameOver() if game is won.
   * @param {button} key - onscreen keyboard button
   */
  handleInteraction(key) {
    const letter = key.innerText;
    key.disabled = true;
    // letter found
    if (this.activePhrase.checkLetter(letter)) {
      key.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) this.gameOver("win");
    }
    // letter not found
    else {
      key.classList.add("wrong");
      this.removeLife();
    }
  }

  /**
   * Method removeLife()
   * Removes life from scoreboard, increments missed property. Five misses calls gameOver().
   */
  removeLife() {
    this.missed++;
    const lifeImgsContainer = document.getElementsByClassName("tries");
    lifeImgsContainer[5 - this.missed].firstElementChild.src =
      "./images/lostHeart.png";
    lifeImgsContainer[5 - this.missed].firstElementChild.className = "disabled"; // for css purposes
    if (this.missed === 5) this.gameOver("loss");
  }

  /**
   * Method checkForWin()
   * Checks if all of the letters in the active phrase have been guessed.
   * @returns {boolean} - true|false if game is won
   */
  checkForWin() {
    const phraseLettersLIs = document.getElementsByClassName("letter");
    for (let letterLI of phraseLettersLIs) {
      if (letterLI.classList.contains("hide")) return false;
    }
    return true;
  }

  /**
   * Method gameOver()
   * Displays start screen overlay, and depending game outcome updates the overlay with either the win or lose CSS styling.
   * @param {string} result - win|loss
   */
  gameOver(result) {
    // display start screen
    const startScreenOverlay = document.getElementById("overlay");
    startScreenOverlay.style.display = "";

    const gameOverMessageH1 = document.getElementById("game-over-message");
    // game won
    if (result === "win") {
      gameOverMessageH1.innerHTML = "Congradulations! You win!";
      startScreenOverlay.className = "win";
    }
    // game lost
    else {
      gameOverMessageH1.innerHTML = "Sorry! You lose, better luck next time!";
      startScreenOverlay.className = "lose";
    }
  }
}
