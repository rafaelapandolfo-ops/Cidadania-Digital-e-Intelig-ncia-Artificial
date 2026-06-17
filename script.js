// Sistema do Simulador de Análise
function analyzeNews() {
    const input = document.getElementById('checker-input').value.trim();
    const resultDiv = document.getElementById('analysis-result');
    const resultText = document.getElementById('analysis-text');
    
    if (input === "") {
        alert("Por favor, insira um texto ou link para prosseguir.");
        return;
    }

    resultDiv.style.display = "block";
    resultText.innerHTML = "🔍 <strong>Avaliando padrões estruturais...</strong><br><br>" +
        "1. <strong>Apelo Emocional Detectado:</strong> Textos alarmistas tendem a forçar compartilhamentos rápidos.<br>" +
        "2. <strong>Próximo Passo Recomendado:</strong> Copie os termos centrais dessa mensagem e pesquise em agências de checagem confiáveis.<br>" +
        "3. <strong>Checklist Técnico:</strong> Se houver imagens anexas, verifique as bordas, sombras e fundos em busca de borrões incomuns gerados por IA.";
}

// Banco de Dados do Quiz
const quizData = [
    {
        question: "Você assiste a um pronunciamento urgente em vídeo, mas nota um leve atraso do áudio em relação ao movimento da boca. Qual o procedimento correto?",
        answers: [
            { text: "A) Compartilhar o link rapidamente para alertar os grupos familiares.", correct: false, feedback: "❌ Incorreto. O repasse precipitado favorece o espalhamento de conteúdos potencialmente adulterados." },
            { text: "B) Cruzar a informação com canais de imprensa oficiais antes de validar.", correct: true, feedback: "✅ Correto! Falhas de sincronia labial e pequenas oscilações de textura indicam renderização de Deepfake." },
            { text: "C) Ignorar e deixar um comentário reativo na postagem para expor indignação.", correct: false, feedback: "❌ Incorreto. Interações com textos falsos aumentam o alcance orgânico da publicação nos algoritmos." }
        ]
    },
    {
        question: "Qual elemento visual listado abaixo ajuda a confirmar que um retrato digital foi gerado sinteticamente por IA?",
        answers: [
            { text: "A) A imagem apresentar legenda descritiva fluida e sem erros gramaticais.", correct: false, feedback: "❌ Incorreto. Motores textuais modernos operam perfeitamente na construção linguística." },
            { text: "B) Assimetria em acessórios (como brincos diferentes), dentes desalinhados e contornos de dedos imprecisos.", correct: true, feedback: "✅ Excelente! Algoritmos de imagem geram detalhes finos por aproximação estocástica, falhando frequentemente na simetria anatômica." },
            { text: "C) A aplicação compulsória de marcas d'água permanentes emitidas pelos desenvolvedores.", correct: false, feedback: "❌ Incorreto. Aplicações modificadas de código aberto permitem omitir metadados e assinaturas visuais originais." }
        ]
    },
    {
        question: "Um áudio idêntico ao tom de voz de um conhecido solicita uma transferência Pix imediata alegando um imprevisto urgente na estrada. Qual a melhor linha de defesa?",
        answers: [
            { text: "A) Concluir a transação financeira de imediato devido à similaridade perfeita do timbre vocal.", correct: false, feedback: "⚠️ Perigo! Arquivos curtos de 3 segundos extraídos de vídeos públicos bastam para clonar timbres de voz por redes neurais." },
            { text: "B) Encerrar o contato e realizar uma chamada direta para o número de telefone guardado na agenda oficial.", correct: true, feedback: "✅ Perfeito! Romper a ponte de comunicação suspeita e validar por canais previamente checados neutraliza tentativas de clonagem de áudio." },
            { text: "C) Bloquear o remetente sem realizar nenhuma verificação de segurança complementar.", correct: false, feedback: "❌ Incompleto. Ignorar pode deixar um conhecido desamparado em um cenário de emergência real. Avalie por canais validados." }
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

// Barra de Leitura Superior
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
    scoreText.innerText = `Pontuação Obtida: ${score} de ${quizData.length} acertos.`;

    if (score === quizData.length) {
        profileText.innerText = "🕵️ Nível: Detetive Lendário. Excelente! Suas competências analíticas de cidadania digital estão robustas. Você identifica mídias sintéticas com precisão e atua mitigando riscos na rede.";
    } else if (score >= 1) {
        profileText.innerText = "🛡️ Nível: Cidadão Alerta. Apresenta boa percepção sobre os riscos digitais cotidianos, contudo, traços sutis de engenharia de áudio sintético ainda podem contornar seus métodos protetivos.";
    } else {
        profileText.innerText = "⚠️ Nível: Vulnerável à Desinformação. Recomenda-se cautela redobrada. Evite tomar decisões imediatas baseadas no teor emotivo das mídias expostas e desenvolva o hábito de auditar fontes primárias.";
    }
}

function restartQuiz() {
    startQuiz();
}

window.onload = startQuiz;
