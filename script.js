/**
 * Portfólio Miguel Oliveira Martins - Script Principal
 * Funcionalidades: Dark/Light Mode, Menu Mobile, Filtro de Projetos,
 * Validação de Formulário e IntersectionObserver (Scroll Reveal).
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectFilter();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
});

/* ==========================================================================
   1. Gerenciador de Tema (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleDesktop = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  // Carregar tema salvo ou preferência do sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    enableLightMode();
  } else {
    enableDarkMode();
  }

  function enableDarkMode() {
    html.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    updateThemeIcons(true);
  }

  function enableLightMode() {
    html.classList.add('light');
    localStorage.setItem('theme', 'light');
    updateThemeIcons(false);
  }

  function toggleTheme() {
    if (html.classList.contains('light')) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }

  function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');

    sunIcons.forEach(icon => {
      icon.classList.toggle('hidden', isDark);
    });

    moonIcons.forEach(icon => {
      icon.classList.toggle('hidden', !isDark);
    });
  }

  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
  }
}

/* ==========================================================================
   2. Menu Mobile e Navegação
   ========================================================================== */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (!menuButton || !mobileMenu) return;

  function toggleMenu() {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);

    if (isExpanded) {
      // Fechar
      mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-3');
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      if (iconMenu && iconClose) {
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    } else {
      // Abrir
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-3');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      if (iconMenu && iconClose) {
        iconMenu.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    }
  }

  menuButton.addEventListener('click', toggleMenu);

  // Fechar menu ao clicar em qualquer link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  });

  // Fechar se clicar fora
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    }
  });
}

/* ==========================================================================
   3. Galeria de Projetos com Filtro Interativo
   ========================================================================== */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Atualizar classe ativa no botão
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Animação suave de entrada
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.96)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.classList.add('hidden');
            }
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Validação e Feedback do Formulário de Contato
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successFeedback = document.getElementById('form-success-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  const fields = {
    nome: {
      el: document.getElementById('nome'),
      error: document.getElementById('error-nome'),
      validate: val => val.trim().length >= 2,
      msg: 'Por favor, informe seu nome (mínimo 2 caracteres).'
    },
    email: {
      el: document.getElementById('email'),
      error: document.getElementById('error-email'),
      validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      msg: 'Por favor, insira um e-mail válido.'
    },
    assunto: {
      el: document.getElementById('assunto'),
      error: document.getElementById('error-assunto'),
      validate: val => val.trim().length >= 3,
      msg: 'Informe o assunto (mínimo 3 caracteres).'
    },
    mensagem: {
      el: document.getElementById('mensagem'),
      error: document.getElementById('error-mensagem'),
      validate: val => val.trim().length >= 10,
      msg: 'A mensagem deve conter pelo menos 10 caracteres.'
    }
  };

  // Validação em tempo real ao digitar / blur
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.el) return;

    field.el.addEventListener('input', () => {
      clearFieldError(field);
    });

    field.el.addEventListener('blur', () => {
      if (!field.validate(field.el.value)) {
        showFieldError(field);
      } else {
        clearFieldError(field);
      }
    });
  });

  function showFieldError(field) {
    if (field.error) {
      field.error.textContent = field.msg;
      field.error.classList.remove('hidden');
    }
    field.el.classList.add('border-red-500', 'focus:ring-red-500');
    field.el.classList.remove('focus:ring-violet-500');
  }

  function clearFieldError(field) {
    if (field.error) {
      field.error.textContent = '';
      field.error.classList.add('hidden');
    }
    field.el.classList.remove('border-red-500', 'focus:ring-red-500');
    field.el.classList.add('focus:ring-violet-500');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Checar todos os campos
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.el) return;
      if (!field.validate(field.el.value)) {
        showFieldError(field);
        isValid = false;
      } else {
        clearFieldError(field);
      }
    });

    if (!isValid) return;

    // Simulação de envio com estado de loading
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Enviando mensagem...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Exibir feedback de sucesso
      form.reset();
      if (successFeedback) {
        successFeedback.classList.remove('hidden');
        successFeedback.classList.add('flex');
        
        // Esconder após 6 segundos suavemente
        setTimeout(() => {
          successFeedback.classList.add('hidden');
          successFeedback.classList.remove('flex');
        }, 6000);
      }
    }, 700);
  });
}

/* ==========================================================================
   5. Animações de Scroll (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach((el, index) => {
    // Adicionar um leve delay escalonado se houver elementos irmãos
    if (el.hasAttribute('data-delay')) {
      el.style.transitionDelay = `${el.getAttribute('data-delay')}ms`;
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   6. Botão Voltar ao Topo
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
