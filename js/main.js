var questionsAnswered,
    questionsRight,
    questionsWrong,
    input;

function startGame() {
    var button = document.getElementById("start-button");
    button.style.display = "none";
    parentDiv = document.querySelector(".container");

    questionsAnswered = 0;
    questionsRight = 0;
    questionsWrong = 0;

    getCountries();
}

function getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => {

            /// Get countries

            let randomElement = data[Math.floor(Math.random() * data.length)];
            var rightCountry = randomElement;
            var wrongCountries = [];

            for (let i = 0; i < 3; i++) {
                let randomElement = data[Math.floor(Math.random() * data.length)];
                wrongCountries.push(randomElement);
            }


            /// Setup board
            parentDiv.innerHTML += "<div class='question-container'></div>";
            var questionContainer = document.querySelector(".question-container");

            questionContainer.innerHTML = "";
            questionContainer.innerHTML += "<img class='quiz-image' src='" + rightCountry.flag + "'>";

            var hasRight = false;
            for (let i = 0; i < 4; i++) {
                if (i == 3 && !hasRight) {
                    input = $("<input type=submit value='" + rightCountry.name + "'>")
                        .click(function() {
                            reviewQuestion(this.value, rightCountry.name);
                        })
                        .appendTo(questionContainer);
                    hasRight = true;
                }

                if (!hasRight) {
                    var rand = (Math.random() * 4) + 1;
                    if (rand == 0) {
                        if (!hasRight) {
                            input = $("<input type=submit value='" + rightCountry.name + "'>")
                                .click(function() {
                                    reviewQuestion(this.value, rightCountry.name);
                                })
                                .appendTo(questionContainer);
                            hasRight = true;
                        }
                    } else {
                        input = $("<input type=submit value='" + wrongCountries[i].name + "'>")
                            .click(function() {
                                reviewQuestion(this.value, rightCountry.name);
                            })
                            .appendTo(questionContainer);
                    }
                }
            }
        })
};



function reviewQuestion(a, rightAnswer) {
    if (a == rightAnswer) {
        questionsRight++;
    } else {
        questionsWrong++;
    }

    questionsAnswered++;

    if (questionsAnswered == 10) {
        showScore();
    } else {
        getCountries();
    }
}

function showScore() {
    var questionContainer = document.querySelector(".question-container");
    questionContainer.innerHTML =
        "<div class='score-container'>" +
        "<h1>Your score:</h1>" +
        "<h3>" + questionsRight + "/" + (questionsWrong + questionsRight) + "</h3>" +
        "<input type='submit' value='Retry' onclick='startGame();'" +
        "</div>";
}

function stopGame() {
    var button = document.getElementById("start-button");
    button.style.display = "block";
}
