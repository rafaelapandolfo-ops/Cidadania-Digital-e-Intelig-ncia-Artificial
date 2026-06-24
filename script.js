let score = 0;
let answered = false;

function answer(correct) {

if (answered) return;

const result = document.getElementById("result");
const scoreText = document.getElementById("score");

if (correct) {
result.innerHTML = "✅ Correto! Deepfakes são conteúdos gerados por IA.";
result.style.color = "#34d399";
score++;
} else {
result.innerHTML = "❌ Resposta incorreta.";
result.style.color = "#f87171";
}

scoreText.innerHTML = "Pontuação: " + score;
answered = true;
}

function scrollToContent() {
document.getElementById("ia").scrollIntoView({
behavior: "smooth"
});
}
