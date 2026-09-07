/* =========================================================
   Mission Lakshya NEET 2027
   Step 3 — Main JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   1. BASIC HELPERS
   ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const safeJSONParse = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

/* =========================================================
   2. PAGE ROUTES / GLOBAL SEARCH DATA
   ========================================================= */

const searchItems = [
  {
    title: "Home",
    description: "Mission Lakshya NEET 2027 Dashboard",
    keywords: "home dashboard शुरुआत",
    icon: "🏠",
    url: "index.html"
  },
  {
    title: "Library",
    description: "सभी study resources एक जगह",
    keywords: "library resources books notes",
    icon: "📚",
    url: "pages/library.html"
  },
  {
    title: "Books & Notes",
    description: "NCERT, notes और study material",
    keywords: "books notes ncert पुस्तक किताब",
    icon: "📖",
    url: "pages/books.html"
  },
  {
    title: "Video Lectures",
    description: "Physics, Chemistry और Biology lectures",
    keywords: "video lectures classes videos",
    icon: "🎥",
    url: "pages/videos.html"
  },
  {
    title: "YouTube",
    description: "YouTube study videos और live classes",
    keywords: "youtube live classes pw",
    icon: "▶️",
    url: "pages/youtube.html"
  },
  {
    title: "Websites",
    description: "Study websites को Mission Lakshya में खोलें",
    keywords: "websites study website viewer",
    icon: "🌐",
    url: "pages/websites.html"
  },
  {
    title: "Question Bank",
    description: "NEET MCQs और practice questions",
    keywords: "question bank mcq questions practice",
    icon: "❓",
    url: "pages/question-bank.html"
  },
  {
    title: "DPP",
    description: "Daily Practice Problems",
    keywords: "dpp daily practice problems",
    icon: "📝",
    url: "pages/dpp.html"
  },
  {
    title: "Quiz",
    description: "Chapter-wise और subject-wise quizzes",
    keywords: "quiz test mcq chapter",
    icon: "🧠",
    url: "pages/quiz.html"
  },
  {
    title: "Mock Test",
    description: "NEET pattern full mock tests",
    keywords: "mock test neet full test",
    icon: "🎯",
    url: "pages/mock-test.html"
  },
  {
    title: "AI Doubt Solver",
    description: "AI से Physics, Chemistry और Biology doubts पूछें",
    keywords: "ai doubt solver artificial intelligence",
    icon: "🤖",
    url: "pages/ai.html"
  },
  {
    title: "Planner",
    description: "अपनी NEET study planning करें",
    keywords: "planner study plan timetable schedule",
    icon: "📅",
    url: "pages/planner.html"
  },
  {
    title: "Analytics",
    description: "अपनी study progress देखें",
    keywords: "analytics progress performance",
    icon: "📊",
    url: "pages/analytics.html"
  },
  {
    title: "Bookmarks",
    description: "Saved questions और resources",
    keywords: "bookmark saved favorite",
    icon: "🔖",
    url: "pages/bookmarks.html"
  },
  {
    title: "Themes",
    description: "Website का theme और mode बदलें",
    keywords: "theme color dark purple neon glass",
    icon: "🎨",
    url: "pages/themes.html"
  },
  {
    title: "Settings",
    description: "Website settings",
    keywords: "settings preferences configuration",
    icon: "⚙️",
    url: "pages/settings.html"
  }
];

/* =========================================================
   3. LOCAL STORAGE
   ========================================================= */

const STORAGE_KEYS = {
  theme: "missionLakshyaTheme",
  mode: "missionLakshyaMode",
  stats: "missionLakshyaStats",
  recentSearches: "missionLakshyaRecentSearches"
};

function saveLocal(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("LocalStorage save failed:", error);
  }
}

function getLocal(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    console.warn("LocalStorage read failed:", error);
    return fallback;
  }
}

/* =========================================================
   4. MOBILE SIDEBAR
   ========================================================= */

const mobileMenu = $("#mobileMenu");
const sidebar = $("#sidebar");

function openSidebar() {
  if (!sidebar) return;

  sidebar.classList.add("open");
  document.body.classList.add("sidebar-open");

  if (mobileMenu) {
    mobileMenu.setAttribute("aria-expanded", "true");
  }
}

function closeSidebar() {
  if (!sidebar) return;

  sidebar.classList.remove("open");
  document.body.classList.remove("sidebar-open");

  if (mobileMenu) {
    mobileMenu.setAttribute("aria-expanded", "false");
  }
}

function toggleSidebar() {
  if (!sidebar) return;

  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", toggleSidebar);
}

/* Close sidebar after clicking a navigation item on mobile */
$$(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });
});

/* =========================================================
   5. ACTIVE SIDEBAR LINK
   ========================================================= */

function normalizePath(path) {
  if (!path) return "";

  let clean = path.split("?")[0].split("#")[0];

  if (clean.endsWith("/")) {
    clean += "index.html";
  }

  return clean;
}

function setActiveSidebarLink() {
  const currentPath = normalizePath(window.location.pathname);

  $$(".sidebar a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("http")) return;

    const linkUrl = new URL(href, window.location.href);
    const linkPath = normalizePath(linkUrl.pathname);

    const isActive =
      currentPath === linkPath ||
      (currentPath === "/" && linkPath.endsWith("/index.html"));

    link.classList.toggle("active", isActive);
  });
}

setActiveSidebarLink();

/* =========================================================
   6. SEARCH SYSTEM
   ========================================================= */

const globalSearch = $("#globalSearch");
const searchOverlay = $("#searchOverlay");
const searchOverlayInput = $("#searchOverlayInput");
const searchResults = $("#searchResults");

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openSearch() {
  if (!searchOverlay) return;

  searchOverlay.hidden = false;
  document.body.classList.add("search-open");

  setTimeout(() => {
    if (searchOverlayInput) {
      searchOverlayInput.focus();
      searchOverlayInput.select();
    }
  }, 30);

  renderSearchResults("");
}

function closeSearch() {
  if (!searchOverlay) return;

  searchOverlay.hidden = true;
  document.body.classList.remove("search-open");

  if (globalSearch) {
    globalSearch.blur();
  }
}

function normalizeSearch(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function searchData(query) {
  const q = normalizeSearch(query);

  if (!q) {
    return searchItems.slice(0, 8);
  }

  return searchItems
    .map((item) => {
      const text = normalizeSearch(
        `${item.title} ${item.description} ${item.keywords}`
      );

      let score = 0;

      if (normalizeSearch(item.title).includes(q)) {
        score += 10;
      }

      if (text.includes(q)) {
        score += 5;
      }

      q.split(" ").forEach((word) => {
        if (word.length > 1 && text.includes(word)) {
          score += 2;
        }
      });

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

function renderSearchResults(query) {
  if (!searchResults) return;

  const results = searchData(query);

  if (!results.length) {
    searchResults.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔎</div>
        <h3>कुछ नहीं मिला</h3>
        <p>दूसरा keyword try करें।</p>
      </div>
    `;
    return;
  }

  searchResults.innerHTML = results
    .map(
      (item) => `
        <a
          class="search-result"
          href="${escapeHTML(item.url)}"
          data-search-url="${escapeHTML(item.url)}"
        >
          <span class="search-result-icon">${escapeHTML(item.icon)}</span>

          <span class="search-result-content">
            <strong>${escapeHTML(item.title)}</strong>
            <small>${escapeHTML(item.description)}</small>
          </span>

          <span class="search-result-arrow">→</span>
        </a>
      `
    )
    .join("");

  $$(".search-result", searchResults).forEach((result) => {
    result.addEventListener("click", () => {
      saveRecentSearch(result.querySelector("strong")?.textContent || "");
      closeSearch();
    });
  });
}

function performSearch(query) {
  const value = normalizeSearch(query);

  if (!value) {
    openSearch();
    return;
  }

  const results = searchData(value);

  if (results.length) {
    saveRecentSearch(results[0].title);
    window.location.href = results[0].url;
  } else {
    openSearch();
    renderSearchResults(value);
  }
}

if (globalSearch) {
  globalSearch.addEventListener("focus", () => {
    openSearch();
  });

  globalSearch.addEventListener("input", (event) => {
    openSearch();

    if (searchOverlayInput) {
      searchOverlayInput.value = event.target.value;
    }

    renderSearchResults(event.target.value);
  });

  globalSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch(event.target.value);
    }
  });
}

if (searchOverlayInput) {
  searchOverlayInput.addEventListener("input", (event) => {
    renderSearchResults(event.target.value);

    if (globalSearch) {
      globalSearch.value = event.target.value;
    }
  });

  searchOverlayInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch(event.target.value);
    }
  });
}

/* =========================================================
   7. RECENT SEARCHES
   ========================================================= */

function getRecentSearches() {
  return safeJSONParse(
    getLocal(STORAGE_KEYS.recentSearches, "[]"),
    []
  );
}

function saveRecentSearch(value) {
  const text = String(value || "").trim();

  if (!text) return;

  let searches = getRecentSearches();

  searches = [
    text,
    ...searches.filter(
      (item) => normalizeSearch(item) !== normalizeSearch(text)
    )
  ].slice(0, 8);

  saveLocal(STORAGE_KEYS.recentSearches, JSON.stringify(searches));
}

/* =========================================================
   8. KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", (event) => {
  const isShortcut =
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k";

  if (isShortcut) {
    event.preventDefault();
    openSearch();
  }

  if (event.key === "Escape") {
    closeSearch();
    closeSidebar();
    closeNotifications();
  }
});

/* =========================================================
   9. SEARCH OVERLAY CLICK
   ========================================================= */

if (searchOverlay) {
  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      closeSearch();
    }
  });
}

/* =========================================================
   10. NOTIFICATION PANEL
   ========================================================= */

const notificationBtn = $("#notificationBtn");

let notificationPanel = document.querySelector(".notification-panel");

function createNotificationPanel() {
  if (notificationPanel) return notificationPanel;

  notificationPanel = document.createElement("div");
  notificationPanel.className = "notification-panel";
  notificationPanel.hidden = true;

  notificationPanel.innerHTML = `
    <div class="notification-head">
      <div>
        <strong>Notifications</strong>
        <small>Mission Lakshya updates</small>
      </div>

      <button
        type="button"
        class="icon-btn notification-close"
        aria-label="Close notifications"
      >
        ×
      </button>
    </div>

    <div class="notification-list">
      <div class="notification-item">
        <span>🎯</span>
        <div>
          <strong>Mission Lakshya NEET 2027</strong>
          <p>आपकी preparation के लिए शुभकामनाएँ!</p>
        </div>
      </div>

      <div class="notification-item">
        <span>📚</span>
        <div>
          <strong>Study Resources</strong>
          <p>Books, Videos, DPP और Quiz sections उपलब्ध हैं।</p>
        </div>
      </div>

      <div class="notification-item">
        <span>🤖</span>
        <div>
          <strong>AI Doubt Solver</strong>
          <p>AI section से अपने study doubts पूछ सकते हैं।</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(notificationPanel);

  const closeButton = $(".notification-close", notificationPanel);

  if (closeButton) {
    closeButton.addEventListener("click", closeNotifications);
  }

  return notificationPanel;
}

function positionNotificationPanel() {
  if (!notificationPanel || !notificationBtn) return;

  const rect = notificationBtn.getBoundingClientRect();

  notificationPanel.style.position = "fixed";
  notificationPanel.style.top = `${rect.bottom + 12}px`;
  notificationPanel.style.right = `${Math.max(
    12,
    window.innerWidth - rect.right
  )}px`;
}

function openNotifications() {
  const panel = createNotificationPanel();

  panel.hidden = false;
  positionNotificationPanel();
  document.body.classList.add("notifications-open");
}

function closeNotifications() {
  if (!notificationPanel) return;

  notificationPanel.hidden = true;
  document.body.classList.remove("notifications-open");
}

function toggleNotifications() {
  if (!notificationPanel || notificationPanel.hidden) {
    openNotifications();
  } else {
    closeNotifications();
  }
}

if (notificationBtn) {
  notificationBtn.addEventListener("click", toggleNotifications);
}

window.addEventListener("resize", () => {
  if (notificationPanel && !notificationPanel.hidden) {
    positionNotificationPanel();
  }
});

/* =========================================================
   11. THEME SYSTEM
   ========================================================= */

const themeNames = [
  "purple",
  "blue",
  "ocean",
  "orange",
  "red",
  "sunset",
  "cyber",
  "rose",
  "emerald",
  "midnight",
  "gold",
  "indigo",
  "violet",
  "sky",
  "teal",
  "cyan",
  "pink",
  "magenta",
  "lime",
  "amber",
  "crimson",
  "ruby",
  "sapphire",
  "amethyst",
  "lavender",
  "ice",
  "forest",
  "coffee",
  "slate",
  "mono",
  "aurora",
  "galaxy",
  "matrix",
  "royal",
  "sunrise"
];

function removeThemeClasses() {
  themeNames.forEach((theme) => {
    document.body.classList.remove(`theme-${theme}`);
  });
}

function applyTheme(theme = "purple") {
  const selectedTheme = themeNames.includes(theme)
    ? theme
    : "purple";

  removeThemeClasses();

  document.body.classList.add(`theme-${selectedTheme}`);

  saveLocal(STORAGE_KEYS.theme, selectedTheme);

  document.documentElement.setAttribute(
    "data-theme",
    selectedTheme
  );

  window.dispatchEvent(
    new CustomEvent("missionLakshyaThemeChanged", {
      detail: {
        theme: selectedTheme
      }
    })
  );
}

function getCurrentTheme() {
  return (
    getLocal(STORAGE_KEYS.theme, "purple") || "purple"
  );
}

/* =========================================================
   12. DISPLAY MODES
   ========================================================= */

const modeClasses = [
  "light-mode",
  "oled-mode",
  "glass-mode",
  "neon-mode",
  "focus-mode"
];

function removeModeClasses() {
  modeClasses.forEach((mode) => {
    document.body.classList.remove(mode);
  });
}

function applyMode(mode = "default") {
  removeModeClasses();

  const validModes = [
    "default",
    "light",
    "oled",
    "glass",
    "neon",
    "focus"
  ];

  const selectedMode = validModes.includes(mode)
    ? mode
    : "default";

  if (selectedMode !== "default") {
    document.body.classList.add(`${selectedMode}-mode`);
  }

  saveLocal(STORAGE_KEYS.mode, selectedMode);

  document.documentElement.setAttribute(
    "data-mode",
    selectedMode
  );

  window.dispatchEvent(
    new CustomEvent("missionLakshyaModeChanged", {
      detail: {
        mode: selectedMode
      }
    })
  );
}

/* =========================================================
   13. INITIAL THEME / MODE
   ========================================================= */

applyTheme(getCurrentTheme());
applyMode(getLocal(STORAGE_KEYS.mode, "default"));

/* =========================================================
   14. GLOBAL THEME API
   ========================================================= */

window.MissionLakshyaTheme = {
  setTheme: applyTheme,
  getTheme: getCurrentTheme,

  setMode: applyMode,

  getMode: () =>
    getLocal(STORAGE_KEYS.mode, "default"),

  themes: [...themeNames],

  modes: [
    "default",
    "light",
    "oled",
    "glass",
    "neon",
    "focus"
  ]
};

/* =========================================================
   15. PARTICLE SYSTEM
   ========================================================= */

const particlesContainer = $("#mlParticles");

function createParticles() {
  if (!particlesContainer) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  const isMobile = window.innerWidth < 700;

  const count = isMobile ? 18 : 34;

  particlesContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");

    particle.className = "ml-particle";

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * -15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

let particleResizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(particleResizeTimer);

  particleResizeTimer = setTimeout(() => {
    createParticles();
  }, 300);
});

/* =========================================================
   16. 3D TILT EFFECT
   ========================================================= */

function enableTilt(card) {
  if (!card) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  let frame = null;

  function move(event) {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    if (frame) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
  }

  function reset() {
    if (frame) {
      cancelAnimationFrame(frame);
    }

    card.style.transform = "";
  }

  card.addEventListener("pointermove", move);
  card.addEventListener("pointerleave", reset);
  card.addEventListener("pointercancel", reset);
}

$$("[data-tilt]").forEach(enableTilt);

/* =========================================================
   17. BUTTON RIPPLE EFFECT
   ========================================================= */

function addRipple(button) {
  if (!button) return;

  button.addEventListener("click", (event) => {
    const rect = button.getBoundingClientRect();

    const ripple = document.createElement("span");

    ripple.className = "button-ripple";

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;

    ripple.style.left =
      `${event.clientX - rect.left - size / 2}px`;

    ripple.style.top =
      `${event.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

$$(
  ".btn, .quick-card, .subject-card, .feature-card"
).forEach(addRipple);

/* =========================================================
   18. PROGRESS / USER STATS
   ========================================================= */

const defaultStats = {
  books: 0,
  questions: 0,
  tests: 0,
  streak: 0
};

function getStats() {
  return {
    ...defaultStats,
    ...safeJSONParse(
      getLocal(
        STORAGE_KEYS.stats,
        JSON.stringify(defaultStats)
      ),
      defaultStats
    )
  };
}

function saveStats(stats) {
  saveLocal(
    STORAGE_KEYS.stats,
    JSON.stringify({
      ...defaultStats,
      ...stats
    })
  );
}

function updateStat(key, amount = 1) {
  const stats = getStats();

  if (!(key in stats)) return;

  stats[key] = Math.max(
    0,
    Number(stats[key]) + Number(amount)
  );

  saveStats(stats);
  renderStats();
}

function renderStats() {
  const stats = getStats();

  const selectors = {
    books: [
      "#booksProgress",
      "[data-stat='books']"
    ],
    questions: [
      "#questionsProgress",
      "[data-stat='questions']"
    ],
    tests: [
      "#testsProgress",
      "[data-stat='tests']"
    ],
    streak: [
      "#streakProgress",
      "[data-stat='streak']"
    ]
  };

  Object.entries(selectors).forEach(([key, selectorList]) => {
    selectorList.forEach((selector) => {
      $$(selector).forEach((element) => {
        element.textContent = stats[key];
      });
    });
  });
}

renderStats();

window.MissionLakshyaStats = {
  get: getStats,
  save: saveStats,
  update: updateStat,
  refresh: renderStats
};

/* =========================================================
   19. INTERSECTION ANIMATION
   ========================================================= */

function setupRevealAnimation() {
  const elements = $$(
    ".card, .quick-card, .subject-card, .hero-content, .viewer-card"
  );

  if (!elements.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  elements.forEach((element) => {
    element.classList.add("ml-reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("ml-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

if ("IntersectionObserver" in window) {
  setupRevealAnimation();
}

/* =========================================================
   20. EXTERNAL LINKS
   ========================================================= */

$$("a[href]").forEach((link) => {
  const href = link.getAttribute("href");

  if (!href) return;

  if (
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    link.setAttribute("rel", "noopener noreferrer");
  }
});

/* =========================================================
   21. TELEGRAM SUPPORT
   ========================================================= */

const telegramLinks = $$(
  'a[href*="t.me/Yashpal_aagri"]'
);

telegramLinks.forEach((link) => {
  link.addEventListener("click", () => {
    saveRecentSearch("Telegram Support");
  });
});

/* =========================================================
   22. GLOBAL NAVIGATION FUNCTION
   ========================================================= */

window.MissionLakshyaNavigate = function (url) {
  if (!url) return;

  if (
    typeof url !== "string" ||
    (!url.startsWith("http") &&
      !url.endsWith(".html") &&
      !url.includes("/"))
  ) {
    console.warn("Invalid navigation URL:", url);
    return;
  }

  window.location.href = url;
};

/* =========================================================
   23. VOICE INPUT HELPER
   ========================================================= */

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

function createVoiceRecognition(options = {}) {
  if (!SpeechRecognition) {
    console.warn(
      "Speech Recognition इस browser में available नहीं है।"
    );
    return null;
  }

  const recognition = new SpeechRecognition();

  recognition.lang =
    options.lang || "hi-IN";

  recognition.continuous =
    Boolean(options.continuous);

  recognition.interimResults =
    Boolean(options.interimResults);

  recognition.maxAlternatives = 1;

  if (typeof options.onResult === "function") {
    recognition.addEventListener(
      "result",
      options.onResult
    );
  }

  if (typeof options.onStart === "function") {
    recognition.addEventListener(
      "start",
      options.onStart
    );
  }

  if (typeof options.onEnd === "function") {
    recognition.addEventListener(
      "end",
      options.onEnd
    );
  }

  if (typeof options.onError === "function") {
    recognition.addEventListener(
      "error",
      options.onError
    );
  }

  return recognition;
}

window.MissionLakshyaVoice = {
  supported: Boolean(SpeechRecognition),
  create: createVoiceRecognition
};

/* =========================================================
   24. TEXT TO SPEECH HELPER
   ========================================================= */

function speakText(text, options = {}) {
  if (!("speechSynthesis" in window)) {
    console.warn("Text-to-Speech available नहीं है।");
    return;
  }

  const cleanText = String(text || "").trim();

  if (!cleanText) return;

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(cleanText);

  utterance.lang =
    options.lang || "hi-IN";

  utterance.rate =
    typeof options.rate === "number"
      ? options.rate
      : 0.95;

  utterance.pitch =
    typeof options.pitch === "number"
      ? options.pitch
      : 1;

  utterance.volume =
    typeof options.volume === "number"
      ? options.volume
      : 1;

  if (typeof options.onStart === "function") {
    utterance.addEventListener(
      "start",
      options.onStart
    );
  }

  if (typeof options.onEnd === "function") {
    utterance.addEventListener(
      "end",
      options.onEnd
    );
  }

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

window.MissionLakshyaSpeech = {
  speak: speakText,
  stop: stopSpeaking
};

/* =========================================================
   25. FULLSCREEN HELPER
   ========================================================= */

async function enterFullscreen(element = document.documentElement) {
  try {
    if (!document.fullscreenElement) {
      await element.requestFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen failed:", error);
  }
}

async function exitFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("Exit fullscreen failed:", error);
  }
}

window.MissionLakshyaFullscreen = {
  enter: enterFullscreen,
  exit: exitFullscreen
};

/* =========================================================
   26. YOUTUBE URL HELPER
   ========================================================= */

function getYouTubeVideoId(url) {
  if (!url) return null;

  const value = String(url).trim();

  const patterns = [
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/watch\?v=([^?&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
    /youtube\.com\/live\/([^?&/]+)/i
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);

    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

function createYouTubeEmbed(url, options = {}) {
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  const iframe = document.createElement("iframe");

  iframe.src =
    `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;

  iframe.title =
    options.title || "YouTube Study Video";

  iframe.loading = "lazy";

  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  iframe.allowFullscreen = true;

  return iframe;
}

window.MissionLakshyaYouTube = {
  getVideoId: getYouTubeVideoId,
  createEmbed: createYouTubeEmbed
};

/* =========================================================
   27. UNIVERSAL VIEWER HELPER
   ========================================================= */

function openInViewer(url, container) {
  if (!url || !container) return;

  container.innerHTML = "";

  const youtubeId = getYouTubeVideoId(url);

  if (youtubeId) {
    const iframe = createYouTubeEmbed(url);

    if (iframe) {
      container.appendChild(iframe);
      return;
    }
  }

  const iframe = document.createElement("iframe");

  iframe.src = url;
  iframe.loading = "lazy";
  iframe.title = "Mission Lakshya Study Viewer";
  iframe.referrerPolicy =
    "strict-origin-when-cross-origin";

  iframe.allowFullscreen = true;

  container.appendChild(iframe);
}

window.MissionLakshyaViewer = {
  open: openInViewer
};

/* =========================================================
   28. ONLINE / OFFLINE STATUS
   ========================================================= */

function updateOnlineStatus() {
  document.body.classList.toggle(
    "offline-mode",
    !navigator.onLine
  );

  window.dispatchEvent(
    new CustomEvent("missionLakshyaConnection", {
      detail: {
        online: navigator.onLine
      }
    })
  );
}

window.addEventListener(
  "online",
  updateOnlineStatus
);

window.addEventListener(
  "offline",
  updateOnlineStatus
);

updateOnlineStatus();

/* =========================================================
   29. CURRENT YEAR
   ========================================================= */

$$("[data-current-year]").forEach((element) => {
  element.textContent =
    new Date().getFullYear();
});

/* =========================================================
   30. GLOBAL APP OBJECT
   ========================================================= */

window.MissionLakshya = {
  version: "3.0.0",

  search: searchData,

  openSearch,
  closeSearch,

  openSidebar,
  closeSidebar,

  openNotifications,
  closeNotifications,

  theme: {
    set: applyTheme,
    get: getCurrentTheme
  },

  mode: {
    set: applyMode,
    get: () =>
      getLocal(STORAGE_KEYS.mode, "default")
  },

  stats: {
    get: getStats,
    save: saveStats,
    update: updateStat
  },

  voice: {
    supported: Boolean(SpeechRecognition),
    create: createVoiceRecognition
  },

  speech: {
    speak: speakText,
    stop: stopSpeaking
  },

  fullscreen: {
    enter: enterFullscreen,
    exit: exitFullscreen
  },

  youtube: {
    getVideoId: getYouTubeVideoId,
    createEmbed: createYouTubeEmbed
  },

  viewer: {
    open: openInViewer
  }
};

/* =========================================================
   31. STARTUP
   ========================================================= */

document.documentElement.classList.add(
  "mission-lakshya-ready"
);

console.log(
  "🎯 Mission Lakshya NEET 2027 — Step 3 JavaScript Loaded"
);
