/* =========================================================
   MISSION LAKSHYA NEET 2027
   STEP 3 — Themes + Modes + 3D + Particles + Search
   Created by Yashpal Aagri
========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
  ======================================================= */

  const STORAGE = {
    theme: "mlSelectedTheme",
    mode: "mlDisplayMode",
    threeD: "mlThreeD",
    particles: "mlParticles",
    animations: "mlAnimations"
  };

  const themes = {
    purple: {
      name: "Purple",
      primary: "#6d28d9",
      secondary: "#8b5cf6",
      accent: "#a78bfa"
    },

    midnight: {
      name: "Midnight",
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#60a5fa"
    },

    ocean: {
      name: "Ocean",
      primary: "#0891b2",
      secondary: "#06b6d4",
      accent: "#67e8f9"
    },

    orange: {
      name: "Orange",
      primary: "#ea580c",
      secondary: "#f97316",
      accent: "#fb923c"
    },

    red: {
      name: "Red",
      primary: "#dc2626",
      secondary: "#ef4444",
      accent: "#f87171"
    },

    sunset: {
      name: "Sunset",
      primary: "#db2777",
      secondary: "#f97316",
      accent: "#fb7185"
    },

    rose: {
      name: "Rose",
      primary: "#e11d48",
      secondary: "#f43f5e",
      accent: "#fb7185"
    },

    cyber: {
      name: "Cyber",
      primary: "#7c3aed",
      secondary: "#06b6d4",
      accent: "#22d3ee"
    },

    gold: {
      name: "Gold",
      primary: "#ca8a04",
      secondary: "#eab308",
      accent: "#facc15"
    },

    emerald: {
      name: "Emerald",
      primary: "#059669",
      secondary: "#10b981",
      accent: "#34d399"
    },

    green: {
      name: "Green",
      primary: "#16a34a",
      secondary: "#22c55e",
      accent: "#4ade80"
    },

    indigo: {
      name: "Indigo",
      primary: "#4f46e5",
      secondary: "#6366f1",
      accent: "#818cf8"
    }
  };


  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("LocalStorage unavailable:", error);
    }
  }

  function load(key, fallback = null) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch (error) {
      return fallback;
    }
  }


  /* =======================================================
     THEME SYSTEM
  ======================================================= */

  function applyTheme(themeName = "purple") {
    const theme = themes[themeName] || themes.purple;

    document.documentElement.style.setProperty(
      "--primary",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--primary-2",
      theme.secondary
    );

    document.documentElement.style.setProperty(
      "--accent",
      theme.accent
    );

    document.body.dataset.theme = themeName;

    save(STORAGE.theme, themeName);

    $$(".theme-option").forEach(option => {
      option.classList.toggle(
        "active",
        option.dataset.theme === themeName
      );
    });

    showNotification(`Theme: ${theme.name}`);
  }


  /* =======================================================
     DISPLAY MODES
  ======================================================= */

  function applyMode(mode = "dark") {
    const body = document.body;

    body.classList.remove(
      "light-mode",
      "dark-mode",
      "oled",
      "glass",
      "neon",
      "focus-mode",
      "study-mode"
    );

    switch (mode) {
      case "light":
        body.classList.add("light-mode");
        break;

      case "oled":
        body.classList.add("oled");
        break;

      case "glass":
        body.classList.add("glass");
        break;

      case "neon":
        body.classList.add("neon");
        break;

      case "focus":
        body.classList.add("focus-mode");
        break;

      case "study":
        body.classList.add("study-mode");
        break;

      default:
        body.classList.add("dark-mode");
    }

    body.dataset.mode = mode;

    save(STORAGE.mode, mode);

    $$(".mode-option").forEach(option => {
      option.classList.toggle(
        "active",
        option.dataset.mode === mode
      );
    });
  }


  /* =======================================================
     3D EFFECT
  ======================================================= */

  function setThreeD(enabled = true) {
    const body = document.body;

    body.classList.toggle("threeD", enabled);

    save(STORAGE.threeD, enabled ? "on" : "off");

    const button = $("#threeDToggle");

    if (button) {
      button.textContent =
        enabled ? "🧊 3D ON" : "🧊 3D OFF";
    }
  }


  /* =======================================================
     ANIMATIONS
  ======================================================= */

  function setAnimations(enabled = true) {
    document.body.classList.toggle(
      "animations-off",
      !enabled
    );

    save(
      STORAGE.animations,
      enabled ? "on" : "off"
    );
  }


  /* =======================================================
     PARTICLES
  ======================================================= */

  function createParticles() {
    if ($("#mlParticles")) return;

    const container = document.createElement("div");

    container.id = "mlParticles";
    container.className = "ml-particles";

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("span");

      particle.className = "ml-particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.top =
        `${Math.random() * 100}%`;

      particle.style.animationDelay =
        `${Math.random() * 6}s`;

      particle.style.animationDuration =
        `${4 + Math.random() * 7}s`;

      const size =
        2 + Math.random() * 4;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;

      container.appendChild(particle);
    }

    document.body.appendChild(container);
  }


  function setParticles(enabled = true) {
    if (enabled) {
      createParticles();
    } else {
      $("#mlParticles")?.remove();
    }

    save(
      STORAGE.particles,
      enabled ? "on" : "off"
    );
  }


  /* =======================================================
     3D CARD EFFECT
  ======================================================= */

  function enable3DCards() {
    $$(".feature-card, .subject-card, .progress-card, .webcard")
      .forEach(card => {

        if (card.dataset.threeDReady) return;

        card.dataset.threeDReady = "true";

        card.addEventListener("mousemove", event => {

          if (!document.body.classList.contains("threeD")) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 10;

          const rotateX =
            ((y / rect.height) - 0.5) * -10;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });
  }


  /* =======================================================
     GLOBAL SEARCH
  ======================================================= */

  function setupSearch() {

    const search =
      $("#globalSearch");

    if (!search) return;

    search.addEventListener(
      "input",
      handleSearch
    );

    search.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          const query =
            search.value.trim();

          if (query) {
            performSearch(query);
          }
        }
      }
    );
  }


  function handleSearch(event) {

    const query =
      event.target.value
        .trim()
        .toLowerCase();

    if (!query) return;

    const cards =
      $$(".feature-card, .subject-card, .webcard");

    cards.forEach(card => {

      const text =
        card.textContent.toLowerCase();

      card.style.display =
        text.includes(query)
          ? ""
          : "none";
    });
  }


  function performSearch(query) {

    const normalized =
      query.toLowerCase();

    const routes = {
      book: "pages/books.html",
      books: "pages/books.html",

      video: "pages/videos.html",
      videos: "pages/videos.html",

      quiz: "pages/quiz.html",

      dpp: "pages/dpp.html",

      test: "pages/mock-test.html",
      mock: "pages/mock-test.html",

      ai: "pages/ai.html",

      youtube: "pages/youtube.html",

      website: "pages/websites.html",
      websites: "pages/websites.html",

      planner: "pages/planner.html",

      analytics: "pages/analytics.html",

      theme: "pages/themes.html",
      themes: "pages/themes.html"
    };

    for (const keyword in routes) {

      if (normalized.includes(keyword)) {
        window.location.href =
          routes[keyword];
        return;
      }
    }

    showNotification(
      `Search: ${query}`
    );
  }


  /* =======================================================
     MOBILE SIDEBAR
  ======================================================= */

  function setupMobileSidebar() {

    const toggle =
      $("#menuToggle");

    const sidebar =
      $(".sidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener(
      "click",
      () => {

        sidebar.classList.toggle(
          "open"
        );

        document.body.classList.toggle(
          "sidebar-open"
        );
      }
    );

    $$(".nav-link").forEach(link => {

      link.addEventListener(
        "click",
        () => {

          sidebar.classList.remove(
            "open"
          );

          document.body.classList.remove(
            "sidebar-open"
          );
        }
      );
    });
  }


  /* =======================================================
     NOTIFICATION
  ======================================================= */

  function showNotification(message) {

    let notification =
      $("#mlNotification");

    if (!notification) {

      notification =
        document.createElement("div");

      notification.id =
        "mlNotification";

      notification.className =
        "ml-notification";

      document.body.appendChild(
        notification
      );
    }

    notification.textContent =
      message;

    notification.classList.add(
      "show"
    );

    clearTimeout(
      notification._timer
    );

    notification._timer =
      setTimeout(() => {

        notification.classList.remove(
          "show"
        );

      }, 2200);
  }


  /* =======================================================
     THEME CARDS
  ======================================================= */

  function createThemeCards() {

    const containers =
      $$(".theme-grid, #themeGrid");

    containers.forEach(container => {

      if (
        container.dataset.generated === "true"
      ) return;

      container.dataset.generated = "true";

      Object.entries(themes)
        .forEach(([key, theme]) => {

          const card =
            document.createElement("button");

          card.type = "button";

          card.className =
            "theme-option";

          card.dataset.theme =
            key;

          card.innerHTML = `
            <span
              class="theme-preview"
              style="
                background:
                linear-gradient(
                  135deg,
                  ${theme.primary},
                  ${theme.secondary}
                );
              "
            ></span>

            <strong>${theme.name}</strong>
          `;

          card.addEventListener(
            "click",
            () => applyTheme(key)
          );

          container.appendChild(card);
        });
    });
  }


  /* =======================================================
     MODE CARDS
  ======================================================= */

  function createModeCards() {

    const container =
      $("#modeGrid");

    if (!container) return;

    if (
      container.dataset.generated === "true"
    ) return;

    container.dataset.generated = "true";

    const modes = [
      ["dark", "🌙", "Dark"],
      ["light", "☀️", "Light"],
      ["oled", "⬛", "OLED"],
      ["glass", "🧊", "Glass"],
      ["neon", "⚡", "Neon"],
      ["focus", "🎯", "Focus"],
      ["study", "📚", "Study"]
    ];

    modes.forEach(
      ([key, icon, name]) => {

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "mode-option";

        button.dataset.mode =
          key;

        button.innerHTML =
          `${icon} ${name}`;

        button.addEventListener(
          "click",
          () => applyMode(key)
        );

        container.appendChild(
          button
        );
      }
    );
  }


  /* =======================================================
     SETTINGS BUTTONS
  ======================================================= */

  function setupSettings() {

    const threeDButton =
      $("#threeDToggle");

    if (threeDButton) {

      threeDButton.addEventListener(
        "click",
        () => {

          const current =
            load(
              STORAGE.threeD,
              "on"
            );

          setThreeD(
            current !== "on"
          );
        }
      );
    }

    const particleButton =
      $("#particlesToggle");

    if (particleButton) {

      particleButton.addEventListener(
        "click",
        () => {

          const current =
            load(
              STORAGE.particles,
              "on"
            );

          setParticles(
            current !== "on"
          );
        }
      );
    }

    const animationButton =
      $("#animationsToggle");

    if (animationButton) {

      animationButton.addEventListener(
        "click",
        () => {

          const current =
            load(
              STORAGE.animations,
              "on"
            );

          setAnimations(
            current !== "on"
          );
        }
      );
    }
  }


  /* =======================================================
     KEYBOARD SHORTCUT
     Ctrl + K / Cmd + K
  ======================================================= */

  function setupKeyboardShortcut() {

    document.addEventListener(
      "keydown",
      event => {

        if (
          (event.ctrlKey ||
           event.metaKey) &&
          event.key.toLowerCase() === "k"
        ) {

          event.preventDefault();

          const search =
            $("#globalSearch");

          if (search) {
            search.focus();
            search.select();
          }
        }

        if (event.key === "Escape") {

          $(".search-overlay")
            ?.classList.remove("active");

          $(".sidebar")
            ?.classList.remove("open");

          document.body.classList.remove(
            "sidebar-open"
          );
        }
      }
    );
  }


  /* =======================================================
     SAVED SETTINGS
  ======================================================= */

  function loadSavedAppearance() {

    const theme =
      load(
        STORAGE.theme,
        "purple"
      );

    const mode =
      load(
        STORAGE.mode,
        "dark"
      );

    const threeD =
      load(
        STORAGE.threeD,
        "on"
      );

    const particles =
      load(
        STORAGE.particles,
        "on"
      );

    const animations =
      load(
        STORAGE.animations,
        "on"
      );

    applyTheme(theme);

    applyMode(mode);

    setThreeD(
      threeD === "on"
    );

    setParticles(
      particles === "on"
    );

    setAnimations(
      animations === "on"
    );
  }


  /* =======================================================
     AI VOICE INPUT
  ======================================================= */

  function setupVoiceInput() {

    const voiceButton =
      $("#voiceButton") ||
      $("#startVoice") ||
      $("[data-voice]");

    if (!voiceButton) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      voiceButton.addEventListener(
        "click",
        () => {

          showNotification(
            "इस browser में Voice Input उपलब्ध नहीं है।"
          );

        }
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "hi-IN";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.onresult =
      event => {

        const text =
          event.results[0][0].transcript;

        const input =
          $("#question") ||
          $("#aiQuestion") ||
          $("textarea");

        if (input) {
          input.value = text;
        }

        showNotification(
          "🎤 Voice Input तैयार है"
        );
      };

    recognition.onerror =
      () => {

        showNotification(
          "Voice Input में समस्या हुई।"
        );

      };

    voiceButton.addEventListener(
      "click",
      () => {

        try {
          recognition.start();
        } catch (error) {
          console.log(error);
        }

      }
    );
  }


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  function setupSmoothScroll() {

    $$('a[href^="#"]').forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") return;

          const target =
            $(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      );
    });
  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  function init() {

    createThemeCards();

    createModeCards();

    loadSavedAppearance();

    setupSearch();

    setupMobileSidebar();

    setupSettings();

    setupKeyboardShortcut();

    setupVoiceInput();

    setupSmoothScroll();

    enable3DCards();

    // Dynamic cards के लिए
    // थोड़ी देर बाद फिर initialize
    setTimeout(
      enable3DCards,
      500
    );

    console.log(
      "🚀 Mission Lakshya NEET 2027 — Step 3 Loaded"
    );
  }


  /* =======================================================
     START
  ======================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }


  /* =======================================================
     GLOBAL API
     दूसरे pages भी functions इस्तेमाल कर सकें
  ======================================================= */

  window.MissionLakshya = {

    themes,

    applyTheme,

    applyMode,

    setThreeD,

    setParticles,

    setAnimations,

    showNotification,

    createThemeCards,

    createModeCards,

    loadSavedAppearance

  };

})();
