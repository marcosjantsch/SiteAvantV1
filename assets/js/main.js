const siteConfig = {
  company: "Avant",
  brand: "Avant",
  tagline: "Inteligência artificial e precisão operacional para decisões mais claras no campo.",
  email: "avant.marcosj@gmail.com",
  phoneDisplay: "47 988110609",
  phoneIntl: "5547988110609",
  city: "Brasil",
  logo: "imagens/avant-logo.png"
};

const navItems = [
  { id: "home", label: "Home", href: "index.html" },
  { id: "servicos", label: "Serviços", href: "servicos.html" },
  { id: "ia", label: "IA", href: "inteligencia-artificial.html" },
  { id: "geotecnologias", label: "Geotecnologia", href: "geotecnologias.html" },
  { id: "manejo", label: "Manejo", href: "manejo-florestal.html" },
  { id: "clientes", label: "Parceiros", href: "clientes.html" },
  { id: "contato", label: "Contato", href: "contato.html" },
  { id: "plataforma", label: "Plataforma", href: "plataforma.html", isSelector: true }
];

function buildHeader() {
  const active = document.body.dataset.page || "";
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;

  const links = navItems
    .map((item) => {
      if (item.isSelector) {
        return `
          <button
            type="button"
            class="site-nav__platform-trigger ${item.id === active ? "is-active" : ""}"
            data-platform-modal-open
            aria-haspopup="dialog"
            aria-controls="platform-selector-modal"
          >
            ${item.label}
          </button>
        `;
      }

      return `<a href="${item.href}" class="${item.id === active ? "is-active" : ""}">${item.label}</a>`;
    })
    .join("");

  headerTarget.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand brand--header" href="index.html" aria-label="Ir para a página inicial da Avant">
          <span class="brand__mark brand__mark--header">
            <img src="${siteConfig.logo}" alt="Símbolo da Avant" />
          </span>
          <span class="brand__text brand__text--header">
            <strong>${siteConfig.brand}</strong>
          </span>
        </a>

        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="site-nav" aria-label="Navegação principal">
          <div class="site-nav__links">${links}</div>
        </nav>
      </div>

      <div class="platform-modal" id="platform-selector-modal" data-platform-modal hidden>
        <div class="platform-modal__backdrop" data-platform-modal-close></div>
        <div class="platform-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="platform-selector-title">
          <button type="button" class="platform-modal__close" aria-label="Fechar seleção de plataforma" data-platform-modal-close>×</button>
          <span class="eyebrow">Plataforma</span>
          <h2 id="platform-selector-title">Selecione o ambiente institucional</h2>
          <p>Escolha qual ambiente institucional deseja acessar para visualizar os links e módulos disponíveis.</p>
          <div class="platform-modal__options">
            <a class="platform-modal__card" href="acessos-avant.html">
              <span class="platform-modal__label">Avant</span>
              <strong>Acessos institucionais da Avant</strong>
              <span>Links oficiais, plataformas e ferramentas institucionais da Avant.</span>
            </a>
            <a class="platform-modal__card" href="acessos-valor-florestal.html">
              <span class="platform-modal__label">Valor Florestal</span>
              <strong>Acessos institucionais da Valor Florestal</strong>
              <span>Ambientes dedicados, módulos e sistemas ligados à Valor Florestal.</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function buildFooter() {
  const footerTarget = document.getElementById("site-footer");
  if (!footerTarget) return;

  const companyLine =
    siteConfig.company && siteConfig.company !== siteConfig.brand
      ? `<span>${siteConfig.company}</span>`
      : "";

  footerTarget.innerHTML = `
    <footer class="site-footer">
      <div class="container site-footer__top">
        <div class="site-footer__brand">
          <a class="brand" href="index.html">
            <span class="brand__mark">
              <img src="${siteConfig.logo}" alt="Símbolo da Avant" />
            </span>
            <span class="brand__text">
              <strong>${siteConfig.brand}</strong>
              ${companyLine}
            </span>
          </a>
          <p>${siteConfig.tagline}</p>
          <div class="tag-cloud">
            <span class="tag">inteligência artificial florestal</span>
            <span class="tag">geotecnologia</span>
            <span class="tag">sensoriamento remoto</span>
            <span class="tag">manejo florestal</span>
          </div>
        </div>

        <div>
          <h3>Navegação</h3>
          <ul class="site-footer__list">
            ${navItems
              .map((item) =>
                item.isSelector
                  ? `<li><a href="plataforma.html">${item.label}</a></li>`
                  : `<li><a href="${item.href}">${item.label}</a></li>`
              )
              .join("")}
          </ul>
        </div>

        <div>
          <h3>Contato</h3>
          <ul class="site-footer__list">
            <li><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></li>
            <li><a href="https://wa.me/${siteConfig.phoneIntl}" target="_blank" rel="noreferrer">${siteConfig.phoneDisplay}</a></li>
            <li>${siteConfig.city}</li>
            <li><a href="contato.html">Solicitar contato</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>&copy; <span data-current-year></span> ${siteConfig.brand}. Todos os direitos reservados.</span>
        <span>Site institucional com foco em IA aplicada, manejo e soluções operacionais.</span>
      </div>
    </footer>
  `;
}

function setupMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const body = document.body;
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".site-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const feedback = form.querySelector("[data-form-feedback]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.textContent =
        "Mensagem preparada. Conecte este formulário a um e-mail, CRM ou automação para receber os leads da Avant.";
    }
    form.reset();
  });
}

function setupPlatformToggle() {
  const toggle = document.querySelector("[data-platform-toggle]");
  const panel = document.querySelector("[data-platform-panel]");
  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  }
}

function setupPlatformModal() {
  const modal = document.querySelector("[data-platform-modal]");
  const openButtons = document.querySelectorAll("[data-platform-modal-open]");
  const closeButtons = document.querySelectorAll("[data-platform-modal-close]");
  if (!modal || openButtons.length === 0) return;

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("platform-modal-open");
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("platform-modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

function hydrateDynamicFields() {
  document.querySelectorAll("[data-email]").forEach((node) => {
    node.textContent = siteConfig.email;
    node.setAttribute("href", `mailto:${siteConfig.email}`);
  });

  document.querySelectorAll("[data-whatsapp]").forEach((node) => {
    node.textContent = siteConfig.phoneDisplay;
    node.setAttribute("href", `https://wa.me/${siteConfig.phoneIntl}`);
  });

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  hydrateDynamicFields();
  setupMenu();
  setupContactForm();
  setupPlatformToggle();
  setupPlatformModal();
});
