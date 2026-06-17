// SIMULADOR 1: VARREDURA FACIAL DE DEEPFAKE
function iniciarMapeamento() {
    const containerVideo = document.querySelector('.container-video-ia');
    const porcentagemTexto = document.getElementById('porcentagem-ia');
    
    containerVideo.classList.add('rostate-animada');
    let progresso = 0;
    
    const intervalo = setInterval(() => {
        progresso += 5;
        porcentagemTexto.innerText = progresso + "%";
        
        if (progresso >= 100) {
            clearInterval(intervalo);
            porcentagemTexto.innerText = "100% (MAPEAMENTO CONCLUÍDO)";
            alert("🔒 Alerta Técnico: Malha labial convertida. Este tipo de vetorização permite que golpistas troquem o rosto de qualquer pessoa em vídeos.");
            containerVideo.classList.remove('rostate-animada');
        }
    }, 150);
}

// SIMULADOR 2: CLONAGEM DE VOZ VIA SÍNTESE DE ÁUDIO REAL DO NAVEGADOR
function tocarAudioSimulado() {
    const ondaSom = document.getElementById('onda-som');
    ondaSom.classList.add('onda-animada');

    // Cria um sintetizador eletrônico nativo do navegador
    const sintetizador = window.speechSynthesis;
    const mensagem = new SpeechSynthesisUtterance("Alerta do sistema. Esta é uma simulação de voz computadorizada artificial baseada em amostras coletadas na internet. Cuidado com o que você ouve.");
    mensagem.lang = 'pt-BR';
    mensagem.rate = 1.1;

    mensagem.onend = function() {
        ondaSom.classList.remove('onda-animada');
    };

    sintetizador.speak(mensagem);
}

// AUDITORIA CRÍTICA DE MÍDIA
function processarAuditoriaMidia() {
    const busca = document.getElementById('input-noticia').value.trim();
    const painel = document.getElementById('resultado-verificacao');
    const resultadoTexto = document.getElementById('texto-resultado');

    if (busca === "") {
        alert("Por favor, digite alguma frase ou tema para prosseguir com a triagem.");
        return;
    }

    painel.style.display = "block";
    resultadoTexto.innerHTML = "• <strong>Análise de Gatilho de Pânico:</strong> O texto digitado possui características comuns de engenharia social voltadas a causar urgência.<br><br>" +
        "• <strong>Contraprova de Segurança:</strong> Copie os nomes centrais e verifique se o evento consta em portais de notícias tradicionais e agências reguladoras.<br><br>" +
        "• <strong>Rastro de Manipulação IA:</strong> Caso haja áudio anexo, ouça com fones de ouvido procurando por cliques de corte mecânico ou robóticos nas consoantes.";
}

// BANCO DE DADOS E LÓGICA DO QUIZ
const dadosDoQuiz = [
    {
        pergunta: "Caso 1: Você recebe um vídeo de uma autoridade declarando uma medida absurda. O movimento dos dentes está borrado e a fala não tem pausas para respiração natural. O que fazer?",
        opcoes: [
            { texto: "A) Compartilhar urgentemente para alertar conhecidos.", correta: false, feedback: "❌ Errado! Repassar materiais suspeitos propaga pânico social e boatos." },
            { texto: "B) Buscar a confirmação da notícia em portais institucionais oficiais.", correta: true, feedback: "✅ Correto! Voz robótica, dentes fundidos e ausência de respiração natural entregam Deepfakes." },
            { texto: "C) Deixar um comentário de ataque na postagem original.", correta: false, feedback: "❌ Errado! Comentários ajudam o algoritmo a distribuir posts falsos para mais pessoas." }
        ]
    },
    {
        pergunta: "Caso 2: Uma foto exibe um protesto de rua. Ao aproximar o zoom, você percebe que algumas pessoas ao fundo têm mãos com 6 dedos e óculos colados na pele. Qual o diagnóstico?",
        opcoes: [
            { texto: "A) É apenas um defeito físico natural na lente da câmera do fotógrafo.", correta: false, feedback: "❌ Incorreto. Falhas ópticas borram a imagem, mas não inventam anatomias novas." },
            { text: "B) Trata-se de uma mídia inteiramente sintética criada por Inteligência Artificial.", correta: true, feedback: "✅ Excepcional! Geradores de imagem erram severamente na simetria de dedos, brincos e óculos." },
            { texto: "C) É uma foto verdadeira que passou por ajustes básicos de cor e contraste.", correta: false, feedback: "❌ Errado. Mudanças de luz não criam membros humanos extras." }
        ]
    }
];

let indiceAtual = 0;
let acertos = 0;

const campoPergunta = document.getElementById('campo-pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const alertaFeedback = document.getElementById('alerta-feedback');
const btnProxima = document.getElementById('btn-proxima');
const blocoQuiz = document.getElementById('bloco-quiz');
const blocoResultadoFinal = document.getElementById('bloco-resultado-final');
const textoPlacar = document.getElementById('texto-placar');
const textoPerfil = document.getElementById('texto-perfil');

function iniciarQuiz() {
    indiceAtual = 0;
    acertos = 0;
    blocoQuiz.style.display = "block";
    blocoResultadoFinal.style.display = "none";
    btnProxima.style.display = "none";
    mostrarQuestao();
}

function mostrarQuestao() {
    alertaFeedback.style.display = "none";
    btnProxima.style.display = "none";
    caixaOpcoes.innerHTML = "";

    let questao = dadosDoQuiz[indiceAtual];
    campoPergunta.innerText = questao.pergunta;

    questao.opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.innerText = opcao.texto;
        btn.classList.add('botao-opcao');
        btn.addEventListener('click', () => checarResposta(opcao, btn));
        caixaOpcoes.appendChild(btn);
    });
}

function checarResposta(opcao, btnClicado) {
    const botoes = caixaOpcoes.querySelectorAll('.botao-opcao');
    botoes.forEach(b => b.disabled = true);

    alertaFeedback.innerText = opcao.feedback;
    alertaFeedback.style.display = "block";

    if (opcao.correta) {
        btnClicado.style.backgroundColor = "#059669";
        alertaFeedback.style.backgroundColor = "rgba(5, 150, 105, 0.2)";
        alertaFeedback.style.color = "#00D2FF";
        acertos++;
    } else {
        btnClicado.style.backgroundColor = "#DC2626";
        alertaFeedback.style.backgroundColor = "rgba(220, 38, 38, 0.2)";
        alertaFeedback.style.color = "#EF4444";
    }
    btnProxima.style.display = "inline-block";
}

function passarParaProximaPergunta() {
    indiceAtual++;
    if (indiceAtual < dadosDoQuiz.length) {
        mostrarQuestao();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    blocoQuiz.style.display = "none";
    blocoResultadoFinal.style.display = "block";
    textoPlacar.innerText = `Resultado da Análise: ${acertos} de ${dadosDoQuiz.length} acertos.`;

    if (acertos === dadosDoQuiz.length) {
        textoPerfil.innerText = "🕵️ Nível: Detetive Lendário! Suas defesas analíticas estão afiadas. Você sabe exatamente como auditar mídias sintéticas.";
    } else {
        textoPerfil.innerText = "⚠️ Nível: Alvo Fácil. Você confia muito no que assiste na internet. Lembre-se de sempre checar fontes institucionais.";
    }
}

function reiniciarSimuladorQuiz() {
    iniciarQuiz();
}

window.addEventListener('DOMContentLoaded', iniciarQuiz);
btnProxima.addEventListener('click', passarParaProximaPergunta);

// BARRA DE PROGRESSO DE ROLAGEM
window.addEventListener('scroll', () => {
    const topo = document.documentElement.scrollTop || document.body.scrollTop;
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPorcentagem = (topo / total) * 100;
    document.getElementById('barra-progresso').style.width = scrollPorcentagem + '%';
});
