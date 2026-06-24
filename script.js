let score = 0;
let answered = false;

function answer(correct) {
const result = document.getElementById("result");
const scoreText = document.getElementById("score");

if (!result || !scoreText) return;

if (answered) return;

if (correct) {
result.innerText = "✔ Correto!";
score++;
} else {
result.innerText = "❌ Errado!";
}

scoreText.innerText = "Pontuação: " + score;
answered = true;
}

function scrollToSection() {
document.getElementById("ia").scrollIntoView({
behavior: "smooth"
});
}

/* ===== PARTÍCULAS SEGURAS ===== */
const canvas = document.getElementById("bg");
if (canvas) {

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
particles.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: (Math.random() - 0.5) * 0.6,
vy: (Math.random() - 0.5) * 0.6,
r: Math.random() * 2
});
}

function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let p of particles) {
ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fillStyle = "#7c3aed";
ctx.fill();

p.x += p.vx;
p.y += p.vy;

if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
}

requestAnimationFrame(animate);
}

animate();

}
