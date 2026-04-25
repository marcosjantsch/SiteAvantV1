const siteConfig = {
  company: "AVANT Assessoria Florestal LTDA",
  brand: "Avant",
  tagline: "Inteligência artificial, geotecnologia e precisão operacional para o setor florestal.",
  email: "contato@avantflorestal.com.br",
  phoneDisplay: "(00) 00000-0000",
  phoneIntl: "5500000000000",
  city: "Brasil",
  logo: "imagens/avant-logo.png"
};

const navItems = [
  { id: "home", label: "Início", href: "index.html" },
  { id: "clientes", label: "Clientes", href: "clientes.html" },
  { id: "valor-florestal", label: "Valor Florestal", href: "cliente-valor-florestal.html" },
  { id: "servicos", label: "Serviços", href: "servicos.html" },
  { id: "ia", label: "IA", href: "inteligencia-artificial.html" },
  { id: "geotecnologias", label: "Geotecnologias", href: "geotecnologias.html" },
  { id: "manejo", label: "Manejo", href: "manejo-florestal.html" },
  { id: "contato", label: "Contato", href: "contato.html" }
];

function buildHeader() {
  const active = document.body.dataset.page || "";
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;

  const links = navItems
    .map(
      (item) =>
        `<a href="${item.href}" class="${item.id === active ? "is-active" : ""}">${item.label}</a>`
    )
    .join("");

  headerTarget.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="index.html" aria-label="Ir para a página inicial da Avant">
          <span class="brand__mark">
            <img src="${siteConfig.logo}" alt="Símbolo da Avant" />
          </span>
          <span class="brand__text">
            <strong>${siteConfig.brand}</strong>
            <span>Assessoria Florestal, IA e Geotecnologia</span>
          </span>
        </a>

        <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="site-nav" aria-label="Navegação principal">
          <div class="site-nav__links">${links}</div>
          <div class="site-header__actions">
            <a class="btn btn--secondary" href="contato.html">Fale com a Avant</a>
            <a class="btn btn--primary" href="servicos.html">Conheça as Soluções</a>
          </div>
        </nav>
      </div>
    </header>
  `;
}

function buildFooter() {
  const footerTarget = document.getElementById("site-footer");
  if (!footerTarget) return;

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
              <span>${siteConfig.company}</span>
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
            ${navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
          </ul>
        </div>

        <div>
          <h3>Contato</h3>
          <ul class="site-footer__list">
            <li><a href="mailto:${siteConfig.email}">${siteConfig.email}</a></li>
            <li><a href="https://wa.me/${siteConfig.phoneIntl}" target="_blank" rel="noreferrer">${siteConfig.phoneDisplay}</a></li>
            <li>${siteConfig.city}</li>
            <li><a href="contato.html">Solicitar diagnóstico comercial</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>&copy; <span data-current-year></span> ${siteConfig.company}. Todos os direitos reservados.</span>
        <span>Site institucional com foco em IA florestal, manejo, geotecnologia e automação.</span>
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
});
