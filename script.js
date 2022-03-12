
const Random_Quote_Api_Url = "https://api.quotable.io/random";

const timer = document.getElementById("timer");
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");


// checking typing right or wrong
quoteInputElement.addEventListener('input', (event) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if(character == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }
        else if(character === characterSpan.innerText) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }
        else {
            characterSpan.classList.add("incorrect");
            arrayQuote[index].classList.remove("correct");
            correct = false;
        }
    });

    if(correct) {
        renderNewQuote();
    }
});


// get random quote
let getRandomQuote = () => {
    return fetch(Random_Quote_Api_Url)
    .then(response => response.json())
    .then(data => data.content)
}

// render random quote 
let renderNewQuote = async () => {
    const quote = await getRandomQuote();

    quoteDisplayElement.innerHTML = "";
    quoteInputElement.value = null;

    quote.split('').forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        // quoteDisplayElement.innerHTML+= `<span>${character}</span>`;
        quoteDisplayElement.appendChild(characterSpan);
    });

    setTimeout(() => {
        startTimer();
    }, 3000);
    // startTimer();
}

// timer
let startTime;
let startTimer = () => {
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}


let getTimerTime = () => {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();

