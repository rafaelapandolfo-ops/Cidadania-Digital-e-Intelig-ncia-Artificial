// Base estruturada de dados dos Quizzes Avançados
const academicQuizSystem = {
    easy: [
        {
            q: "No escopo normativo da Cidadania Digital, qual dimensão trata diretamente dos mecanismos preventivos contra a violação de dados e crimes de identidade causados por IA?",
            options: [
                "Acesso Digital Coletivo.",
                "Segurança Digital (Proteção de Identidade e Dados).",
                "Comércio Eletrônico Expandido.",
                "Etiqueta de Redes Sociais Curtas."
            ],
            correct: 1,
            explain: "Correto. A Segurança Digital define os critérios éticos, jurídicos e de comportamento ativo necessários para proteger a integridade informacional dos usuários."
        }
    ],
    medium: [
        {
            q: "Considerando a engenharia das Redes Adversárias Generativas (GANs), qual o objetivo principal do algoritmo do 'Gerador' durante o ciclo de treinamento?",
            options: [
                "Catalogar metadados estruturais de imagens reais para servidores externos.",
                "Sintetizar dados artificiais altamente realistas a partir de vetores de ruído para burlar a validação do Discriminador.",
                "Criptografar arquivos de mídia para impedir acessos não autorizados.",
                "Reduzir de forma estática o contraste RGB das bordas de arquivos JPEG."
            ],
            correct: 1,
            explain: "Exato. O Gerador cria mídias falsas iterativamente com o objetivo direto de simular a distribuição estatística de dados reais e enganar o Discriminador."
        }
    ],
    hard: [
        {
            q: "No domínio da forense digital, qual metodologia é aplicada para identificar deepfakes de vídeo mapeando variações cromáticas na epiderme causadas por batimentos cardíacos humanos?",
            options: [
                "Análise bidimensional estática de metadados de cabeçalho EXIF.",
                "Filtragem bilinear clássica por interpolação de matriz espacial.",
                "Fotoplethysmografia Remota (rPPG).",
                "Varredura simétrica de compressão quantizada de blocos MPEG."
            ],
            correct: 2,
            explain: "Brilhante! A técnica rPPG detecta variações volumétricas imperceptíveis no fluxo sanguíneo do rosto. Módulos geradores tradicionais de IA criam frames estáticos e falham em replicar essa biologia."
        }
    ]
};

// Gerenciador de Estados (SPA)
let activeLevel = 'easy';
let currentQuestionIndex = 0;
let userScore = 0;

// Navegação do Sistema de Pastas
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
    
    // Atualizar os seletores do menu superior caso a chamada ocorra de botões internos
    document.querySelectorAll('.tab-link').forEach(btn => {
        if(btn.getAttribute('data-tab') === tabId) {
            document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
}

// Inicialização dos Eventos dos Quizzes
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
                <h3>Avaliação do Módulo Concluída</h3>
                <p style="color: var(--text-secondary); font-size:0.9rem; margin-top:0.5rem;">Seu aproveitamento indica conformidade técnica com critérios universitários.</p>
            </div>
        `;
        
        if (userScore === academicQuizSystem[activeLevel].length) {
            confetti({
                particleCount: 140,
                spread: 85,
                origin: { y: 0.65 },
                colors: ['#6366f1', '#4f46e5', '#10b981']
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
        feedbackText.style.color = 'var(--emerald-green)';
        feedbackText.innerText = qData.explain;
        userScore++;
    } else {
        clickedBtn.classList.add('wrong');
        allOptions[qData.correct].classList.add('correct');
        feedbackText.style.color = 'var(--rose-red)';
        feedbackText.innerText = "Alternativa incorreta. O gabarito com a fundamentação conceitual científica foi destacado em verde.";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        buildQuestionUI();
    }, 4500);
}

// Carregamento Inicial do App
window.addEventListener('DOMContentLoaded', () => {
    buildQuestionUI();
});
