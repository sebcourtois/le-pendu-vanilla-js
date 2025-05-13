import { words } from "./dico.js";

function makeLetterKeyElement(letter) {
    const html = `<p class="letter-key">${letter}</p>`
    const template = document.createElement("template")
    template.innerHTML = html
    return template.content.firstElementChild
}

const keyboardElem = document.querySelector("#keyboard")
for (let letter of "abcdefghijklmnopqrstuvwxyz".toUpperCase()) {
    keyboardElem.appendChild(makeLetterKeyElement(letter))
}

function randomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex)
}

function replaceDiacritics(word) {
    return word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

function pickWord() {
    return words[randomIndex(words.length)]
}

const someWord = replaceDiacritics(pickWord()).toUpperCase()
const secretWordElem = document.querySelector("#secret_word")
secretWordElem.textContent = someWord.replace(/\w/g, "_")

let missCount = 0
let gameOver = false
const penduImgElem = document.querySelector("#img_du_pendu")
const usedLetters = []

function revealLetter(letter) {
    const hidden_letters = Array.from(secretWordElem.textContent)
    for (let [i, l] of Array.from(someWord).entries()) {
        if (l === letter) hidden_letters[i] = letter
    }
    secretWordElem.textContent = hidden_letters.join("")
}

function disableLetterKey(letterKeyElem) {
    usedLetters.push(letterKeyElem.textContent)
    letterKeyElem.dataset.disabled = "true"
}

function onLetterClicked(event) {
    if (gameOver) return

    const letter = event.target.textContent
    if (usedLetters.includes(letter)) {
        return
    }
    disableLetterKey(event.target)

    if (someWord.indexOf(letter) < 0) {
        console.log(`Pas de lettre ${letter}`)
        missCount += 1
        penduImgElem.src = `images/${missCount}.png`
        if (missCount >= 9) {
            gameOver = true
            secretWordElem.textContent = someWord
            secretWordElem.style.color = "red"
            secretWordElem.innerHTML = "🙈🙅<br>" + secretWordElem.textContent + "<br>🤦👎"
        }
        return
    }

    console.log(letter)
    revealLetter(letter)
    if (secretWordElem.textContent === someWord) {
        gameOver = true
        secretWordElem.style.color = "yellowgreen"
        secretWordElem.innerHTML = "👏✌<br>" + secretWordElem.textContent + "<br>👍👏"
        penduImgElem.src = "images/win.png"
    }
}

const foundElements = document.querySelectorAll(".letter-key")
for (let letterKeyElem of foundElements) {
    letterKeyElem.addEventListener("click", onLetterClicked)
}