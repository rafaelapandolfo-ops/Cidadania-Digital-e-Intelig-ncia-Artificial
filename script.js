// Base de dados de alta densidade técnica para exames universitários
const academicQuizSystem = {
    easy: [
        {
            q: "No contexto normativo de Cidadania Digital e governança, qual dimensão trata diretamente dos mecanismos regulatórios e de segurança fundamentais para mitigar os ataques de identidade gerados por modelos computacionais sintéticos?",
            options: [
                "Comércio e Distribuição de Infraestrutura de Nuvem.",
                "Segurança Digital (Arquitetura de Proteção de Identidade e Dados).",
                "Universalização de Banda Larga Simétrica.",
                "Protocolos de Etiqueta Casual em Ambientes de Rede Síncronos."
            ],
            correct: 1,
            explain: "Correto. A dimensão de Segurança Digital abrange os mecanismos criptográficos, preventivos e comportamentais estruturais para blindar os ativos biométricos e identitários dos usuários na rede."
        }
    ],
    medium: [
        {
            q: "Durante o treinamento adversário de mídias sintéticas hiper-realistas baseadas em GANs, qual o comportamento matemático esperado das redes quando o sistema atinge o ponto ótimo conhecido como Equilíbrio de Nash?",
            options: [
                "O Gerador cessa o mapeamento latente por perda total de gradientes.",
                "O Discriminador atinge precisão perfeita de 100%, bloqueando a geração de novos artefatos digitais.",
                "O Gerador produz dados artificiais cuja distribuição de probabilidade replica perfeitamente os dados reais, fazendo com que a acurácia do Discriminador convirja para 50%.",
                "O sistema de retropropagação é desativado por estouro de memória local."
            ],
            correct: 2,
            explain: "Exato! No Equilíbrio de Nash das GANs, as mídias sintéticas produzidas pelo Gerador tornam-se estatisticamente idênticas às amostras reais, reduzindo o acerto do Discriminador a uma escolha puramente aleatória (50%)."
        }
    ],
    hard: [
        {
            q: "Em investigações avançadas de forense computacional, qual o fundamento biológico explorado pela metodologia de Fotoplethysmografia Remota (rPPG) para isolar deepfakes de vídeo de mídias legítimas?",
            options: [
                "A detecção de descontinuidades geométricas estáticas na matriz de compressão espacial JPEG.",
                "O mapeamento de flutuações microscópicas na refletância da luz causadas pelas variações do volume de sangue nos tecidos faciais sincronizados com o ciclo cardíaco.",
                "A análise de inconsistências textuais presentes nos metadados estruturais do arquivo conteinerizado.",
                "O cálculo de erro quantizado baseado na filtragem bilinear simétrica do canal alfa."
            ],
            correct: 1,
            explain: "Brilhante! A técnica de rPPG analisa as ondas de pulso cardíaco geradas pela circulação de sangue no rosto por meio de algoritmos de visão computacional. Modelos geradores comuns criam frames isolados e falham cronicamente em reproduzir essa assinatura biológica contínua."
        }
    ]
};

// Gerenciador de Estados SPA
let activeLevel = 'easy';
let currentQuestionIndex = 0;
let userScore = 0;

// Sistema de Chaveamento de Abas / Pastas
document.querySelectorAll('.tab-link').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const targetTab = this.getAttribute('data-tab');
        openTab(targetTab);
    });
});

function openTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`tab-${tabId}`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    // Sincronização dos seletores visuais do menu em chamadas de hiperlinks internos
    document.querySelectorAll('.tab-link').forEach(btn => {
        if(btn.getAttribute('data-tab') === tabId) {
            document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
}

// Ouvintes de Eventos para os Níveis de Quiz
document.getElementById('sel-easy').addEventListener('click', (e) => switchQuizModule('easy', e.target));
document.getElementById('sel-medium').addEventListener('click', (e) => switchQuizModule('medium', e.target));
document.getElementById('sel-hard').addEventListener('click', (e) => switchQuizModule('hard', e.target));

function switchQuizModule(level, element) {
    activeLevel = level;
    currentQuestionIndex = 0;
    userScore = 0;
    
    document.querySelectorAll('.lvl-selector').forEach(sel => sel.classList.remove('active'));
    element.classList.add('active');
    
    buildQuestionUI();
}

function buildQuestionUI() {
    const renderRoot = document.getElementById('quiz-dynamic-root');
    const qData = academicQuizSystem[activeLevel][currentQuestionIndex];

    if (!qData) {
        renderRoot.innerHTML = `
            <div class="score-screen">
                <div class="score-digits">${userScore} / ${academicQuizSystem[activeLevel].length}</div>
                <h3>Avaliação Forense Concluída</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.6rem;">Os parâmetros de resposta demonstram alta conformidade técnica com o framework científico.</p>
            </div>
        `;
        
        if (userScore === academicQuizSystem[activeLevel].length) {
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.65 },
                colors: ['#9d4edd', '#7b2cbf', '#10b981']
            });
        }
        return;
    }

    renderRoot.innerHTML = `
        <div class="question-text">${qData.q}</div>
        <div class="options-column">
            ${qData.options.map((opt, idx) => `
                <button class="quiz-opt-btn" data-choice="${idx}">${opt}</button>
            `).join('')}
        </div>
        <div class="feedback-area" id="quiz-feedback-anchor"></div>
    `;

    document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chosenIndex = parseInt(this.getAttribute('data-choice'));
            verifyUserChoice(chosenIndex, this);
        });
    });
}

function verifyUserChoice(chosenIdx, clickedBtn) {
    const qData = academicQuizSystem[activeLevel][currentQuestionIndex];
    const feedbackText = document.getElementById('quiz-feedback-anchor');
    const allOptions = document.querySelectorAll('.quiz-opt-btn');

    allOptions.forEach(b => b.disabled = true);

    if (chosenIdx === qData.correct) {
        clickedBtn.classList.add('correct');
        feedbackText.style.color = 'var(--emerald)';
        feedbackText.innerText = qData.explain;
        userScore++;
    } else {
        clickedBtn.classList.add('wrong');
        allOptions[qData.correct].classList.add('correct');
        feedbackText.style.color = 'var(--rose)';
        feedbackText.innerText = "Gabarito conceitual incorreto. A alternativa respaldada pela literatura acadêmica internacional foi destacada em verde.";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        buildQuestionUI();
    }, 4500);
}

// Inicialização síncrona pós-carregamento do DOM
window.addEventListener('DOMContentLoaded', () => {
    buildQuestionUI();
});
