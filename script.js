function verificar(resposta){

    const resultado = document.getElementById("resultado");

    if(resposta){
        resultado.innerHTML =
        "✅ Correto! Deepfakes são conteúdos manipulados por Inteligência Artificial.";
        resultado.style.color = "#22c55e";
    }else{
        resultado.innerHTML =
        "❌ Incorreto. Deepfakes são vídeos, áudios ou imagens alterados por IA.";
        resultado.style.color = "#ef4444";
    }
}
