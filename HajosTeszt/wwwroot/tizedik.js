window.onload = function () {
    letöltés();

}

var sorszam = 0;
var kérdések;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

fetch("questions/count")
    .then(result => result.text())
    .then(n => { numberOfQuestions = parseINT(n) })

document.getElementById("előre_gomb").addEventListener("click", előre);
document.getElementById("vissza_gomb").addEventListener("click", vissza);

if (localStorage.getItem("hotList")) {
    hotList = JSON.parse(localStorage.getItem("hotlist"))

}

if (localStorage.getItem("displayedQuestion")) {
    hotList = JSON.parse(localStorage.getItem("displayedQuestion"))

}

if (hotList === 0) {
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltése(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(/questions/${ questionNumber })
        .then(result => {
            if (!result.ok) {
                console.error(Hibás letöltés: ${ result.status });
                return null;
            }
            else {
                reutrn result.json()
            }

        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(A ${ questionNumber }.kérdés letöltve a hot list ${ destination }.helyére)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );

    function kérdésMegjelenítés() {
        let kérdés = hotList[displayedQuestion].question;
        console.log(kérdés);
        document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
        document.getElementById("válasz1").innerText = kérdés.answer1;
        document.getElementById("válasz2").innerText = kérdés.answer2;
        document.getElementById("válasz3").innerText = kérdés.answer3;

        if (kérdés.image) {
            document.getElementById("kép").src = kérdés.image;
            document.getElementById("kép").style.display = "block";
        }
        else {
            document.getElementById("kép").style.display = "none";
        }

        for (var i = 0; i <= 3; i++) {
            document.getElementById("válasz" + i).classList.remove("jó", "rossz")
            document.getElementById("válaszok").style.pointerEvents = "auto";

        }


    }
    document.addEventListener("DOMConetntLoaded", init);

    function előre() {
        clearTimeout(timeHandler);
        displayedQuestion++;
        if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés;


    }

    function vissza() {
        displayedQuestion--;
        if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
        kérdésMegjelenítés;
    }

    function választás(n) {
        let kérdés = hotList[displayedQuestion].question;
        if (n === kérdés.correctAnswer) {
            document.getElementById("válasz" + n).classList.add("jó")
            hotList[displayedQuestion].goodAnswers++;
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;

        }
        else {
            document.getElementById("válasz" + n).classList.add("rossz")
            document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
            hotList[displayedQuestion].goodAnswers = 0;
        }

        document.getElementById("válaszok").style.pointerEvents = "none";
        timeHandler = setTimeout(előre, 3000);

        localStorage.setItem("hotlist", JSON.stringify(hotList));
        localStorage.setItem("displayedQuestion", displayedQuestion);
        localStorage.setItem("nextQuestion", nextQuestion);



    }
