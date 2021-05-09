window.onload = function () {
    letöltés();

}

var sorszam = 0;
var kérdések;


function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
    válasz1.style.backgroundColor = "steelblue";
    válasz2.style.backgroundColor = "steelblue";
    válasz3.style.backgroundColor = "steelblue";
    válasz1.style.color = "#d8edf0";
    válasz2.style.color = "#d8edf0";
    válasz3.style.color = "#d8edf0";

}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kerdesMegjelenites(0)
}

fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
);

fetch('/questions/1')
    .then(response => response.json())
    .then(data => kérdésMegjelenítés(data)
    );

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    

function vissza() {
    if (sorszam == 0) {
        sorszam = 2;
        letöltés();

    }
    else {
        sorszam = sorszam - 1;
        letöltés();
    }
}

function elore() {
    if (sorszam == 2) {
        sorszam = 0;
        letöltés();

    }
    else {
        sorszam = sorszam + 1;
        letöltés();
    }
}

function ellenorzes(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}