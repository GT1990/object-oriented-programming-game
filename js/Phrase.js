/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  /**
   * Constructor
   * Receives a phrase parameter and initializes the phrase property in all lowercase.
   * @param {string} phrase
   */
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Method addPhraseToDisplay()
   * Adds letter placeholders (empty box) to the display when the game starts.
   */
  addPhraseToDisplay() {
    const phraseContainer_UL =
      document.getElementById("phrase").firstElementChild;
    /**
     * Function createCharacterLI()
     * Receives a character and creates a li element for letters and spaces adding them all to the phrase container ul element.
     * @param {string} char - character
     */
    function createCharacterLI(char) {
      const li = document.createElement("li");
      if (char === " ") {
        // if space character
        li.className = "space";
        li.innerHTML = " ";
      } else {
        // if letter
        li.className = `hide letter ${char}`;
        li.innerHTML = char;
      }
      phraseContainer_UL.appendChild(li);
    }
    for (let char of this.phrase) {
      createCharacterLI(char);
    }
  }

  /**
   * Method checkLetter()
   * Checks to see if the letter selected by the player matches a letter in the phrase.
   * @param {string} letter - char
   * @returns {boolean}
   */
  checkLetter(letter) {
    if (this.phrase.indexOf(letter) !== -1) return true;
    return false;
  }

  /**
   * Methode showMatchedLetter()
   * Reveals the letter(s) on the board that matches the player's selection.
   * @param {string} letter - char
   */
  showMatchedLetter(letter) {
    const matchedLetterElements = document.getElementsByClassName(letter);
    for (let li of matchedLetterElements) {
      li.classList.remove("hide");
      li.classList.add("show");
    }
  }
}
