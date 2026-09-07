/* =========================================================
   MISSION LAKSHYA NEET 2027
   Main JavaScript
   Creator: Yashpal Aagri
   ========================================================= */

(() => {
  "use strict";

  /* -----------------------------
     BASIC HELPERS
  ----------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  };

  const KEYS = {
    theme: "ml_theme",
    mode: "ml_display_mode",
    websites: "ml_websites",
    bookmarks: "ml_bookmarks",
    stats: "ml_stats",
    recentSearches: "ml_recent_searches",
    notifications: "ml_notifications",
    lastPage: "ml_last_page"
  };

  /* -----------------------------
     TOAST
  ----------------------------- */

  function showToast(message, type = "info") {
    let toast = $("#toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.dataset.type = type;
    toast.classList.add("show");

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  window.showToast = showToast;

  /* -----------------------------
     MOBILE SIDEBAR
  ----------------------------- */

  const mobileMenu = $("#mobileMenu");
  const sidebar = $(".sidebar");

  function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");

    let overlay = $(".sidebar-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);

      overlay.addEventListener("click", closeSidebar);
    }

    overlay.classList.add("show");
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("open");

    const overlay = $(".sidebar-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  mobileMenu?.addEventListener("click", () => {
    if (sidebar?.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  $$(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });

  /* -----------------------------
     ACTIVE SIDEBAR LINK
  ----------------------------- */

  function setActiveSidebar() {
    const current = window.location.pathname.split("/").pop() || "index.html";

    $$(".sidebar a").forEach(link => {
      const href = link.getAttribute("href") || "";
      const page = href.split("/").pop();

      link.classList.toggle(
        "active",
        page === current ||
        (current === "" && page === "index.html")
      );
    });
  }

  setActiveSidebar();

  /* -----------------------------
     PAGE NAVIGATION
  ----------------------------- */

  function goTo(url) {
    if (!url) return;

    storage.set(KEYS.lastPage, url);

    window.location.href = url;
  }

  window.goTo = goTo;

  $$("[data-page]").forEach(element => {
    element.addEventListener("click", () => {
      goTo(element.dataset.page);
    });
  });

  /* -----------------------------
     GLOBAL SEARCH DATA
  ----------------------------- */

  const pages = [
    {
      title: "Home",
      description: "Mission Lakshya NEET 2027 Dashboard",
      url: "index.html",
      icon: "🏠",
      keywords: "home dashboard"
    },
    {
      title: "Library",
      description: "Complete study library",
      url: "pages/library.html",
      icon: "📚",
      keywords: "library study resources"
    },
    {
      title: "Books",
      description: "NCERT and study books",
      url: "pages/books.html",
      icon: "📖",
      keywords: "books ncert physics chemistry biology"
    },
    {
      title: "Video Lectures",
      description: "NEET video lectures",
      url: "pages/videos.html",
      icon: "🎬",
      keywords: "video lecture classes"
    },
    {
      title: "YouTube",
      description: "YouTube study videos",
      url: "pages/youtube.html",
      icon: "▶️",
      keywords: "youtube live classes"
    },
    {
      title: "Websites",
      description: "Study websites",
      url: "pages/websites.html",
      icon: "🌐",
      keywords: "website study pw resources"
    },
    {
      title: "Question Bank",
      description: "NEET MCQ question bank",
      url: "pages/question-bank.html",
      icon: "❓",
      keywords: "questions mcq practice"
    },
    {
      title: "DPP",
      description: "Daily practice problems",
      url: "pages/dpp.html",
      icon: "📝",
      keywords: "dpp daily practice"
    },
    {
      title: "Quiz",
      description: "Chapter-wise quizzes",
      url: "pages/quiz.html",
      icon: "🧠",
      keywords: "quiz test chapter"
    },
    {
      title: "Mock Test",
      description: "Full NEET mock tests",
      url: "pages/mock-test.html",
      icon: "🏆",
      keywords: "mock test neet exam"
    },
    {
      title: "AI Doubt Solver",
      description: "Ask doubts to AI Tutor",
      url: "pages/ai.html",
      icon: "🤖",
      keywords: "ai doubt solver tutor"
    },
    {
      title: "Planner",
      description: "Study planning and schedule",
      url: "pages/planner.html",
      icon: "📅",
      keywords: "planner timetable schedule"
    },
    {
      title: "Analytics",
      description: "Study progress and performance",
      url: "pages/analytics.html",
      icon: "📊",
      keywords: "analytics progress performance"
    },
    {
      title: "Bookmarks",
      description: "Saved study content",
      url: "pages/bookmarks.html",
      icon: "🔖",
      keywords: "bookmark saved"
    },
    {
      title: "Themes",
      description: "Customize Mission Lakshya",
      url: "pages/themes.html",
      icon: "🎨",
      keywords: "theme color mode"
    },
    {
      title: "Settings",
      description: "Website settings",
      url: "pages/settings.html",
      icon: "⚙️",
      keywords: "settings preferences"
    }
  ];

  /* -----------------------------
     SEARCH OVERLAY
  ----------------------------- */

  const searchOverlay = $("#searchOverlay");
  const globalSearch = $("#globalSearch");
  const searchInput = $("#searchInput");

  function openSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.add("show");

    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  function closeSearch() {
    searchOverlay?.classList.remove("show");

    if (searchInput) {
      searchInput.value = "";
    }
  }

  function renderSearchResults(query) {
    const resultsContainer =
      $("#searchResults") ||
      $(".search-results");

    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();

    if (!q) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          🔎 Search Books, Videos, Tests, DPP, AI, Websites...
        </div>
      `;
      return;
    }

    const results = pages.filter(item => {
      const text = `
        ${item.title}
        ${item.description}
        ${item.keywords}
      `.toLowerCase();

      return text.includes(q);
    });

    const customSites = storage.get(KEYS.websites, []);

    customSites.forEach(site => {
      const text = `
        ${site.name}
        ${site.url}
        ${site.category || ""}
      `.toLowerCase();

      if (text.includes(q)) {
        results.push({
          title: site.name,
          description: site.category || "Custom Study Website",
          url: site.url,
          icon: "🌐",
          external: true
        });
      }
    });

    if (!results.length) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          😕 कोई result नहीं मिला।
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = results
      .slice(0, 12)
      .map((item, index) => `
        <button
          class="search-result"
          data-result-index="${index}"
          type="button"
        >
          <span class="search-result-icon">${item.icon}</span>
          <span class="search-result-content">
            <strong>${escapeHTML(item.title)}</strong>
            <small>${escapeHTML(item.description)}</small>
          </span>
          <span class="search-result-arrow">›</span>
        </button>
      `)
      .join("");

    $$(".search-result", resultsContainer).forEach((button, index) => {
      button.addEventListener("click", () => {
        const item = results[index];

        if (item.external) {
          openInViewer(item.url, item.title);
        } else {
          goTo(item.url);
        }

        closeSearch();
      });
    });
  }

  function saveSearch(query) {
    const q = query.trim();

    if (!q) return;

    let recent = storage.get(KEYS.recentSearches, []);

    recent = [
      q,
      ...recent.filter(item => item.toLowerCase() !== q.toLowerCase())
    ].slice(0, 8);

    storage.set(KEYS.recentSearches, recent);
  }

  globalSearch?.addEventListener("click", openSearch);

  searchInput?.addEventListener("input", event => {
    renderSearchResults(event.target.value);
  });

  searchInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      saveSearch(event.target.value);
    }

    if (event.key === "Escape") {
      closeSearch();
    }
  });

  searchOverlay?.addEventListener("click", event => {
    if (event.target === searchOverlay) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }

    if (event.key === "Escape") {
      closeSearch();
    }
  });

  /* -----------------------------
     ESCAPE HTML
  ----------------------------- */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* -----------------------------
     NOTIFICATIONS
  ----------------------------- */

  const notificationButton = $("#notificationButton");
  const notificationPanel = $("#notificationPanel");

  const defaultNotifications = [
    {
      title: "Mission Lakshya NEET 2027",
      message: "आपका study dashboard तैयार है।",
      time: "अब"
    },
    {
      title: "Daily Practice",
      message: "आज DPP और Quiz जरूर करें।",
      time: "आज"
    },
    {
      title: "AI Doubt Solver",
      message: "अपने Physics, Chemistry और Biology doubts पूछें।",
      time: "आज"
    }
  ];

  function getNotifications() {
    return storage.get(
      KEYS.notifications,
      defaultNotifications
    );
  }

  function renderNotifications() {
    if (!notificationPanel) return;

    const list = getNotifications();

    notificationPanel.innerHTML = `
      <div class="notification-header">
        <strong>Notifications</strong>
        <button id="clearNotifications" type="button">Clear</button>
      </div>

      <div class="notification-list">
        ${list.map(item => `
          <div class="notification-item">
            <div class="notification-icon">🔔</div>
            <div>
              <strong>${escapeHTML(item.title)}</strong>
              <p>${escapeHTML(item.message)}</p>
              <small>${escapeHTML(item.time)}</small>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    $("#clearNotifications")?.addEventListener("click", () => {
      storage.set(KEYS.notifications, []);
      renderNotifications();
      showToast("Notifications clear हो गईं");
    });
  }

  notificationButton?.addEventListener("click", event => {
    event.stopPropagation();

    renderNotifications();

    notificationPanel?.classList.toggle("show");
  });

  document.addEventListener("click", event => {
    if (
      notificationPanel &&
      !notificationPanel.contains(event.target) &&
      event.target !== notificationButton
    ) {
      notificationPanel.classList.remove("show");
    }
  });

  /* -----------------------------
     THEMES
  ----------------------------- */

  const themes = {
    purple: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#c084fc"
    },

    violet: {
      primary: "#8b5cf6",
      secondary: "#6366f1",
      accent: "#a78bfa"
    },

    blue: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },

    cyan: {
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#67e8f9"
    },

    ocean: {
      primary: "#0f766e",
      secondary: "#0891b2",
      accent: "#22d3ee"
    },

    green: {
      primary: "#16a34a",
      secondary: "#22c55e",
      accent: "#4ade80"
    },

    emerald: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },

    orange: {
      primary: "#ea580c",
      secondary: "#f97316",
      accent: "#fb923c"
    },

    red: {
      primary: "#dc2626",
      secondary: "#ef4444",
      accent: "#f87171"
    },

    rose: {
      primary: "#e11d48",
      secondary: "#f43f5e",
      accent: "#fb7185"
    },

    pink: {
      primary: "#db2777",
      secondary: "#ec4899",
      accent: "#f472b6"
    },

    gold: {
      primary: "#ca8a04",
      secondary: "#eab308",
      accent: "#facc15"
    },

    sunset: {
      primary: "#ea580c",
      secondary: "#db2777",
      accent: "#fb7185"
    },

    cyber: {
      primary: "#7c3aed",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },

    midnight: {
      primary: "#312e81",
      secondary: "#4338ca",
      accent: "#818cf8"
    }
  };

  function applyTheme(name) {
    const theme = themes[name] || themes.purple;

    const root = document.documentElement;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--accent", theme.accent);

    root.dataset.theme = name;

    storage.set(KEYS.theme, name);

    $$(".theme-option").forEach(option => {
      option.classList.toggle(
        "active",
        option.dataset.theme === name
      );
    });
  }

  window.applyTheme = applyTheme;

  /* -----------------------------
     DISPLAY MODES
  ----------------------------- */

  const displayModes = [
    "dark",
    "light",
    "oled",
    "glass",
    "neon",
    "focus",
    "3d"
  ];

  function applyDisplayMode(mode = "dark") {
    if (!displayModes.includes(mode)) {
      mode = "dark";
    }

    document.documentElement.dataset.mode = mode;

    displayModes.forEach(item => {
      document.body.classList.toggle(
        `mode-${item}`,
        item === mode
      );
    });

    storage.set(KEYS.mode, mode);

    $$(".mode-option").forEach(option => {
      option.classList.toggle(
        "active",
        option.dataset.mode === mode
      );
    });
  }

  window.applyDisplayMode = applyDisplayMode;

  /* -----------------------------
     THEME QUICK BUTTON
  ----------------------------- */

  $("#themeButton")?.addEventListener("click", () => {
    const current = storage.get(KEYS.theme, "purple");

    const names = Object.keys(themes);
    const index = names.indexOf(current);

    const next =
      names[(index + 1) % names.length];

    applyTheme(next);

    showToast(`Theme: ${next}`);
  });

  /* -----------------------------
     THEME OPTIONS
  ----------------------------- */

  $$(".theme-option").forEach(option => {
    option.addEventListener("click", () => {
      applyTheme(option.dataset.theme);
    });
  });

  $$(".mode-option").forEach(option => {
    option.addEventListener("click", () => {
      applyDisplayMode(option.dataset.mode);
    });
  });

  /* -----------------------------
     PARTICLES
  ----------------------------- */

  function createParticles() {
    const container =
      $("#particles") ||
      $(".particles");

    if (!container) return;

    if (container.children.length > 0) return;

    const count =
      window.innerWidth < 600 ? 22 : 42;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      particle.style.animationDelay =
        `${Math.random() * 5}s`;

      particle.style.animationDuration =
        `${5 + Math.random() * 8}s`;

      container.appendChild(particle);
    }
  }

  createParticles();

  /* -----------------------------
     3D CARD TILT
  ----------------------------- */

  function enableTilt() {
    const cards = $(
      ".quick-card, .subject-card, .website-card, " +
      ".progress-card, .planner-card, .activity-card, .feature-card"
    );

    cards.forEach(card => {
      if (card.dataset.tiltReady) return;

      card.dataset.tiltReady = "true";

      card.addEventListener("pointermove", event => {
        if (window.innerWidth < 800) return;

        const rect = card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateX =
          (0.5 - y) * 8;

        const rotateY =
          (x - 0.5) * 8;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  enableTilt();

  /* -----------------------------
     BUTTON RIPPLE
  ----------------------------- */

  function enableRipple() {
    $$("button, .btn, .quick-card").forEach(element => {
      if (element.dataset.rippleReady) return;

      element.dataset.rippleReady = "true";

      element.addEventListener("click", event => {
        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect =
          element.getBoundingClientRect();

        ripple.style.left =
          `${event.clientX - rect.left}px`;

        ripple.style.top =
          `${event.clientY - rect.top}px`;

        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  enableRipple();

  /* -----------------------------
     REVEAL ANIMATION
  ----------------------------- */

  function enableReveal() {
    const elements = $(
      ".section, .quick-card, .subject-card, " +
      ".website-card, .progress-card, .planner-card, " +
      ".activity-card"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach(el => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    elements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  enableReveal();

  /* -----------------------------
     ADD WEBSITE
  ----------------------------- */

  const addWebsiteModal = $("#addWebsiteModal");
  const addWebsiteButton = $("#addWebsiteButton");
  const closeAddWebsite = $("#closeAddWebsite");

  function openAddWebsiteModal() {
    addWebsiteModal?.classList.add("show");

    $("#websiteName")?.focus();
  }

  function closeAddWebsiteModal() {
    addWebsiteModal?.classList.remove("show");
  }

  addWebsiteButton?.addEventListener(
    "click",
    openAddWebsiteModal
  );

  closeAddWebsite?.addEventListener(
    "click",
    closeAddWebsiteModal
  );

  addWebsiteModal?.addEventListener("click", event => {
    if (event.target === addWebsiteModal) {
      closeAddWebsiteModal();
    }
  });

  /* -----------------------------
     WEBSITE STORAGE
  ----------------------------- */

  function getWebsites() {
    return storage.get(KEYS.websites, []);
  }

  function normalizeURL(url) {
    let value = String(url || "").trim();

    if (!value) return "";

    if (!/^https?:\/\//i.test(value)) {
      value = "https://" + value;
    }

    try {
      return new URL(value).href;
    } catch {
      return "";
    }
  }

  function saveWebsite(site) {
    const sites = getWebsites();

    sites.unshift(site);

    storage.set(KEYS.websites, sites);
  }

  $("#addWebsiteForm")?.addEventListener(
    "submit",
    event => {
      event.preventDefault();

      const name =
        $("#websiteName")?.value.trim();

      const rawURL =
        $("#websiteURL")?.value.trim();

      const category =
        $("#websiteCategory")?.value.trim() ||
        "Study Website";

      const url = normalizeURL(rawURL);

      if (!name) {
        showToast("Website का नाम डालें", "error");
        return;
      }

      if (!url) {
        showToast("Valid website URL डालें", "error");
        return;
      }

      saveWebsite({
        id: Date.now(),
        name,
        url,
        category,
        createdAt: new Date().toISOString()
      });

      event.target.reset();

      closeAddWebsiteModal();

      renderCustomWebsites();

      showToast("Website successfully add हो गई ✅", "success");
    }
  );

  /* -----------------------------
     WEBSITE CARDS
  ----------------------------- */

  function renderCustomWebsites() {
    const container =
      $("#customWebsites") ||
      $(".custom-websites");

    if (!container) return;

    const sites = getWebsites();

    if (!sites.length) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = sites
      .map(site => `
        <div class="website-card custom-website-card">
          <div class="website-icon">🌐</div>

          <div class="website-info">
            <h3>${escapeHTML(site.name)}</h3>
            <p>${escapeHTML(site.category)}</p>
          </div>

          <div class="website-actions">
            <button
              type="button"
              class="open-site-btn"
              data-url="${escapeHTML(site.url)}"
              data-name="${escapeHTML(site.name)}"
            >
              Open
            </button>

            <button
              type="button"
              class="delete-site-btn"
              data-id="${site.id}"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      `)
      .join("");

    $$(".open-site-btn", container).forEach(button => {
      button.addEventListener("click", () => {
        openInViewer(
          button.dataset.url,
          button.dataset.name
        );
      });
    });

    $$(".delete-site-btn", container).forEach(button => {
      button.addEventListener("click", () => {
        deleteWebsite(button.dataset.id);
      });
    });

    enableTilt();
    enableRipple();
  }

  function deleteWebsite(id) {
    const sites = getWebsites();

    const filtered =
      sites.filter(site => String(site.id) !== String(id));

    storage.set(KEYS.websites, filtered);

    renderCustomWebsites();

    showToast("Website delete हो गई");
  }

  renderCustomWebsites();

  /* -----------------------------
     UNIVERSAL VIEWER
  ----------------------------- */

  const viewerFrame = $("#universalFrame");
  const viewerWelcome = $("#viewerWelcome");
  const viewerURL = $("#viewerURL");
  const viewerTitle = $("#viewerTitle");

  let viewerHistory = [];
  let viewerHistoryIndex = -1;

  function setViewerURL(url) {
    if (viewerURL) {
      viewerURL.value = url || "";
    }
  }

  function addViewerHistory(url) {
    if (!url) return;

    viewerHistory =
      viewerHistory.slice(0, viewerHistoryIndex + 1);

    viewerHistory.push(url);

    viewerHistoryIndex =
      viewerHistory.length - 1;
  }

  function openInViewer(url, title = "Study Website") {
    const normalized = normalizeURL(url);

    if (!normalized) {
      showToast("Invalid URL", "error");
      return;
    }

    if (!viewerFrame) {
      window.open(
        normalized,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    viewerWelcome?.classList.add("hidden");

    if (viewerTitle) {
      viewerTitle.textContent = title;
    }

    setViewerURL(normalized);

    addViewerHistory(normalized);

    viewerFrame.src = normalized;

    showToast(`${title} खोल रहा है...`);

    viewerFrame.onload = () => {
      showToast(`${title} loaded`);
    };

    viewerFrame.onerror = () => {
      showViewerFallback(normalized, title);
    };
  }

  window.openInViewer = openInViewer;

  function showViewerFallback(url, title) {
    if (!viewerFrame) return;

    viewerFrame.srcdoc = `
      <div style="
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:30px;
        font-family:Arial,sans-serif;
        background:#111827;
        color:white;
        text-align:center;
      ">
        <div>
          <div style="font-size:50px">🌐</div>
          <h2>${escapeHTML(title)}</h2>
          <p>
            यह website iframe में खुलने की अनुमति नहीं देती।
          </p>

          <button
            onclick="window.parent.postMessage({
              type:'open-external',
              url:${JSON.stringify(url)}
            }, '*')"
            style="
              padding:12px 20px;
              border:0;
              border-radius:12px;
              cursor:pointer;
            "
          >
            External Website खोलें
          </button>
        </div>
      </div>
    `;
  }

  window.addEventListener("message", event => {
    if (event.data?.type === "open-external") {
      const url = normalizeURL(event.data.url);

      if (url) {
        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    }
  });

  /* -----------------------------
     VIEWER OPEN URL BUTTON
  ----------------------------- */

  $("#viewerOpen")?.addEventListener("click", () => {
    const url = normalizeURL(viewerURL?.value);

    if (!url) {
      showToast("Valid URL डालें", "error");
      return;
    }

    openInViewer(url, "Study Website");
  });

  viewerURL?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      $("#viewerOpen")?.click();
    }
  });

  /* -----------------------------
     VIEWER BACK
  ----------------------------- */

  $("#viewerBack")?.addEventListener("click", () => {
    if (viewerHistoryIndex > 0) {
      viewerHistoryIndex--;

      const url =
        viewerHistory[viewerHistoryIndex];

      if (viewerFrame) viewerFrame.src = url;

      setViewerURL(url);
    } else {
      showToast("और पीछे जाने के लिए history नहीं है");
    }
  });

  /* -----------------------------
     VIEWER FORWARD
  ----------------------------- */

  $("#viewerForward")?.addEventListener("click", () => {
    if (
      viewerHistoryIndex <
      viewerHistory.length - 1
    ) {
      viewerHistoryIndex++;

      const url =
        viewerHistory[viewerHistoryIndex];

      if (viewerFrame) viewerFrame.src = url;

      setViewerURL(url);
    } else {
      showToast("आगे जाने के लिए history नहीं है");
    }
  });

  /* -----------------------------
     VIEWER REFRESH
  ----------------------------- */

  $("#viewerRefresh")?.addEventListener("click", () => {
    if (!viewerFrame) return;

    try {
      viewerFrame.contentWindow.location.reload();
    } catch {
      viewerFrame.src =
        viewerFrame.src;
    }

    showToast("Viewer refresh हो रहा है...");
  });

  /* -----------------------------
     VIEWER EXTERNAL
  ----------------------------- */

  $("#viewerExternal")?.addEventListener("click", () => {
    const url = normalizeURL(viewerURL?.value);

    if (!url) {
      showToast("पहले website खोलें");
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  });

  /* -----------------------------
     VIEWER FULLSCREEN
  ----------------------------- */

  $("#viewerFullscreen")?.addEventListener(
    "click",
    async () => {
      const viewer =
        $(".viewer-container") ||
        viewerFrame;

      if (!viewer) return;

      try {
        if (!document.fullscreenElement) {
          await viewer.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch {
        showToast("Fullscreen उपलब्ध नहीं है");
      }
    }
  );

  /* -----------------------------
     VIEWER TABS
  ----------------------------- */

  $$(".viewer-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".viewer-tab").forEach(item => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      const type = tab.dataset.viewer;

      if (type === "youtube") {
        showToast("YouTube Viewer");
      }

      if (type === "websites") {
        showToast("Website Viewer");
      }

      if (type === "bookmarks") {
        renderBookmarksInViewer();
      }
    });
  });

  /* -----------------------------
     YOUTUBE URL → EMBED
  ----------------------------- */

  function getYouTubeID(url) {
    if (!url) return null;

    const value = String(url).trim();

    const patterns = [
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = value.match(pattern);

      if (match) {
        return match[1];
      }
    }

    return null;
  }

  function openYouTube(url, title = "YouTube") {
    const id = getYouTubeID(url);

    if (!id) {
      openInViewer(url, title);
      return;
    }

    const embed =
      `https://www.youtube.com/embed/${id}?rel=0`;

    openInViewer(embed, title);
  }

  window.openYouTube = openYouTube;

  $$("[data-youtube-url]").forEach(element => {
    element.addEventListener("click", () => {
      openYouTube(
        element.dataset.youtubeUrl,
        element.dataset.title || "YouTube Lecture"
      );
    });
  });

  /* -----------------------------
     BOOKMARK SYSTEM
  ----------------------------- */

  function getBookmarks() {
    return storage.get(KEYS.bookmarks, []);
  }

  function addBookmark(item) {
    const bookmarks = getBookmarks();

    const exists = bookmarks.some(
      bookmark => bookmark.url === item.url
    );

    if (exists) {
      showToast("Already bookmarked");
      return;
    }

    bookmarks.unshift({
      ...item,
      createdAt: new Date().toISOString()
    });

    storage.set(KEYS.bookmarks, bookmarks);

    showToast("Bookmark saved 🔖", "success");
  }

  function removeBookmark(url) {
    const bookmarks =
      getBookmarks().filter(
        bookmark => bookmark.url !== url
      );

    storage.set(KEYS.bookmarks, bookmarks);

    showToast("Bookmark removed");
  }

  window.addBookmark = addBookmark;
  window.removeBookmark = removeBookmark;

  $$("[data-bookmark-url]").forEach(button => {
    button.addEventListener("click", () => {
      addBookmark({
        title:
          button.dataset.bookmarkTitle ||
          "Saved Content",
        url:
          button.dataset.bookmarkUrl,
        type:
          button.dataset.bookmarkType ||
          "website"
      });
    });
  });

  function renderBookmarksInViewer() {
    const bookmarks = getBookmarks();

    if (!viewerFrame) return;

    if (!bookmarks.length) {
      viewerFrame.srcdoc = `
        <div style="
          font-family:Arial;
          padding:40px;
          text-align:center;
        ">
          <h2>🔖 No Bookmarks</h2>
          <p>अभी कोई content bookmark नहीं किया गया है।</p>
        </div>
      `;
      return;
    }

    viewerFrame.srcdoc = `
      <div style="
        font-family:Arial,sans-serif;
        padding:30px;
        background:#0f172a;
        color:white;
        min-height:100vh;
      ">
        <h2>🔖 Saved Bookmarks</h2>

        ${bookmarks.map(bookmark => `
          <div style="
            padding:18px;
            margin:12px 0;
            border-radius:15px;
            background:#1e293b;
          ">
            <h3>${escapeHTML(bookmark.title)}</h3>
            <p>${escapeHTML(bookmark.type)}</p>
            <a
              href="${escapeHTML(bookmark.url)}"
              target="_blank"
              rel="noopener noreferrer"
              style="color:#a78bfa"
            >
              Open →
            </a>
          </div>
        `).join("")}
      </div>
    `;
  }

  /* -----------------------------
     PROGRESS / STATS
  ----------------------------- */

  const defaultStats = {
    books: 0,
    questions: 0,
    tests: 0,
    streak: 0
  };

  function getStats() {
    return {
      ...defaultStats,
      ...storage.get(KEYS.stats, {})
    };
  }

  function updateStats(changes = {}) {
    const stats = getStats();

    Object.keys(changes).forEach(key => {
      if (
        typeof changes[key] === "number" &&
        Number.isFinite(changes[key])
      ) {
        stats[key] = Math.max(
          0,
          stats[key] + changes[key]
        );
      }
    });

    storage.set(KEYS.stats, stats);

    renderStats();

    return stats;
  }

  function renderStats() {
    const stats = getStats();

    $$("[data-stat]").forEach(element => {
      const key = element.dataset.stat;

      if (key in stats) {
        element.textContent = stats[key];
      }
    });

    $$("[data-progress]").forEach(element => {
      const key = element.dataset.progress;

      const value =
        Number(stats[key] || 0);

      const max =
        Number(element.dataset.max || 100);

      const percent =
        Math.min(100, (value / max) * 100);

      element.style.width =
        `${percent}%`;
    });
  }

  window.updateStats = updateStats;

  renderStats();

  /* -----------------------------
     VOICE INPUT
  ----------------------------- */

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      showToast("🎤 सुन रहा हूँ...");
    };

    recognition.onresult = event => {
      const transcript =
        event.results[0][0].transcript;

      const active =
        document.activeElement;

      if (
        active &&
        (
          active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA"
        )
      ) {
        active.value =
          `${active.value} ${transcript}`.trim();

        active.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );
      } else if (searchInput) {
        searchInput.value = transcript;
        renderSearchResults(transcript);
      }

      showToast("Voice input complete");
    };

    recognition.onerror = () => {
      showToast("Voice input काम नहीं कर पाया");
    };
  }

  $$("[data-voice]").forEach(button => {
    button.addEventListener("click", () => {
      if (!recognition) {
        showToast(
          "आपके browser में voice input support नहीं है"
        );
        return;
      }

      try {
        recognition.start();
      } catch {}
    });
  });

  /* -----------------------------
     TEXT TO SPEECH
  ----------------------------- */

  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      showToast("Text-to-speech support नहीं है");
      return;
    }

    const value =
      String(text || "").trim();

    if (!value) return;

    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(value);

    utterance.lang = "hi-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

  window.speakText = speakText;

  $$("[data-speak]").forEach(button => {
    button.addEventListener("click", () => {
      const selector =
        button.dataset.speak;

      const target =
        selector
          ? $(selector)
          : button.parentElement;

      speakText(target?.innerText || "");
    });
  });

  /* -----------------------------
     ONLINE / OFFLINE
  ----------------------------- */

  function updateConnectionStatus() {
    const online =
      navigator.onLine;

    $$("[data-online-status]").forEach(element => {
      element.textContent =
        online
          ? "Online"
          : "Offline";

      element.classList.toggle(
        "offline",
        !online
      );
    });

    if (!online) {
      showToast("आप Offline हैं");
    }
  }

  window.addEventListener(
    "online",
    updateConnectionStatus
  );

  window.addEventListener(
    "offline",
    updateConnectionStatus
  );

  updateConnectionStatus();

  /* -----------------------------
     SUPPORT
  ----------------------------- */

  $$("[data-telegram]").forEach(button => {
    button.addEventListener("click", () => {
      window.open(
        "https://t.me/Yashpal_aagri",
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  /* -----------------------------
     GLOBAL EXTERNAL LINKS
  ----------------------------- */

  $$("a[href^='http']").forEach(link => {
    if (
      link.hostname &&
      link.hostname !== window.location.hostname
    ) {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    }
  });

  /* -----------------------------
     CURRENT YEAR
  ----------------------------- */

  const year = new Date().getFullYear();

  $$("[data-year]").forEach(element => {
    element.textContent = year;
  });

  /* -----------------------------
     SETTINGS QUICK BUTTON
  ----------------------------- */

  $("#settingsButton")?.addEventListener(
    "click",
    () => {
      goTo("pages/settings.html");
    }
  );

  /* -----------------------------
     PROFILE BUTTON
  ----------------------------- */

  $("#profileButton")?.addEventListener(
    "click",
    () => {
      showToast("Profile: Yashpal Aagri");
    }
  );

  /* -----------------------------
     INITIAL SETTINGS
  ----------------------------- */

  applyTheme(
    storage.get(KEYS.theme, "purple")
  );

  applyDisplayMode(
    storage.get(KEYS.mode, "dark")
  );

  /* -----------------------------
     SMOOTH SCROLL
  ----------------------------- */

  $$("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const targetID =
        link.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const target =
        $(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* -----------------------------
     HOME QUICK ACCESS
  ----------------------------- */

  const quickRoutes = {
    books: "pages/books.html",
    videos: "pages/videos.html",
    youtube: "pages/youtube.html",
    websites: "pages/websites.html",
    questions: "pages/question-bank.html",
    dpp: "pages/dpp.html",
    quiz: "pages/quiz.html",
    mock: "pages/mock-test.html",
    ai: "pages/ai.html",
    library: "pages/library.html"
  };

  $$("[data-quick]").forEach(card => {
    card.addEventListener("click", () => {
      const key =
        card.dataset.quick;

      const route =
        quickRoutes[key];

      if (route) {
        goTo(route);
      }
    });
  });

  /* -----------------------------
     SUBJECT NAVIGATION
  ----------------------------- */

  $$("[data-subject]").forEach(card => {
    card.addEventListener("click", () => {
      const subject =
        card.dataset.subject;

      if (!subject) return;

      storage.set(
        "ml_selected_subject",
        subject
      );

      goTo("pages/question-bank.html");
    });
  });

  /* -----------------------------
     PREVENT EMPTY BUTTON ACTION
  ----------------------------- */

  $$("button[type='button']").forEach(button => {
    button.addEventListener("click", () => {
      const action =
        button.dataset.action;

      if (!action) return;

      if (action === "search") {
        openSearch();
      }

      if (action === "add-website") {
        openAddWebsiteModal();
      }

      if (action === "home") {
        goTo("index.html");
      }
    });
  });

  /* -----------------------------
     GLOBAL API
  ----------------------------- */

  window.MissionLakshya = {
    version: "1.0.0",

    toast: showToast,

    navigate: goTo,

    search: openSearch,

    openViewer: openInViewer,

    openYouTube,

    addBookmark,

    removeBookmark,

    getBookmarks,

    getWebsites,

    addWebsite: saveWebsite,

    getStats,

    updateStats,

    applyTheme,

    applyDisplayMode,

    speak: speakText
  };

  /* -----------------------------
     FINAL STARTUP
  ----------------------------- */

  document.documentElement.classList.add(
    "mission-lakshya-ready"
  );

  setTimeout(() => {
    enableTilt();
    enableRipple();
    renderStats();
  }, 300);

  console.log(
    "🚀 Mission Lakshya NEET 2027 loaded successfully."
  );

})();
