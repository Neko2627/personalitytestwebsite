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
const description = document.getElementById("description");

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

    const resultDescription = {
        INTJ: "INTJ (The Architect): Strategic, independent, and analytical problem-solvers. They are motivated by understanding complex systems and continuously improving processes.",
        INTP: "INTP (The Thinker): Curious, analytical, and highly philosophical innovators. They are fascinated by conceptual models, theories, and objective, logical truth.",
        ENTJ: "ENTJ (The Commander): Assertive, decisive, and goal-oriented leaders. They excel at organizing people, maximizing efficiency, and executing long-term plans.",
        ENTP: "ENTP (The Debater): Inventive, energetic, and quick-witted intellectual innovators. They love to explore new ideas, challenge conventions, and engage in open debate.",
        INFJ: "INFJ (The Advocate / Counselor): Creative, idealistic nurturers driven by a strong sense of personal integrity. They possess deep relational intuition and strive to help others fulfill their potential.",
        INFP: "INFP (The Mediator / Healer): Gentle, quiet idealists who are guided by deep personal values and morals. They seek internal authenticity and meaning in everything they do.",
        ENFJ: "ENFJ (The Protagonist): Charismatic, inspiring, and people-focused helpers. They have a natural gift for reading people, building consensus, and motivating others to grow.",
        ENFP: "ENFP (The Campaigner / Champion): Enthusiastic, creative, and free-spirited creators. They constantly explore new possibilities and thrive on emotional, authentic connections.",
        ISTJ: "ISTJ (The Logistician / Inspector): Dependable, disciplined, and practical. They value rules, duty, and tradition, relying on concrete facts and methodical execution.",
        ISFJ: "ISFJ (The Defender): Warm, loyal, and nurturing protectors. They carefully observe the needs of others and are dedicated to maintaining security and harmony.",
        ESTJ: "ESTJ (The Executive): Organized, confident, and highly practical. They are natural organizers who believe in structure, clear rules, and getting things done efficiently.",
        ESFJ: "ESFJ (The Consul): Caring, sociable, and highly attentive to others. They thrive on community connection, social traditions, and ensuring everyone is well taken care of.",
        ISTP: "ISTP (The Virtuoso): Independent, adaptable, and action-oriented. They love exploring how things work through direct experimentation and solving concrete, technical problems.",
        ISFP: "ISFP (The Adventurer): Gentle, highly sensitive, and deeply artistic. They value authenticity, free expression, and experiencing life through their senses and feelings.",
        ESTP: "ESTP (The Entrepreneur): Bold, energetic, and thrill-seeking. They excel at fast decisions, adapting immediately to physical situations, and navigating direct challenges.",
        ESFP: "ESFP (The Entertainer): Playful, expressive, and full of life. They enjoy entertaining others, creating a vibrant atmosphere, and making the most out of the present moment.",};

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
    description.textContent = resultDescription[type];


    // Hide the quiz section
    quiz.style.display = "none";

// Show the results section
    resultSection.style.display = "block";

    // 5. Save the answers for later use in this page
    console.log("Recorded answers:", answers);
    console.log("Personality type:", type);
});

