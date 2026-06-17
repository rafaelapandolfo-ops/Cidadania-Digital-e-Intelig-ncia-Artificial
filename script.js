// Sistema Avançado de Análise de Padrões de Desinformação
function analyzeNews() {
    const input = document.getElementById('checker-input').value.trim();
    const resultDiv = document.getElementById('analysis-result');
    const resultText = document.getElementById('analysis-text');
    
    if (input === "") {
        alert("Por favor, digite um texto ou cole um link suspeito para realizar a varredura.");
        return;
    }

    resultDiv.style.display = "block";
    resultText.innerHTML = `
        <div class="analysis-step">
            <strong>🚨 1. Verificação de Viés e Carga Emocional:</strong><br>
            Frases bombásticas, uso excessivo de termos como "URGENTE", "CUIDADO" ou que geram pânico/revolta imediata são técnicas projetadas para desativar seu pensamento racional e forçar o compartilhamento.
        </div>
        <div class="analysis-step">
            <strong>🔍 2. Auditoria de Fontes e Cruzamento de Dados:</strong><br>
            Grandes portais, veículos oficiais de comunicação ou conselhos institucionais replicaram este exato fato? Se a história existe apenas em correntes de aplicativos ou perfis anônimos, a probabilidade de fraude é de quase 100%.
        </div>
        <div class="analysis-step">
            <strong>🤖 3. Rastreamento de Anomalias de IA (Mídias Sintéticas):</strong><br>
            Se o conteúdo inclui fotos ou vídeos, procure por iluminação inconsistente, dentes fundidos, falhas na textura do fundo ou vozes sem variações naturais de respiração. A tecnologia evolui, mas deixa rastros técnicos matemáticos.
        </div>
        <div class="analysis-step">
            <strong>🛡️ 4. Protocolo do Cidadão Digital:</strong><br>
            Rompa o ciclo de contaminação. Na dúvida, não curta, não comente e jamais encaminhe o arquivo. O silêncio estratégico destrói a desinformação.
        </div>
    `;
}

// Banco de Dados Expandido do Quiz (Contém 5 Cenários Completos e Informativos)
const quizData = [
    {
        question: "Cenário 1: Você assiste a um pronunciamento urgente em vídeo de um governante relevante, mas nota um leve atraso do áudio em relação ao movimento da boca e transições bruscas de cena. Qual o procedimento correto?",
        answers: [
            { text: "A) Compartilhar o link o mais rápido possível para alertar amigos e familiares antes que saia do ar.", correct: false, feedback: "❌ Errado! O repasse precipitado favorece o espalhamento de conteúdos potencialmente adulterados e gera pânico desnecessário." },
            { text: "B) Cruzar o conteúdo do anúncio com canais de imprensa oficiais e agências de checagem antes de interagir.", correct: true, feedback: "✅ Correto! Falhas de sincronia labial, piscar de olhos ausente e pequenas oscilações de textura indicam renderização falha de Deepfake." },
            { text: "C) Deixar um comentário reativo na postagem para expor sua indignação com o fato.", correct: false, feedback: "❌ Errado! Interações e comentários em textos falsos aumentam o alcance orgânico da publicação nos algoritmos das redes sociais." }
        ]
    },
    {
        question: "Cenário 2: Ao checar uma imagem de protesto político altamente compartilhada na internet, qual destes indícios técnicos aponta diretamente que ela foi criada sinteticamente por uma IA?",
        answers: [
            { text: "A) A imagem exibir frases escritas em bom português com excelente resolução.", correct: false, feedback: "❌ Incorreto. Os motores textuais modernos integrados às IAs avançaram muito e raramente falham na ortografia básica." },
            { text: "B) Detalhes de dentes fundidos, brincos ou óculos assimétricos, e contornos de mãos borrados ou com 6 dedos.", correct: true, feedback: "✅ Excelente! Algoritmos de imagem geram detalhes finos por aproximação visual probabilística, falhando frequentemente na simetria anatômica e física." },
            { text: "C) A aplicação de uma marca d'água vermelha obrigatória com o logotipo da plataforma criadora.", correct: false, feedback: "❌ Incorreto. Versões customizadas de código aberto permitem criar arquivos sem nenhuma assinatura visual ou metadados de identificação." }
        ]
    },
    {
        question: "Cenário 3: Um áudio idêntico ao tom de voz de um familiar solicita uma transferência Pix imediata por mensagem privada, alegando um imprevisto médico de urgência. Qual a melhor linha de defesa?",
        answers: [
            { text: "A) Concluir a transação financeira de imediato devido à similaridade perfeita do timbre vocal.", correct: false, feedback: "⚠️ Perigo! Arquivos curtos de apenas 3 segundos extraídos de vídeos públicos em redes sociais bastam para clonar timbres de voz por inteligência artificial." },
            { text: "B) Encerrar o contato atual e realizar uma chamada direta para o número de telefone guardado na sua agenda telefônica oficial.", correct: true, feedback: "✅ Perfeito! Romper a ponte de comunicação suspeita e validar o fato por um canal alternativo e previamente seguro neutraliza a clonagem de áudio." },
            { text: "C) Bloquear o remetente sem realizar nenhuma verificação de segurança complementar ou aviso.", correct: false, feedback: "❌ Incompleto. Negligenciar sem validar pode deixar um parente desamparado em um cenário de perigo real. Faça a contraprova de forma segura." }
        ]
    },
    {
        question: "Cenário 4: Você lê um artigo que afirma que um novo remédio milagroso cura uma doença grave instantaneamente. O texto cita 'estudos internacionais', mas não traz links nem nomes de cientistas. O que fazer?",
        answers: [
            { text: "A) Consumir a informação como verdade, já que cita pesquisas internacionais.", correct: false, feedback: "❌ Errado. A ausência de fontes nomeadas ou links diretos para revistas científicas renomadas é o sintoma clássico de desinformação em saúde." },
            { text: "B) Pesquisar o nome do remédio no site oficial da ANVISA ou da Organização Mundial da Saúde.", correct: true, feedback: "✅ Perfeito! A cidadania digital exige que informações que afetam o bem-estar físico sejam validadas em bases de dados regulatórias oficiais." },
            { text: "C) Comprar o produto e repassar o texto nos grupos para ajudar outras pessoas enfermas.", correct: false, feedback: "❌ Perigoso! Compartilhar tratamentos falsos pode colocar vidas humanas em risco e configura um desserviço social grave." }
        ]
    },
    {
        question: "Cenário 5: O que define o conceito moderno de 'Cidadania Digital' diante do avanço desenfreado dos algoritmos e inteligências artificiais?",
        answers: [
            { text: "A) Utilizar a internet apenas para entretenimento, ignorando as discussões de segurança e privacidade.", correct: false, feedback: "❌ Incorreto. Isolar-se dos debates técnicos torna o usuário um alvo vulnerável para golpes financeiros e manipulação ideológica." },
            { text: "B) Compreender seus direitos e deveres na rede, consumindo conteúdo criticamente, protegendo dados e barrando notícias falsas.", correct: true, feedback: "✅ Perfeito! Ser um cidadão digital significa ter autonomia, agir com ética nas interações e atuar como um filtro saudável contra a poluição de dados." },
            { text: "C) Aceitar todos os termos de privacidade sem ler e compartilhar conteúdos que confirmam suas opiniões pessoais.", correct: false, feedback: "❌ Incorreto. O viés de confirmação (compartilhar algo só porque você quer que seja verdade) é o maior combustível da desinformação estruturada." }
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

// Barra de Progresso Dinâmica
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById('progress-bar');
    if(bar) bar.style.width = scrolled + '%';
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
