// Banco de dados dinâmico do Quiz dividido por complexidade técnica
const quizData = {
    easy: [
        {
            q: "O que define essencialmente o termo 'Deepfake'?",
            options: [
                "Qualquer imagem editada rudimentarmente no Photoshop.",
                "Vídeos, fotos ou áudios alterados realisticamente usando algoritmos de Inteligência Artificial.",
                "Um vírus de computador que apaga mídias sociais.",
                "Mensagens de texto falsas enviadas via aplicativos de chat."
            ],
            correct: 1,
            explain: "Exato! As deepfakes utilizam redes neurais profundas (Deep Learning) para sintetizar mídias altamente realistas."
        },
        {
            q: "Qual a melhor postura inicial ao receber uma notícia alarmante de fonte desconhecida?",
            options: [
                "Compartilhar imediatamente para alertar conhecidos.",
                "Ignorar completamente sem checar o fato.",
                "Suspender o julgamento e checar em canais jornalísticos profissionais ou agências de checagem.",
                "Comentar na publicação criticando o autor sem base empírica."
            ],
            correct: 2,
            explain: "Perfeito. O ceticismo saudável e a verificação cruzada são pilares fundamentais da cidadania digital."
        }
    ],
    medium: [
        {
            q: "Qual arquitetura de rede neural revolucionou a criação de deepfakes hiper-realistas através do embate entre um gerador e um discriminador?",
            options: [
                "Redes Neurais Convolucionais (CNN)",
                "Redes de Aprendizado Por Reforço (RL)",
                "Redes Adversárias Generativas (GANs)",
                "Modelos Lineares de Regressão"
            ],
            correct: 2,
            explain: "Correto! As GANs colocam duas redes para competir, forçando o gerador a criar mídias cada vez mais indistinguíveis da realidade."
        },
        {
            q: "Como a desinformação otimizada por IA afeta o modelo de negócios das redes sociais tradicionais?",
            options: [
                "Reduz o engajamento porque as pessoas cansam de mentiras.",
                "Explora algoritmos de recomendação focados em engajamento emocional (indignação), maximizando o tempo de tela.",
                "Força as plataformas a retirarem voluntariamente todos os anúncios lucrativos.",
                "Não causa impacto financeiro ou estrutural mensurável."
            ],
            correct: 1,
            explain: "Precisamente. Conteúdos polarizadores e sintéticos geram reações emocionais fortes, o que prende a atenção do usuário na plataforma."
        }
    ],
    hard: [
        {
            q: "No contexto de forense digital, qual técnica avançada é utilizada para detectar inconsistências biológicas em deepfakes de vídeo?",
            options: [
                "Análise de metadados EXIF básicos do arquivo.",
                "Fotometria computadorizada clássica estática.",
                "Fotoplethysmografia de detecção de fluxo sanguíneo facial oculto (rPPG).",
                "Varredura simples de contraste RGB de borda."
            ],
            correct: 2,
            explain: "Incrível! A técnica rPPG analisa variações imperceptíveis na cor da pele causadas pelo fluxo sanguíneo, algo que geradores de IA comuns falham em replicar perfeitamente."
        },
        {
            q: "Qual o principal desafio regulatório internacional sobre a contenção de desinformação gerada por IA?",
            options: [
                "Falta de servidores globais para armazenar dados criptografados.",
                "Equilibrar a mitigação de danos à democracia sem violar direitos fundamentais à liberdade de expressão.",
                "A proibição total do uso de computadores quânticos por civis.",
                "A ausência completa de leis autorais no hemisfério ocidental."
            ],
            correct: 1,
            explain: "Brilhante. O limiar entre censura prévia de discurso político legítimo e combate técnico a vetores de desinformação maliciosa é o debate jurídico mais complexo da atualidade."
        }
    ]
};

let currentLevel = 'easy';
let currentQuestionIdx = 0;
let score = 0;

// Configuração dos ouvintes de eventos para navegação de nível
document.getElementById('btn-easy').addEventListener('click', (e) => changeLevel('easy', e.target));
document.getElementById('btn-medium').addEventListener('click', (e) => changeLevel('medium', e.target));
document.getElementById('btn-hard').addEventListener('click', (e) => changeLevel('hard', e.target));

function changeLevel(level, buttonElement) {
    currentLevel = level;
    currentQuestionIdx = 0;
    score = 0;
    
    // Atualiza classes ativas nos botões
    document.querySelectorAll('.btn-lvl').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    const container = document.getElementById('quiz-container');
    const data = quizData[currentLevel][currentQuestionIdx];

    // Verifica se as perguntas do nível atual terminaram
    if (!data) {
        container.innerHTML = `
            <div class="score-board">
                <div class="score-num">${score} / ${quizData[currentLevel].length}</div>
                <h3>Nível Concluído com Sucesso!</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Seu desempenho reflete um alto nível de criticidade informacional.</p>
            </div>
        `;
        
        // Se gabaritar, aciona a animação de confetes
        if (score === quizData[currentLevel].length) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8a2be2', '#a14dff', '#00ff88']
            });
        }
        return;
    }

    // Renderiza a pergunta e as opções
    container.innerHTML = `
        <div class="question">${data.q}</div>
        <div class="options-grid">
            ${data.options.map((opt, i) => `
                <button class="option-btn" data-index="${i}">${opt}</button>
            `).join('')}
        </div>
        <div class="feedback" id="feedback-box"></div>
    `;

    // Adiciona evento de clique para cada nova opção renderizada
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedIdx = parseInt(this.getAttribute('data-index'));
            checkAnswer(selectedIdx, this);
        });
    });
}

function checkAnswer(selectedIdx, btnElement) {
    const data = quizData[currentLevel][currentQuestionIdx];
    const feedbackBox = document.getElementById('feedback-box');
    const buttons = document.querySelectorAll('.option-btn');

    // Desabilita todos os botões para evitar cliques repetidos
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIdx === data.correct) {
        btnElement.classList.add('correct');
        feedbackBox.style.color = 'var(--accent-green)';
        feedbackBox.innerText = data.explain;
        score++;
    } else {
        btnElement.classList.add('wrong');
        buttons[data.correct].classList.add('correct');
        feedbackBox.style.color = 'var(--accent-red)';
        feedbackBox.innerText = `Incorreto. A resposta certa foi destacada na tela.`;
    }

    // Avança para a próxima pergunta após um delay de 4 segundos
    setTimeout(() => {
        currentQuestionIdx++;
        loadQuestion();
    }, 4000);
}

// Inicializa o primeiro carregamento quando a página abrir
window.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});
