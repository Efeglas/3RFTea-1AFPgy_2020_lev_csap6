let cards = document.querySelector(".cards");
let cardsNum = 12;
let words = ["Könnyű", "Közepes", "Nehéz", "Memória", "Játék", "Kék", "Fehér", "Kutya", "Cica", "Hal"];

const createCard = (word) => {
    let div = document.createElement("div");
    div.classList.add("card");
    let div1 = document.createElement("div");
    div1.classList.add("backSide");
    div1.innerHTML = "M";
    let div2 = document.createElement("div");
    div2.classList.add("frontSide");
    div2.innerHTML = word;
    div.appendChild(div1);
    div.appendChild(div2);
    return div;
}

for (let i = 0; i < cardsNum / 2; i++) {
    
    cards.appendChild(createCard(words[i]));
    cards.appendChild(createCard(words[i]));
}