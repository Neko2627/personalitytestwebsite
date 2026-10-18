const intro = document.getElementById("intro-id");
const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", function (){
    intro.style.display = "none";
    quiz.style.display = "block";
});


const resultBtn = document.getElementById("result-btn");
const resultP = document.getElementById("result");
const resultSection = document.getElementById("result-section");

resultBtn.addEventListener("click", function () {

    // 1. Collect the selected answers
    const answers = {};

    for (let i = 1; i <= 24; i++) {
        const selected = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        // Stop if a question is unanswered
        if (!selected) {
            resultDiv.textContent =
                `Please answer question ${i} before submitting.`;

            document.querySelector(`input[name="q${i}"]`)
                .closest(".question")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            return;
        }

        answers[i] = Number(selected.value);
    }

    // 2. Define which personality preference
    // each question measures
    const dimensions = {
        EI: [
            ["E", 1], ["E", 2], ["I", 3],
            ["E", 4], ["I", 5], ["E", 6]
        ],
        SN: [
            ["S", 7], ["N", 8], ["S", 9],
            ["N", 10], ["S", 11], ["N", 12]
        ],
        TF: [
            ["T", 13], ["F", 14], ["T", 15],
            ["F", 16], ["T", 17], ["F", 18]
        ],
        JP: [
            ["J", 19], ["P", 20], ["J", 21],
            ["P", 22], ["J", 23], ["P", 24]
        ]
    };

    // 3. Calculate the four dimensions
    function getPreference(questions, first, second) {
        let score = 0;

        for (const [preference, questionNumber] of questions) {
            // Agree = positive; disagree = negative
            const responseScore = 3 - answers[questionNumber];

            if (preference === first) {
                score += responseScore;
            } else {
                score -= responseScore;
            }
        }

        return score >= 0 ? first : second;
    }

    const type =
        getPreference(dimensions.EI, "E", "I") +
        getPreference(dimensions.SN, "S", "N") +
        getPreference(dimensions.TF, "T", "F") +
        getPreference(dimensions.JP, "J", "P");

    // 4. Show the result
    resultP.textContent = `Your personality type is ${type}!`;

    // Hide the quiz section
    quiz.style.display = "none";

// Show the results section
    resultSection.style.display = "block";

    // 5. Save the answers for later use in this page
    console.log("Recorded answers:", answers);
    console.log("Personality type:", type);
});

