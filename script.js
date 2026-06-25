// Garante a execução apenas após o carregamento completo do documento
document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.querySelector('.btn-neon');
  const mainTitle = document.querySelector('.card-premium h1');
  const mainText = document.querySelector('.card-premium p');

  // Padrão de segurança: validação de elementos
  if (!ctaButton || !mainTitle || !mainText) return;

  // Gerenciador de eventos limpo
  ctaButton.addEventListener('click', () => {
    // Transição de conteúdo controlada
    mainTitle.textContent = 'Jornada Iniciada 🚀';
    mainText.textContent = 'Seu código e interface estão prontos para o próximo nível.';
    
    // Desativação preventiva de cliques múltiplos
    ctaButton.textContent = 'Confirmado';
    ctaButton.disabled = true;
  });
});
