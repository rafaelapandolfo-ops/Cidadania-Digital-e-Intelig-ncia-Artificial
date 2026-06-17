// Banco de dados de perguntas do Quiz
const quizData = [
    {
        question: "Você recebe um vídeo de uma figura pública declarando algo absurdo, mas o áudio está ligeiramente dessincronizado com os lábios. O que faz?",
        answers: [
            { text: "A) Compartilho imediatamente para alertar meus amigos o quanto antes.", correct: false, feedback: "❌ Cuidado! Espalhar mídias suspeitas alimenta a desinformação rapidamente." },
            { text: "B) Busco o mesmo assunto em portais de notícias confiáveis antes de interagir.", correct: true, feedback: "✅ Perfeito! O atraso labial é um sinal clássico de renderização falha em Deepfakes." },
            { text: "C) Comento atacando a pessoa no vídeo para gerar engajamento.", correct: false, feedback: "❌ Errado! Interagir com publicações falsas faz o algoritmo distribuí-las para mais pessoas." }
        ]
    },
    {
        question: "Ao analisar uma imagem suspeita na internet, qual destes detalhes costuma entregar que ela foi gerada por uma IA?",
        answers: [
            { text: "A) A imagem conter texto escrito em português perfeito.", correct: false, feedback: "❌ Incorreto. Geradores modernos já escrevem muito bem em múltiplos idiomas." },
            { text: "B) Dedos extras nas mãos, brincos assimétricos ou texturas de pele lisas demais.", correct: true, feedback: "✅ Exato! A IA tem extrema dificuldade em renderizar anatomia complexa e simetria de acessórios." },
            { text: "C) A presença obrigatória de uma marca d'água oficial escrito 'FALSO'.", correct: false, feedback: "❌ Errado. Criminosos removem assinaturas digitais antes de aplicar golpes." }
        ]
    },
    {
        question: "Um perfil idêntico ao de um familiar te liga por áudio clonado pedindo um Pix urgente devido a uma quebra de carro. Qual sua primeira barreira de defesa?",
        answers: [
            { text: "A) Fazer o envio na hora para ajudar, afinal a voz é idêntica.", correct: false, feedback: "❌ Perigo! Clonagem de voz exige apenas 3 segundos de amostra de áudio obtido em redes sociais." },
            { text: "B) Desligar e retornar para o número salvo na sua agenda ou fazer uma pergunta pessoal secreta.", correct: true, feedback: "✅ Excelente! Romper o canal direto e testar fatos que nenhuma IA saberia é a defesa máxima." },
            { text: "C) Bloquear a pessoa sem checar nada, ignorando o problema real.", correct: false, feedback: "❌ Incompleto. Pode ser uma emergência real; certificar-se de forma segura é o ideal." }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackElement = document.getElementById('quiz-feedback');
const nextButton = document.getElementById('next-btn');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const profileText = document.getElementById('profile-text');

// Barra de progresso baseada na rolagem da tela
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.style.display = "block";
    resultBox.style.display = "none";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('options-btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    feedbackElement.style.display = "none";
    nextButton.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(answer, selectedBtn) {
    // Desabilitar todos os botões após a escolha
    const buttons = optionsContainer.querySelectorAll('.options-btn');
    buttons.forEach(btn => btn.disabled = true);

    feedbackElement.innerText = answer.feedback;
    feedbackElement.style.display = "block";

    if (answer.correct) {
        selectedBtn.style.background = "#059669";
        selectedBtn.style.borderColor = "#10B981";
        feedbackElement.style.color = "#00D2FF";
        score++;
    } else {
        selectedBtn.style.background = "#DC2626";
        selectedBtn.style.borderColor = "#EF4444";
        feedbackElement.style.color = "#EF4444";
    }

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} questões!`;

    if (score === quizData.length) {
        profileText.innerText = "🕵️ Nível: Detetive Lendário! Suas defesas digitais estão atualizadas. Você consegue enxergar as manipulações algorítmicas de longe e protege a sociedade compartilhando responsabilidade.";
    } else if (score >= 1) {
        profileText.innerText = "🛡️ Nível: Cidadão Alerta. Você conhece os riscos fundamentais, mas pequenos truques de áudio ou vídeo gerados por IA ainda podem quebrar sua guarda. Atenção redobrada!";
    } else {
        profileText.innerText = "⚠️ Nível: Alvo Fácil. Você está confiando demais no que vê na internet. Lembre-se: na era sintética, se a notícia gera reações emocionais extremas, as chances de ser um embuste são gigantes.";
    }
}

function restartQuiz() {
    startQuiz();
}

// Inicializa o script quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
    startQuiz();
});
