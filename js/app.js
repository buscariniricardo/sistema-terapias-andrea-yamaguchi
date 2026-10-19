(function() {
  // 1. CONFIGURAÇÃO DO WHATSAPP OFICIAL (+55 19 99575-9720)
  const WHATSAPP_NUMBER = "5519995759720";

  // 2. SELEÇÃO DOS ELEMENTOS DA PÁGINA
  const screens = [...document.querySelectorAll('.screen')];
  const navItems = [...document.querySelectorAll('.nav-item')];
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const toast = document.getElementById('toast');

  let selectedTherapy = null;
  let toastTimeout = null;

  // 3. FUNÇÃO PARA EXIBIR NOTIFICAÇÃO RÁPIDA (TOAST)
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 4. FUNÇÃO DE NAVEGAÇÃO ENTRE TELAS (go)
  function go(id) {
    const target = document.getElementById(id);
    if (!target) return;

    screens.forEach(s => s.classList.toggle('active', s.id === id));

    navItems.forEach(b => {
      if (b.dataset.go === id) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });

    menuPanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const heading = target.querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  // 5. FUNÇÃO PARA SELECIONAR UMA TERAPIA DO CATÁLOGO
  function selectTherapy(therapyName, therapyPrice) {
    selectedTherapy = { name: therapyName, price: therapyPrice };

    resultTitle.textContent = `Interesse em ${therapyName}`;
    resultMessage.textContent = `Você selecionou a terapia ${therapyName} (${therapyPrice}). Toque no botão abaixo para abrir o WhatsApp da Andrea já com esta opção preenchida.`;

    showToast(`Terapia selecionada: ${therapyName}`);
    go('result');
  }

  // 6. FUNÇÃO PARA ABRIR CONVERSA NO WHATSAPP
  function openWhatsApp() {
    const message = selectedTherapy
      ? `Olá, Andrea! Vi o seu site de Terapias Holísticas e gostaria de saber mais sobre a sessão de ${selectedTherapy.name} (${selectedTherapy.price}).`
      : `Olá, Andrea! Vi o seu site de Terapias Holísticas e gostaria de saber mais informações sobre os atendimentos.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  // 7. ATIVAÇÃO DOS CLIQUES NOS BOTÕES E CARTÕES
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', () => go(el.dataset.go));
  });

  document.querySelectorAll('[data-contact]').forEach(el => {
    el.addEventListener('click', openWhatsApp);
  });

  document.querySelectorAll('.therapy-card').forEach(card => {
    function selectCard() {
      selectTherapy(card.dataset.therapy, card.dataset.price);
    }

    card.addEventListener('click', event => {
      if (event.target.closest('button')) {
        return;
      }

      selectCard();
    });

    const arrowButton = card.querySelector('.card-arrow');

    if (arrowButton) {
      arrowButton.addEventListener('click', selectCard);
    }

    card.addEventListener('keydown', event => {
      if (
        event.target === card &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        selectCard();
      }
    });
  });

  menuToggle.addEventListener('click', () => {
  const isOpen = !menuPanel.classList.contains('open');

  menuPanel.classList.toggle('open', isOpen);

  menuToggle.setAttribute('aria-expanded', String(isOpen));

  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
  );

  if (isOpen) {
    const firstMenuItem = menuPanel.querySelector('button');

    if (firstMenuItem) {
      firstMenuItem.focus();
    }
  } else {
    menuToggle.focus();
  }
});

  document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuPanel.classList.contains('open')) {
    menuPanel.classList.remove('open');

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');

    menuToggle.focus();
  }
});
})();
