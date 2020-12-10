let cards = document.querySelector(".cards");
let cardsNum = 12;
let winScore = cardsNum / 2;
let actualScore = 0;
let words = ["Könnyű", "Közepes", "Nehéz", "Memória", "Játék", "Kék", "Fehér", "Kutya", "Cica", "Hal"];
let toggleOffClick = false;

let btnEasy = document.getElementById("diffBtnEasy");
let btnMedium = document.getElementById("diffBtnMedium");
let btnHard = document.getElementById("diffBtnHard");
let startBtn = document.getElementById("startBtn");

const createCard = (word, id) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.id = id;
    let div1 = document.createElement("div");
    div1.classList.add("backSide");
    div1.classList.add("active");
    div1.innerHTML = "M";
    let div2 = document.createElement("div");
    div2.classList.add("frontSide");
    div2.innerHTML = word;
    div.appendChild(div1);
    div.appendChild(div2);
    return div;
}



const flipBackAll = () => {
    Array.from(document.getElementsByClassName("card")).map((element) => {
        element.firstElementChild.classList.add("active");
        element.lastChild.classList.remove("active");
    });
}



const preventClick = (event) => {
    if (toggleOffClick) {
        event.stopPropagation();
        event.preventDefault();
    }
}

const preventClickEvents = () => {
    document.addEventListener("click", preventClick, true);
}
preventClickEvents();

const checkIfItsAMatch = (first, second) => {
    if (first.id != second.id) {
        if (first.id[0] == second.id[0]) {
            first.classList.add("correct");
            second.classList.add("correct");
            actualScore++;
            console.log(actualScore);
        }
    }
}

btnEasy.addEventListener("click", () => {
    cardsNum = 12;
    console.log(cardsNum);
});

btnMedium.addEventListener("click", () => {
    cardsNum = 16;
    console.log(cardsNum);
});

btnHard.addEventListener("click", () => {
    cardsNum = 20;
    console.log(cardsNum);
});

startBtn.addEventListener("click", () => {
    if (document.querySelector(".gameField").firstElementChild.classList.contains("active")) {
        document.querySelector(".gameField").firstElementChild.classList.remove("active");
        document.querySelector(".gameField").children[1].classList.add("active");
        console.log(cardsNum);

        for (let i = 0; i < cardsNum / 2; i++) {

            cards.appendChild(createCard(words[i], `${i}1`));
            cards.appendChild(createCard(words[i], `${i}2`));
        }

        let generatedCards = Array.from(document.getElementsByClassName("card"));
        console.log(generatedCards);

        for (const card of generatedCards) {
            card.style.order = Math.floor(Math.random() * (cardsNum + 1));
        }

        let counter = 0;
        

        let firstChosen = null;
        let secondChosen = null;

        generatedCards.map((element) => {
            element.addEventListener("click", (event) => {
                

                event.stopImmediatePropagation();
                let first = element.firstElementChild;
                let last = element.lastChild;
                if (first.classList.contains("active")) {
                    first.classList.remove("active");
                    last.classList.add("active");
                }
                if (counter == 0) {
                    firstChosen = element;
                } else {
                    secondChosen = element;
                }
                //console.log(firstChosen);
                //console.log(secondChosen);

                counter++;
                if (counter == 2) {
                    counter = 0;
                    toggleOffClick = true;
                    setTimeout(() => {
                        flipBackAll();
                        toggleOffClick = false;
                        checkIfItsAMatch(firstChosen, secondChosen);
                        firstChosen = null;
                        secondChosen = null;
                        if (actualScore >= winScore) {
                            document.querySelector(".gameField").children[1].classList.remove("active");
                            document.querySelector(".gameField").children[2].classList.add("active");
                            startBtn.innerHTML = "Új játék";
                        }
                    }, 1500);
                }
                //console.log(counter);
            });
        }, true);
    } else {
        //resetelés
        document.querySelector(".gameField").children[2].classList.remove("active");
        document.querySelector(".gameField").firstElementChild.classList.add("active");
        startBtn.innerHTML = "Játék indítása";
        actualScore = 0;
        document.querySelector(".cards").innerHTML = "";
    }
});

