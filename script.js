let score = 0;
let answered = false;

function answer(correct) {
    const result = document.getElementById("result");
    const scoreText = document.getElementById("score");

    if (answered) return;

    if (correct) {
        result.innerHTML = "✅ Correto! Deepfakes são conteúdos gerados por IA.";
        result.style.color = "lightgreen";
        score++;
    } else {
        result.innerHTML = "❌ Incorreto. Tente novamente.";
        result.style.color = "red";
    }

    scoreText.innerHTML = "Pontuação: " + score;
    answered = true;
}

function scrollToSection() {
    document.getElementById("ia").scrollIntoView({ behavior: "smooth" });
}
