/* =========================================================
   MISSION LAKSHYA NEET 2027
   Corrected Global Script
   Creator: Yashpal Aagri
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const isExternalUrl = (url) =>
    /^https?:\/\//i.test(url || "") ||
    /^mailto:/i.test(url || "") ||
    /^tel:/i.test(url || "");

  const isOnPagesFolder = () =>
    window.location.pathname.includes("/pages/");

  /*
    Shared script.js root और pages/ दोनों जगह से चलता है।
    इसलिए programmatic navigation को सही path में बदलते हैं।
  */
  function resolveRoute(url) {
    if (!url) return "";

    url = String(url).trim();

    if (
      isExternalUrl(url) ||
      url.startsWith("#") ||
      url.startsWith("javascript:")
    ) {
      return url;
    }

    if (!isOnPagesFolder()) {
      return url;
    }

    // pages/ के अंदर से root index पर जाना
    if (url === "index.html" || url === "./index.html") {
      return "../index.html";
    }

    // pages/ के अंदर से pages/xxx.html
    if (url.startsWith("pages/")) {
      return "../" + url.substring("pages/".length);
    }

    return url;
  }

  function goTo(url) {
    if (!url) return;

    const finalUrl = resolveRoute(url);

    if (finalUrl.startsWith("#")) {
      window.location.hash = finalUrl.substring(1);
      return;
    }

    if (isExternalUrl(finalUrl)) {
      window.location.href = finalUrl;
      return;
    }

    window.location.href = finalUrl;
  }

  function showToast(message, type = "info") {
    const toast = $("#toast");
    const toastMessage = $("#toastMessage");
    const toastIcon = $("#toastIcon");

    if (!toast) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    if (toastIcon) {
      const icons = {
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "ℹ"
      };

      toastIcon.textContent = icons[type] || icons.info;
    }

    toast.classList.add("show");

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  window.showToast = showToast;
  window.goTo = goTo;


  /* ---------------------------------------------------------
     CURRENT YEAR
  --------------------------------------------------------- */

  function setCurrentYear() {
    const year = new Date().getFullYear();

    const currentYear = $("#currentYear");
    if (currentYear) {
      currentYear.textContent = year;
    }

    $$("[data-year]").forEach((el) => {
      el.textContent = year;
    });
  }


  /* ---------------------------------------------------------
     SIDEBAR / MOBILE MENU
  --------------------------------------------------------- */

  const sidebar = $(".sidebar");
  const mobileMenu = $("#mobileMenu");

  function openSidebar() {
    if (!sidebar) return;

    sidebar.classList.add("open");
    document.body.classList.add("sidebar-open");
  }

  function closeSidebar() {
    if (!sidebar) return;

    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  }

  function toggleSidebar() {
    if (!sidebar) return;

    if (sidebar.classList.contains("open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (event) => {
      event.preventDefault();
      toggleSidebar();
    });
  }

  // IMPORTANT:
  // पहले data-page click handler navigation को गलत कर रहा था।
  // अब href को override नहीं करेंगे।
  $$("[data-page]").forEach((element) => {
    element.addEventListener("click", () => {
      closeSidebar();
      // Browser को original href पर जाने दिया जाएगा।
    });
  });


  /* ---------------------------------------------------------
     ACTIVE SIDEBAR ITEM
  --------------------------------------------------------- */

  function setActiveSidebar() {
    const currentPath =
      window.location.pathname.replace(/\/+$/, "") || "/";

    $$(".sidebar a[href]").forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (!href) return;

      let targetPath = href;

      try {
        targetPath = new URL(
          href,
          window.location.href
        ).pathname.replace(/\/+$/, "") || "/";
      } catch (_) {}

      if (targetPath === currentPath) {
        link.classList.add("active");
      }

      // Root homepage handling
      if (
        (currentPath === "/" || currentPath.endsWith("/index.html")) &&
        (href === "/" || href === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }


  /* ---------------------------------------------------------
     SEARCH
  --------------------------------------------------------- */

  const searchOverlay = $("#searchOverlay");
  const searchOverlayInput = $("#searchOverlayInput");
  const globalSearch = $("#globalSearch");

  const searchData = [
    {
      title: "Books",
      description: "NCERT और study books",
      url: "pages/books.html",
      icon: "📚"
    },
    {
      title: "Library",
      description: "सभी study resources",
      url: "pages/library.html",
      icon: "📖"
    },
    {
      title: "Video Lectures",
      description: "NEET video lectures",
      url: "pages/videos.html",
      icon: "🎥"
    },
    {
      title: "YouTube",
      description: "YouTube study content",
      url: "pages/youtube.html",
      icon: "▶️"
    },
    {
      title: "Websites",
      description: "Study websites",
      url: "pages/websites.html",
      icon: "🌐"
    },
    {
      title: "Question Bank",
      description: "NEET MCQ questions",
      url: "pages/question-bank.html",
      icon: "❓"
    },
    {
      title: "DPP",
      description: "Daily Practice Problems",
      url: "pages/dpp.html",
      icon: "📝"
    },
    {
      title: "Quiz",
      description: "Chapter-wise quiz",
      url: "pages/quiz.html",
      icon: "🧠"
    },
    {
      title: "Mock Test",
      description: "NEET full mock test",
      url: "pages/mock-test.html",
      icon: "⏱️"
    },
    {
      title: "AI Doubt Solver",
      description: "AI से अपने doubts पूछें",
      url: "pages/ai.html",
      icon: "🤖"
    },
    {
      title: "Planner",
      description: "अपनी study planning करें",
      url: "pages/planner.html",
      icon: "📅"
    },
    {
      title: "Analytics",
      description: "अपनी performance देखें",
      url: "pages/analytics.html",
      icon: "📊"
    },
    {
      title: "Bookmarks",
      description: "Saved questions और resources",
      url: "pages/bookmarks.html",
      icon: "🔖"
    },
    {
      title: "Themes",
      description: "Website theme बदलें",
      url: "pages/themes.html",
      icon: "🎨"
    },
    {
      title: "Settings",
      description: "Website settings",
      url: "pages/settings.html",
      icon: "⚙️"
    }
  ];

  function openSearch(value = "") {
    if (!searchOverlay) return;

    searchOverlay.classList.add("show");
    document.body.classList.add("search-open");

    if (searchOverlayInput) {
      searchOverlayInput.value = value;

      setTimeout(() => {
        searchOverlayInput.focus();
        renderSearchResults(value);
      }, 50);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.remove("show");
    document.body.classList.remove("search-open");
  }

  function renderSearchResults(query = "") {
    const container = $("#searchResults");

    if (!container) return;

    const q = query.trim().toLowerCase();

    const results = q
      ? searchData.filter((item) => {
          return (
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
          );
        })
      : searchData.slice(0, 8);

    if (!results.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>कुछ नहीं मिला</h3>
          <p>दूसरा keyword try करें।</p>
        </div>
      `;
      return;
    }

    container.innerHTML = results
      .map(
        (item) => `
          <button
            type="button"
            class="search-result"
            data-search-url="${escapeAttribute(item.url)}"
          >
            <span class="search-result-icon">${item.icon}</span>
            <span class="search-result-content">
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.description)}</small>
            </span>
            <span class="search-result-arrow">→</span>
          </button>
        `
      )
      .join("");

    $$(".search-result", container).forEach((button) => {
      button.addEventListener("click", () => {
        const url = button.dataset.searchUrl;
        goTo(url);
      });
    });
  }

  if (globalSearch) {
    globalSearch.addEventListener("click", () => {
      openSearch();
    });

    globalSearch.addEventListener("focus", () => {
      openSearch(globalSearch.value || "");
    });

    globalSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        openSearch(globalSearch.value || "");
      }
    });
  }

  if (searchOverlayInput) {
    searchOverlayInput.addEventListener("input", (event) => {
      renderSearchResults(event.target.value);
    });

    searchOverlayInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
      if (
        event.target === searchOverlay ||
        event.target.closest("[data-close-search]")
      ) {
        closeSearch();
      }
    });
  }

  window.openSearch = openSearch;
  window.closeSearch = closeSearch;


  /* ---------------------------------------------------------
     NOTIFICATIONS
  --------------------------------------------------------- */

  const notificationBtn = $("#notificationBtn");
  const notificationPanel = $("#notificationPanel");

  if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      notificationPanel.classList.toggle("show");

      // Other dropdowns close
      if (searchOverlay) {
        searchOverlay.classList.remove("show");
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (
      notificationPanel &&
      !notificationPanel.contains(event.target) &&
      notificationBtn &&
      !notificationBtn.contains(event.target)
    ) {
      notificationPanel.classList.remove("show");
    }
  });


  /* ---------------------------------------------------------
     THEME QUICK BUTTON
  --------------------------------------------------------- */

  const themeQuickBtn = $("#themeQuickBtn");

  const themes = [
    "purple",
    "midnight",
    "ocean",
    "sunset",
    "rose",
    "gold",
    "cyber"
  ];

  function applyTheme(theme) {
    if (!theme) return;

    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;

    localStorage.setItem("ml_theme", theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("ml_theme");

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Default purple
      applyTheme("purple");
    }
  }

  function cycleTheme() {
    const current =
      localStorage.getItem("ml_theme") || "purple";

    const index = themes.indexOf(current);

    const next =
      themes[(index + 1) % themes.length];

    applyTheme(next);

    showToast(`Theme: ${next}`, "success");
  }

  if (themeQuickBtn) {
    themeQuickBtn.addEventListener("click", cycleTheme);
  }

  window.applyTheme = applyTheme;


  /* ---------------------------------------------------------
     WEBSITE MODAL
  --------------------------------------------------------- */

  const websiteModal = $("#websiteModal");
  const addWebsiteBtn = $("#addWebsiteBtn");
  const addWebsiteCard = $("#addWebsiteCard");
  const closeWebsiteModal = $("#closeWebsiteModal");
  const cancelWebsite = $("#cancelWebsite");
  const websiteForm = $("#websiteForm");

  function openWebsiteModal() {
    if (!websiteModal) return;

    websiteModal.classList.add("show");
    document.body.classList.add("modal-open");

    const name = $("#websiteName");

    if (name) {
      setTimeout(() => name.focus(), 50);
    }
  }

  function closeWebsiteModalFn() {
    if (!websiteModal) return;

    websiteModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  if (addWebsiteBtn) {
    addWebsiteBtn.addEventListener("click", openWebsiteModal);
  }

  if (addWebsiteCard) {
    addWebsiteCard.addEventListener("click", openWebsiteModal);
  }

  if (closeWebsiteModal) {
    closeWebsiteModal.addEventListener(
      "click",
      closeWebsiteModalFn
    );
  }

  if (cancelWebsite) {
    cancelWebsite.addEventListener(
      "click",
      closeWebsiteModalFn
    );
  }

  if (websiteModal) {
    websiteModal.addEventListener("click", (event) => {
      if (
        event.target === websiteModal ||
        event.target.closest("[data-close-modal]")
      ) {
        closeWebsiteModalFn();
      }
    });
  }


  /* ---------------------------------------------------------
     WEBSITE STORAGE
  --------------------------------------------------------- */

  const WEBSITE_STORAGE_KEY = "mission_lakshya_websites";

  function getSavedWebsites() {
    try {
      return JSON.parse(
        localStorage.getItem(WEBSITE_STORAGE_KEY) || "[]"
      );
    } catch (_) {
      return [];
    }
  }

  function saveWebsites(websites) {
    localStorage.setItem(
      WEBSITE_STORAGE_KEY,
      JSON.stringify(websites)
    );
  }

  function renderSavedWebsites() {
    const grid = $("#websiteGrid");

    if (!grid) return;

    const saved = getSavedWebsites();

    saved.forEach((site) => {
      addWebsiteCardToGrid(site, grid);
    });
  }

  function addWebsiteCardToGrid(site, grid) {
    if (!site || !grid) return;

    const card = document.createElement("article");

    card.className = "website-card custom-website-card";

    card.innerHTML = `
      <div class="website-card-icon">🌐</div>

      <div class="website-card-content">
        <h3>${escapeHtml(site.name || "Website")}</h3>
        <p>${escapeHtml(site.category || "Study")}</p>
      </div>

      <button
        type="button"
        class="website-open-btn"
        aria-label="Open website"
      >
        Open
      </button>
    `;

    const button = $(".website-open-btn", card);

    if (button) {
      button.addEventListener("click", () => {
        openInViewer(site.url, site.name);
      });
    }

    grid.appendChild(card);
  }

  if (websiteForm) {
    websiteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = $("#websiteName");
      const urlInput = $("#websiteUrl");
      const categoryInput = $("#websiteCategory");

      const name = nameInput?.value.trim() || "";
      const url = urlInput?.value.trim() || "";
      const category =
        categoryInput?.value.trim() || "Study";

      if (!name) {
        showToast("Website का नाम डालें।", "warning");
        return;
      }

      if (!url) {
        showToast("Website URL डालें।", "warning");
        return;
      }

      let validUrl = url;

      if (!/^https?:\/\//i.test(validUrl)) {
        validUrl = "https://" + validUrl;
      }

      try {
        new URL(validUrl);
      } catch (_) {
        showToast("सही URL डालें।", "error");
        return;
      }

      const websites = getSavedWebsites();

      const site = {
        id: Date.now(),
        name,
        url: validUrl,
        category
      };

      websites.push(site);
      saveWebsites(websites);

      const grid = $("#websiteGrid");

      if (grid) {
        addWebsiteCardToGrid(site, grid);
      }

      websiteForm.reset();
      closeWebsiteModalFn();

      showToast("Website successfully add हो गई।", "success");
    });
  }


  /* ---------------------------------------------------------
     UNIVERSAL VIEWER
  --------------------------------------------------------- */

  const viewerContainer = $("#viewerContainer");
  const viewerWelcome = $("#viewerWelcome");
  const universalFrame = $("#universalFrame");
  const viewerUrl = $("#viewerUrl");

  let viewerHistory = [];
  let viewerHistoryIndex = -1;

  function normalizeViewerUrl(url) {
    if (!url) return "";

    let finalUrl = url.trim();

    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = "https://" + finalUrl;
    }

    try {
      return new URL(finalUrl).href;
    } catch (_) {
      return "";
    }
  }

  function youtubeEmbedUrl(url) {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes("youtube.com") &&
        parsed.pathname === "/watch"
      ) {
        const id = parsed.searchParams.get("v");

        if (id) {
          return `https://www.youtube.com/embed/${id}`;
        }
      }

      if (parsed.hostname === "youtu.be") {
        const id = parsed.pathname.replace("/", "").trim();

        if (id) {
          return `https://www.youtube.com/embed/${id}`;
        }
      }

      if (
        parsed.hostname.includes("youtube.com") &&
        parsed.pathname.startsWith("/shorts/")
      ) {
        const id = parsed.pathname.split("/")[2];

        if (id) {
          return `https://www.youtube.com/embed/${id}`;
        }
      }

      return null;
    } catch (_) {
      return null;
    }
  }

  function updateViewerButtons() {
    const back = $("#viewerBack");
    const forward = $("#viewerForward");

    if (back) {
      back.disabled = viewerHistoryIndex <= 0;
    }

    if (forward) {
      forward.disabled =
        viewerHistoryIndex >= viewerHistory.length - 1;
    }
  }

  function loadViewerUrl(url, title = "Mission Lakshya Viewer", addHistory = true) {
    const finalUrl = normalizeViewerUrl(url);

    if (!finalUrl) {
      showToast("सही URL डालें।", "error");
      return;
    }

    if (!viewerContainer || !universalFrame) {
      // Viewer page पर नहीं हैं
      window.open(finalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (viewerUrl) {
      viewerUrl.value = finalUrl;
    }

    const viewerTitle = $("#viewerTitle");

    if (viewerTitle) {
      viewerTitle.textContent = title;
    }

    if (viewerWelcome) {
      viewerWelcome.style.display = "none";
    }

    universalFrame.style.display = "block";

    const embedUrl = youtubeEmbedUrl(finalUrl);

    universalFrame.src = embedUrl || finalUrl;

    if (addHistory) {
      viewerHistory =
        viewerHistory.slice(0, viewerHistoryIndex + 1);

      viewerHistory.push({
        url: finalUrl,
        title
      });

      viewerHistoryIndex =
        viewerHistory.length - 1;
    }

    updateViewerButtons();

    // Viewer तक scroll
    try {
      viewerContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } catch (_) {}
  }

  function openInViewer(url, title = "Website") {
    const finalUrl = normalizeViewerUrl(url);

    if (!finalUrl) {
      showToast("सही URL नहीं है।", "error");
      return;
    }

    if (!viewerContainer || !universalFrame) {
      window.open(finalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    loadViewerUrl(finalUrl, title, true);
  }

  window.openInViewer = openInViewer;


  /* ---------------------------------------------------------
     VIEWER OPEN BUTTON
  --------------------------------------------------------- */

  const viewerOpen = $("#viewerOpen");

  if (viewerOpen) {
    viewerOpen.addEventListener("click", () => {
      const url = viewerUrl?.value.trim();

      if (!url) {
        showToast("पहले URL डालें।", "warning");
        return;
      }

      loadViewerUrl(url, "Website", true);
    });
  }


  /* ---------------------------------------------------------
     VIEWER URL ENTER
  --------------------------------------------------------- */

  if (viewerUrl) {
    viewerUrl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        loadViewerUrl(
          viewerUrl.value,
          "Website",
          true
        );
      }
    });
  }


  /* ---------------------------------------------------------
     VIEWER BACK
  --------------------------------------------------------- */

  const viewerBack = $("#viewerBack");

  if (viewerBack) {
    viewerBack.addEventListener("click", () => {
      if (viewerHistoryIndex <= 0) return;

      viewerHistoryIndex--;

      const item =
        viewerHistory[viewerHistoryIndex];

      loadViewerUrl(
        item.url,
        item.title,
        false
      );
    });
  }


  /* ---------------------------------------------------------
     VIEWER FORWARD
  --------------------------------------------------------- */

  const viewerForward = $("#viewerForward");

  if (viewerForward) {
    viewerForward.addEventListener("click", () => {
      if (
        viewerHistoryIndex >=
        viewerHistory.length - 1
      ) {
        return;
      }

      viewerHistoryIndex++;

      const item =
        viewerHistory[viewerHistoryIndex];

      loadViewerUrl(
        item.url,
        item.title,
        false
      );
    });
  }


  /* ---------------------------------------------------------
     VIEWER REFRESH
  --------------------------------------------------------- */

  const viewerRefresh = $("#viewerRefresh");

  if (viewerRefresh) {
    viewerRefresh.addEventListener("click", () => {
      if (universalFrame && universalFrame.src) {
        universalFrame.contentWindow?.location.reload();
      } else {
        showToast("Viewer में अभी कोई page नहीं है।", "info");
      }
    });
  }


  /* ---------------------------------------------------------
     VIEWER EXTERNAL OPEN
  --------------------------------------------------------- */

  const viewerExternal = $("#viewerExternal");

  if (viewerExternal) {
    viewerExternal.addEventListener("click", () => {
      const url = viewerUrl?.value.trim();

      if (!url) {
        showToast("पहले URL डालें।", "warning");
        return;
      }

      const finalUrl = normalizeViewerUrl(url);

      if (finalUrl) {
        window.open(
          finalUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
    });
  }


  /* ---------------------------------------------------------
     VIEWER FULLSCREEN
  --------------------------------------------------------- */

  const viewerFullscreen = $("#viewerFullscreen");

  if (viewerFullscreen) {
    viewerFullscreen.addEventListener("click", async () => {
      const frame =
        universalFrame || viewerContainer;

      if (!frame) return;

      try {
        if (frame.requestFullscreen) {
          await frame.requestFullscreen();
        } else {
          showToast(
            "Fullscreen इस device पर available नहीं है।",
            "info"
          );
        }
      } catch (_) {
        showToast(
          "Fullscreen open नहीं हो सका।",
          "warning"
        );
      }
    });
  }


  /* ---------------------------------------------------------
     VIEWER DEMO
  --------------------------------------------------------- */

  const viewerDemoBtn = $("#viewerDemoBtn");

  if (viewerDemoBtn) {
    viewerDemoBtn.addEventListener("click", () => {
      if (viewerUrl) {
        viewerUrl.value = "https://www.youtube.com/";
      }

      showToast(
        "URL viewer में डाल दिया गया है। Open दबाएँ।",
        "info"
      );
    });
  }


  /* ---------------------------------------------------------
     VIEWER TABS
  --------------------------------------------------------- */

  $$("[data-viewer-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$("[data-viewer-tab]").forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      const type = tab.dataset.viewerTab;

      if (type === "youtube") {
        if (viewerUrl) {
          viewerUrl.placeholder =
            "YouTube video URL डालें...";
        }

        showToast("YouTube Viewer selected", "info");
      }

      if (type === "website") {
        if (viewerUrl) {
          viewerUrl.placeholder =
            "Website URL डालें...";
        }

        showToast("Website Viewer selected", "info");
      }

      if (type === "bookmarks") {
        showToast(
          "Bookmarks feature खोलने के लिए Bookmarks page जाएँ।",
          "info"
        );
      }
    });
  });


  /* ---------------------------------------------------------
     STATIC WEBSITE CARDS
  --------------------------------------------------------- */

  $$("[data-url]").forEach((element) => {
    // जिन elements पर data-url है उन्हें viewer से जोड़ना
    if (element.closest("#websiteModal")) return;

    element.addEventListener("click", (event) => {
      const url = element.dataset.url;

      if (!url) return;

      // अगर button/card के अंदर anchor है तो double navigation रोकें
      const anchor = element.closest("a");

      if (anchor && anchor.getAttribute("href")) {
        return;
      }

      event.preventDefault();

      const title =
        element.dataset.title ||
        element.getAttribute("aria-label") ||
        "Study Website";

      openInViewer(url, title);
    });
  });


  /* ---------------------------------------------------------
     QUICK ACCESS
  --------------------------------------------------------- */

  $$("[data-quick]").forEach((element) => {
    element.addEventListener("click", () => {
      const route = element.dataset.quick;

      if (route) {
        goTo(route);
      }
    });
  });


  /* ---------------------------------------------------------
     SUBJECT NAVIGATION
  --------------------------------------------------------- */

  $$("[data-subject]").forEach((element) => {
    element.addEventListener("click", () => {
      const subject = element.dataset.subject;

      if (!subject) return;

      const url =
        `pages/question-bank.html?subject=${encodeURIComponent(subject)}`;

      goTo(url);
    });
  });


  /* ---------------------------------------------------------
     PROGRESS / STATS
  --------------------------------------------------------- */

  function setProgressElement(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    const safeValue = Math.max(
      0,
      Math.min(100, Number(value) || 0)
    );

    element.style.width = safeValue + "%";
  }

  function renderStats() {
    // Existing data attributes
    $$("[data-stat]").forEach((element) => {
      const key = element.dataset.stat;

      const saved =
        localStorage.getItem(
          `ml_stat_${key}`
        );

      if (saved !== null) {
        element.textContent = saved;
      }
    });

    $$("[data-progress]").forEach((element) => {
      const key = element.dataset.progress;

      const saved =
        localStorage.getItem(
          `ml_progress_${key}`
        );

      if (saved !== null) {
        const value = Math.max(
          0,
          Math.min(100, Number(saved) || 0)
        );

        element.style.width = value + "%";
      }
    });

    // Current index.html IDs
    const booksProgress =
      localStorage.getItem("ml_progress_books");

    const questionsProgress =
      localStorage.getItem("ml_progress_questions");

    const testsProgress =
      localStorage.getItem("ml_progress_tests");

    const streakProgress =
      localStorage.getItem("ml_progress_streak");

    if (booksProgress !== null) {
      setProgressElement(
        "booksProgress",
        booksProgress
      );
    }

    if (questionsProgress !== null) {
      setProgressElement(
        "questionsProgress",
        questionsProgress
      );
    }

    if (testsProgress !== null) {
      setProgressElement(
        "testsProgress",
        testsProgress
      );
    }

    if (streakProgress !== null) {
      setProgressElement(
        "streakProgress",
        streakProgress
      );
    }
  }


  /* ---------------------------------------------------------
     RECENT ACTIVITY
  --------------------------------------------------------- */

  const ACTIVITY_KEY = "ml_recent_activity";

  function getActivities() {
    try {
      return JSON.parse(
        localStorage.getItem(ACTIVITY_KEY) || "[]"
      );
    } catch (_) {
      return [];
    }
  }

  function saveActivity(title, type = "Study") {
    const activities = getActivities();

    activities.unshift({
      title,
      type,
      time: new Date().toISOString()
    });

    localStorage.setItem(
      ACTIVITY_KEY,
      JSON.stringify(activities.slice(0, 20))
    );

    renderActivities();
  }

  function renderActivities() {
    const container = $("#recentActivity");

    if (!container) return;

    const activities = getActivities();

    if (!activities.length) {
      return;
    }

    container.innerHTML = activities
      .slice(0, 10)
      .map(
        (activity) => `
          <div class="activity-item">
            <div class="activity-icon">📚</div>
            <div class="activity-content">
              <strong>${escapeHtml(activity.title)}</strong>
              <small>${escapeHtml(activity.type)}</small>
            </div>
          </div>
        `
      )
      .join("");
  }

  window.saveActivity = saveActivity;

  const clearActivity = $("#clearActivity");

  if (clearActivity) {
    clearActivity.addEventListener("click", () => {
      localStorage.removeItem(ACTIVITY_KEY);
      renderActivities();

      showToast(
        "Recent activity clear हो गई।",
        "success"
      );
    });
  }


  /* ---------------------------------------------------------
     PARTICLES
  --------------------------------------------------------- */

  function createParticles() {
    const container =
      $("#mlParticles") ||
      $("#particles") ||
      $(".particles");

    if (!container) return;

    // Existing particles को duplicate न करें
    if (
      container.dataset.generated === "true"
    ) {
      return;
    }

    container.dataset.generated = "true";

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < 30; i++) {
      const particle =
        document.createElement("span");

      particle.className = "ml-particle";

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.top =
        Math.random() * 100 + "%";

      particle.style.animationDelay =
        Math.random() * 5 + "s";

      particle.style.animationDuration =
        5 + Math.random() * 8 + "s";

      fragment.appendChild(particle);
    }

    container.appendChild(fragment);
  }


  /* ---------------------------------------------------------
     KEYBOARD SHORTCUTS
  --------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    // ESC
    if (event.key === "Escape") {
      closeSearch();
      closeSidebar();
      closeWebsiteModalFn();

      if (notificationPanel) {
        notificationPanel.classList.remove("show");
      }
    }

    // Ctrl + K / Cmd + K
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      openSearch();
    }
  });


  /* ---------------------------------------------------------
     IMAGE FALLBACK
  --------------------------------------------------------- */

  $$("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;

      img.dataset.fallbackApplied = "true";

      // Logo / normal image fallback
      if (
        img.id === "logo" ||
        img.classList.contains("logo")
      ) {
        img.style.display = "none";

        const parent = img.parentElement;

        if (
          parent &&
          !$(".logo-fallback", parent)
        ) {
          const fallback =
            document.createElement("span");

          fallback.className = "logo-fallback";
          fallback.textContent = "ML";

          parent.appendChild(fallback);
        }
      }
    });
  });


  /* ---------------------------------------------------------
     EXTERNAL LINKS
  --------------------------------------------------------- */

  $$("a[target='_blank']").forEach((link) => {
    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  });


  /* ---------------------------------------------------------
     SAFE HTML HELPERS
  --------------------------------------------------------- */

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }


  /* ---------------------------------------------------------
     INITIALIZATION
  --------------------------------------------------------- */

  function init() {
    setCurrentYear();
    setActiveSidebar();
    loadTheme();
    renderStats();
    renderActivities();
    renderSavedWebsites();
    createParticles();

    // Search results तैयार रखें
    if (searchOverlayInput) {
      renderSearchResults(
        searchOverlayInput.value || ""
      );
    }

    updateViewerButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
