let score = 0;
let answered = false;

function answer(correct) {
if (answered) return;

let result = document.getElementById("result");
let scoreText = document.getElementById("score");

if (correct) {
result.innerHTML = "✔ Correto!";
score++;
} else {
result.innerHTML = "❌ Errado!";
}

scoreText.innerHTML = "Pontuação: " + score;
answered = true;
}

function scrollToContent() {
document.getElementById("ia").scrollIntoView({ behavior: "smooth" });
}

/* PARTICULAS REAIS */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
particles.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 2,
dx: (Math.random() - 0.5),
dy: (Math.random() - 0.5)
});
}

function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#7c3aed";

particles.forEach(p => {
ctx.beginPath();
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
ctx.fill();

p.x += p.dx;
p.y += p.dy;

if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
});

requestAnimationFrame(animate);
}

animate();
