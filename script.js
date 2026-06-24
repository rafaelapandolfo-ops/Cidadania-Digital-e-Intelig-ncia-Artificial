let score = 0;
let answered = false;

function answer(correct) {
const result = document.getElementById("result");
const scoreText = document.getElementById("score");

if (answered) return;

if (correct) {
result.innerText = "✔ Resposta correta!";
score++;
} else {
result.innerText = "❌ Resposta incorreta.";
}

scoreText.innerText = "Pontuação: " + score;
answered = true;
}

function scrollToContent() {
document.querySelector("#ia").scrollIntoView({
behavior: "smooth"
});
}
