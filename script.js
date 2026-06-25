// Aguarda o DOM estar pronto para evitar erros de elemento nulo
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('.btn-interativo');
  const titulo = document.querySelector('.card h1');

  // Verifica se os elementos existem antes de aplicar o evento
  if (botao && titulo) {
    botao.addEventListener('click', () => {
      titulo.textContent = 'Ação Executada! 🎉';
      botao.textContent = 'Feito!';
      botao.disabled = true; // Evita cliques duplos desnecessários
    });
  }
});
