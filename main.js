function makeLetterKeyElement(letter) {
    const html = `<p class="letter-key">${letter}</p>`
    const template = document.createElement("template")
    template.innerHTML = html
    return template.content.firstElementChild
}

function makeSecretLetterElement(letter) {
    const html = `<p class="secret-letter">${letter}</p>`
    const template = document.createElement("template")
    template.innerHTML = html
    return template.content.firstElementChild
}

const keyboardElem = document.querySelector("#keyboard")
for (let letter of "abcdefghijklmnopqrstuvwxyz".toUpperCase()) {
    keyboardElem.appendChild(makeLetterKeyElement(letter))
}

const some_word = "secretariat".toUpperCase()

const secretWordElem = document.querySelector("#secret_word")
secretWordElem.textContent = Array(some_word.length).fill("_").join("")


function revealLetter(letter) {
    const hidden_letters = Array.from(secretWordElem.textContent)

    for (let [i, l] of Array.from(some_word).entries()) {
        if (l === letter) hidden_letters[i] = letter
    }
    secretWordElem.textContent = hidden_letters.join("")
}

let missCount = 0;
const penduImg = document.querySelector("#img_du_pendu")

function onLetterClicked(event) {
    const letter = event.target.textContent

    if (some_word.indexOf(letter) < 0) {
        console.log(`Pas de lettre ${letter}`)
        missCount += 1
        penduImg.src = `images/${missCount}.png`
        return
    }
    console.log(letter)
    revealLetter(letter)
}

const foundElements = document.querySelectorAll(".letter-key")
for (let letterKeyElem of foundElements) {
    letterKeyElem.addEventListener("click", onLetterClicked)
}