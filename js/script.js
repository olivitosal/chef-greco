/* ==========================================================================
   Chef Mattia Greco — script.js
   Gestisce: dati piatti, rendering galleria, filtri, modal scheda piatto,
   header on-scroll, menu mobile, copia email, scroll-to-top.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * 1) DATI PIATTI
   *    Modifica/aggiungi qui i tuoi piatti: basta rispettare la struttura.
   *    "img" punta ai placeholder in images/dishes/ — sostituiscili con le
   *    tue foto reali mantenendo lo stesso nome file.
   * ------------------------------------------------------------------- */
  const DISHES = [
    {
      id: "gamberoni",
      category: "antipasti",
      categoryLabel: "Antipasti",
      name: "Gamberoni alla Brace",
      description: "Gamberoni lasciati alla brace, lime bruciato, olio al peperoncino e menta fresca.",
      tags: ["Gamberoni", "Lime bruciato", "Olio al peperoncino", "Menta"],
      img: "images/dishes/gamberoni.svg"
    },
    {
      id: "burrata",
      category: "antipasti",
      categoryLabel: "Antipasti",
      name: "Burrata & Pomodorini",
      description: "Burrata pugliese, pomodorini di stagione, pane croccante e basilico dell'orto.",
      tags: ["Burrata", "Pomodorini", "Pane croccante", "Basilico"],
      img: "images/dishes/burrata.svg"
    },
    {
      id: "spaghetti",
      category: "primi",
      categoryLabel: "Primi",
      name: "Spaghetti al Pomodoro",
      description: "Spaghetti trafilati al bronzo, pomodoro San Marzano, basilico e un filo d'olio extravergine.",
      tags: ["Spaghetti", "San Marzano", "Basilico", "Olio EVO"],
      img: "images/dishes/spaghetti.svg"
    },
    {
      id: "risotto",
      category: "primi",
      categoryLabel: "Primi",
      name: "Risotto al Tartufo",
      description: "Risotto Carnaroli mantecato, tartufo nero fresco di stagione e scaglie di parmigiano 30 mesi.",
      tags: ["Carnaroli", "Tartufo nero", "Parmigiano 30 mesi"],
      img: "images/dishes/risotto.svg"
    },
    {
      id: "branzino",
      category: "secondi",
      categoryLabel: "Secondi",
      name: "Branzino in Crosta",
      description: "Branzino in crosta di sale, verdure croccanti e una riduzione agrodolce all'aceto balsamico.",
      tags: ["Branzino", "Crosta di sale", "Verdure", "Aceto balsamico"],
      img: "images/dishes/branzino.svg"
    },
    {
      id: "tagliata",
      category: "secondi",
      categoryLabel: "Secondi",
      name: "Tagliata di Manzo",
      description: "Tagliata di manzo frollata, patate al forno e erbe aromatiche fresche.",
      tags: ["Manzo frollato", "Patate al forno", "Erbe aromatiche"],
      img: "images/dishes/tagliata.svg"
    },
    {
      id: "tortino",
      category: "dessert",
      categoryLabel: "Dessert",
      name: "Tortino & Gelato",
      description: "Tortino al cioccolato fondente dal cuore caldo, gelato artigianale alla vaniglia e caramello salato.",
      tags: ["Cioccolato fondente", "Gelato alla vaniglia", "Caramello salato"],
      img: "images/dishes/tortino.svg"
    },
    {
      id: "pannacotta",
      category: "dessert",
      categoryLabel: "Dessert",
      name: "Panna Cotta",
      description: "Panna cotta artigianale, fragole fresche marinate e una nota di menta.",
      tags: ["Panna cotta", "Fragole fresche", "Menta"],
      img: "images/dishes/pannacotta.svg"
    }
  ];

  /* ---------------------------------------------------------------------
   * 2) RENDER GALLERIA
   * ------------------------------------------------------------------- */
  const dishGrid = document.getElementById("dishGrid");

  function renderDishes() {
    dishGrid.innerHTML = DISHES.map((dish, i) => `
      <article class="dish-card" data-category="${dish.category}" data-id="${dish.id}" style="animation-delay:${i * 40}ms">
        <div class="dish-card-media">
          <img src="${dish.img}" alt="${dish.name}" loading="lazy">
          <span class="dish-card-plus" aria-hidden="true">+</span>
        </div>
        <div class="dish-card-body">
          <span class="dish-card-cat">${dish.categoryLabel}</span>
          <h3 class="dish-card-name">${dish.name}</h3>
        </div>
      </article>
    `).join("");
  }
  renderDishes();

  /* ---------------------------------------------------------------------
   * 3) FILTRI GALLERIA
   * ------------------------------------------------------------------- */
  const filterPills = document.getElementById("filterPills");

  filterPills.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;

    filterPills.querySelectorAll(".pill").forEach((p) => {
      p.classList.remove("is-active");
      p.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".dish-card").forEach((card) => {
      const match = filter === "tutti" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !match);
    });
  });

  /* ---------------------------------------------------------------------
   * 4) MODAL SCHEDA PIATTO
   * ------------------------------------------------------------------- */
  const overlay = document.getElementById("dishModalOverlay");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  let lastFocusedEl = null;

  function openModal(dish) {
    modalImage.src = dish.img;
    modalImage.alt = dish.name;
    modalCategory.textContent = dish.categoryLabel;
    modalTitle.textContent = dish.name;
    modalDescription.textContent = dish.description;
    modalTags.innerHTML = dish.tags.map((t) => `<span>${t}</span>`).join("");

    lastFocusedEl = document.activeElement;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalCloseBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  dishGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".dish-card");
    if (!card) return;
    const dish = DISHES.find((d) => d.id === card.dataset.id);
    if (dish) openModal(dish);
  });

  modalCloseBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });

  /* ---------------------------------------------------------------------
   * 5) HEADER: ombra/sfondo al passaggio dello scroll
   * ------------------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  function onScrollHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------------------------------------------------------------------
   * 6) MENU MOBILE
   * ------------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------------------
   * 7) COPIA EMAIL NEGLI APPUNTI
   * ------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const emailValue = document.getElementById("emailValue");

  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      /* clipboard non disponibile: nessun blocco, l'utente può selezionare il testo */
    }
    const original = emailValue.textContent;
    emailValue.textContent = "Copiata! ✓";
    copyEmailBtn.classList.add("is-active");
    setTimeout(() => {
      emailValue.textContent = original;
      copyEmailBtn.classList.remove("is-active");
    }, 1800);
  });

  /* ---------------------------------------------------------------------
   * 8) TIMELINE: evidenzia la voce visibile durante lo scroll
   * ------------------------------------------------------------------- */
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length && "IntersectionObserver" in window) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
        });
      },
      { threshold: 0.4 }
    );
    timelineItems.forEach((item) => timelineObserver.observe(item));
  }

  /* ---------------------------------------------------------------------
   * 9) PULSANTE "TORNA IN CIMA"
   * ------------------------------------------------------------------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener(
    "scroll",
    () => scrollTopBtn.classList.toggle("is-visible", window.scrollY > 600),
    { passive: true }
  );
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
   
  /* ---------------------------------------------------------------------
   * 10) MUSICA DI SOTTOFONDO
   * ------------------------------------------------------------------- */
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  if (bgMusic && musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute("aria-label", "Disattiva la musica di sottofondo");
      } else {
        bgMusic.pause();
        musicToggle.setAttribute("aria-pressed", "false");
        musicToggle.setAttribute("aria-label", "Attiva la musica di sottofondo");
      }
    });
  }
})();
