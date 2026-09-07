/* =========================================================
   Mission Lakshya NEET 2027
   Main JavaScript
   ========================================================= */

(function () {
  "use strict";

  /* -----------------------------
     Global State
  ----------------------------- */

  let currentLanguage =
    localStorage.getItem("ml-language") || "hi";

  let currentTheme =
    localStorage.getItem("ml-theme") || "dark";

  /* -----------------------------
     DOM Ready
  ----------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage();
    applyTheme();
    setupNavigation();
    setupSearch();
    setupAnimations();
    setupKeyboardShortcuts();
  });

  /* =========================================================
     LANGUAGE
  ========================================================= */

  function applyLanguage() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dataset.language = currentLanguage;

    const elements = document.querySelectorAll(
      "[data-hi][data-en]"
    );

    elements.forEach(function (element) {
      const text =
        currentLanguage === "en"
          ? element.dataset.en
          : element.dataset.hi;

      if (text !== undefined) {
        element.textContent = text;
      }
    });

    const languageButton =
      document.getElementById("languageButton");

    if (languageButton) {
      languageButton.textContent =
        currentLanguage === "hi" ? "EN" : "हिं";
    }

    const search =
      document.getElementById("globalSearch");

    if (search) {
      search.placeholder =
        currentLanguage === "hi"
          ? "Search करें..."
          : "Search...";
    }

    updateLanguageAttributes();
  }

  function updateLanguageAttributes() {
    const search =
      document.getElementById("globalSearch");

    if (search) {
      search.setAttribute(
        "aria-label",
        currentLanguage === "hi"
          ? "वेबसाइट खोजें"
          : "Search website"
      );
    }
  }

  function toggleLanguage() {
    currentLanguage =
      currentLanguage === "hi" ? "en" : "hi";

    localStorage.setItem(
      "ml-language",
      currentLanguage
    );

    applyLanguage();

    showNotification(
      currentLanguage === "hi"
        ? "भाषा हिन्दी कर दी गई है"
        : "Language changed to English"
    );
  }

  /* =========================================================
     THEME
  ========================================================= */

  function applyTheme() {
    document.body.classList.toggle(
      "light",
      currentTheme === "light"
    );

    const themeButton =
      document.getElementById("themeButton");

    if (themeButton) {
      themeButton.textContent =
        currentTheme === "light" ? "🌙" : "☀️";
    }
  }

  function toggleTheme() {
    currentTheme =
      currentTheme === "light"
        ? "dark"
        : "light";

    localStorage.setItem(
      "ml-theme",
      currentTheme
    );

    applyTheme();

    showNotification(
      currentTheme === "light"
        ? "Light Mode चालू"
        : "Dark Mode चालू"
    );
  }

  /* =========================================================
     SIDEBAR
  ========================================================= */

  function toggleSidebar() {
    const sidebar =
      document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");

    document.body.classList.toggle(
      "sidebar-open",
      sidebar.classList.contains("open")
    );
  }

  function closeSidebar() {
    const sidebar =
      document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.remove("open");

    document.body.classList.remove(
      "sidebar-open"
    );
  }

  /* =========================================================
     SCROLL
  ========================================================= */

  function scrollToSection(id) {
    const element =
      document.getElementById(id);

    if (!element) {
      showNotification(
        currentLanguage === "hi"
          ? "यह section अभी उपलब्ध नहीं है"
          : "This section is not available yet"
      );
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    closeSidebar();
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function setupNavigation() {
    const links =
      document.querySelectorAll(
        ".nav-item, .sidebar a, nav a"
      );

    links.forEach(function (link) {
      link.addEventListener(
        "click",
        function () {
          closeSidebar();

          links.forEach(function (item) {
            item.classList.remove("active");
          });

          link.classList.add("active");
        }
      );
    });

    document.addEventListener(
      "click",
      function (event) {
        const sidebar =
          document.getElementById("sidebar");

        if (!sidebar) return;

        const clickedInside =
          sidebar.contains(event.target);

        const menuButton =
          event.target.closest(
            '[onclick="toggleSidebar()"]'
          );

        if (
          window.innerWidth <= 800 &&
          !clickedInside &&
          !menuButton &&
          sidebar.classList.contains("open")
        ) {
          closeSidebar();
        }
      }
    );

    window.addEventListener(
      "scroll",
      updateActiveNavigation,
      { passive: true }
    );
  }

  function updateActiveNavigation() {
    const sections =
      document.querySelectorAll(
        "main section[id]"
      );

    if (!sections.length) return;

    let currentSection = "";

    sections.forEach(function (section) {
      const rect =
        section.getBoundingClientRect();

      if (rect.top <= 180) {
        currentSection = section.id;
      }
    });

    if (!currentSection) return;

    const links =
      document.querySelectorAll(
        '.sidebar a[href^="#"]'
      );

    links.forEach(function (link) {
      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === "#" + currentSection
      );
    });
  }

  /* =========================================================
     SEARCH
  ========================================================= */

  function setupSearch() {
    const search =
      document.getElementById("globalSearch");

    if (!search) return;

    search.addEventListener(
      "keydown",
      function (event) {
        if (event.key === "Enter") {
          searchWebsite();
        }

        if (event.key === "Escape") {
          search.value = "";
          clearSearchResults();
          search.blur();
        }
      }
    );
  }

  function searchWebsite() {
    const input =
      document.getElementById("globalSearch");

    if (!input) return;

    const query =
      input.value.trim().toLowerCase();

    clearSearchResults();

    if (!query) return;

    const searchableElements =
      document.querySelectorAll(
        ".feature-card, .subject-card, .tool-card, .website-card, .book-card, .video-card, .stat-card"
      );

    let firstMatch = null;
    let matches = 0;

    searchableElements.forEach(function (element) {
      const text =
        element.textContent.toLowerCase();

      if (text.includes(query)) {
        element.style.outline =
          "2px solid var(--primary, #7c3aed)";

        element.style.outlineOffset = "5px";

        matches++;

        if (!firstMatch) {
          firstMatch = element;
        }
      }
    });

    if (firstMatch) {
      firstMatch.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      showNotification(
        currentLanguage === "hi"
          ? matches + " result मिला"
          : matches + " result found"
      );
    } else if (query.length >= 2) {
      showNotification(
        currentLanguage === "hi"
          ? "कोई result नहीं मिला"
          : "No result found"
      );
    }
  }

  function clearSearchResults() {
    const elements =
      document.querySelectorAll(
        ".feature-card, .subject-card, .tool-card, .website-card, .book-card, .video-card, .stat-card"
      );

    elements.forEach(function (element) {
      element.style.outline = "";
      element.style.outlineOffset = "";
    });
  }

  /* =========================================================
     NOTIFICATION / TOAST
  ========================================================= */

  function showNotification(message) {
    let toast =
      document.querySelector(".ml-notification");

    if (!toast) {
      toast =
        document.createElement("div");

      toast.className =
        "ml-notification";

      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.bottom = "25px";
      toast.style.transform =
        "translateX(-50%) translateY(20px)";
      toast.style.padding =
        "12px 20px";
      toast.style.borderRadius =
        "14px";
      toast.style.background =
        "rgba(20, 15, 35, 0.95)";
      toast.style.color = "#fff";
      toast.style.border =
        "1px solid rgba(139,92,246,.45)";
      toast.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.35)";
      toast.style.zIndex = "99999";
      toast.style.fontSize = "14px";
      toast.style.fontWeight = "600";
      toast.style.opacity = "0";
      toast.style.transition =
        "all .3s ease";
      toast.style.pointerEvents = "none";

      document.body.appendChild(toast);
    }

    toast.textContent = message;

    clearTimeout(
      window.mlNotificationTimer
    );

    requestAnimationFrame(function () {
      toast.style.opacity = "1";
      toast.style.transform =
        "translateX(-50%) translateY(0)";
    });

    window.mlNotificationTimer =
      setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.transform =
          "translateX(-50%) translateY(20px)";
      }, 2500);
  }

  /* =========================================================
     COMING SOON
  ========================================================= */

  function showComingSoon(feature) {
    showNotification(
      currentLanguage === "hi"
        ? feature + " जल्द उपलब्ध होगा"
        : feature + " will be available soon"
    );
  }

  /* =========================================================
     ANIMATIONS
  ========================================================= */

  function setupAnimations() {
    const animatedElements =
      document.querySelectorAll(
        ".feature-card, .subject-card, .tool-card, .stat-card, .book-card, .video-card"
      );

    if (!animatedElements.length) return;

    if (
      !("IntersectionObserver" in window)
    ) {
      animatedElements.forEach(function (element) {
        element.classList.add("visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12
        }
      );

    animatedElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* =========================================================
     KEYBOARD SHORTCUTS
  ========================================================= */

  function setupKeyboardShortcuts() {
    document.addEventListener(
      "keydown",
      function (event) {
        /* Ctrl + K / Android keyboard compatible */
        if (
          (event.ctrlKey || event.metaKey) &&
          event.key.toLowerCase() === "k"
        ) {
          event.preventDefault();

          const search =
            document.getElementById(
              "globalSearch"
            );

          if (search) {
            search.focus();
          }
        }

        /* Escape */
        if (event.key === "Escape") {
          closeSidebar();
        }
      }
    );
  }

  /* =========================================================
     LOCAL STORAGE HELPERS
  ========================================================= */

  function saveData(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error(
        "LocalStorage save error:",
        error
      );

      return false;
    }
  }

  function getData(key, fallback) {
    try {
      const data =
        localStorage.getItem(key);

      return data
        ? JSON.parse(data)
        : fallback;
    } catch (error) {
      console.error(
        "LocalStorage read error:",
        error
      );

      return fallback;
    }
  }

  /* =========================================================
     BOOKMARKS
  ========================================================= */

  function getBookmarks() {
    return getData(
      "missionLakshyaBookmarks",
      []
    );
  }

  function addBookmark(item) {
    const bookmarks =
      getBookmarks();

    const exists =
      bookmarks.some(function (bookmark) {
        return bookmark.id === item.id;
      });

    if (!exists) {
      bookmarks.push(item);

      saveData(
        "missionLakshyaBookmarks",
        bookmarks
      );

      showNotification(
        currentLanguage === "hi"
          ? "Bookmark save हो गया"
          : "Bookmark saved"
      );
    }
  }

  function removeBookmark(id) {
    const bookmarks =
      getBookmarks().filter(
        function (bookmark) {
          return bookmark.id !== id;
        }
      );

    saveData(
      "missionLakshyaBookmarks",
      bookmarks
    );

    showNotification(
      currentLanguage === "hi"
        ? "Bookmark हटाया गया"
        : "Bookmark removed"
    );
  }

  /* =========================================================
     PROGRESS
  ========================================================= */

  function getProgress() {
    return getData(
      "missionLakshyaProgress",
      {
        physics: 0,
        chemistry: 0,
        biology: 0,
        overall: 0
      }
    );
  }

  function saveProgress(progress) {
    saveData(
      "missionLakshyaProgress",
      progress
    );
  }

  /* =========================================================
     WINDOW EXPORTS
     Required by inline onclick="" in index.html
  ========================================================= */

  window.toggleLanguage =
    toggleLanguage;

  window.toggleTheme =
    toggleTheme;

  window.toggleSidebar =
    toggleSidebar;

  window.scrollToSection =
    scrollToSection;

  window.searchWebsite =
    searchWebsite;

  window.showNotification =
    showNotification;

  window.showComingSoon =
    showComingSoon;

  window.getBookmarks =
    getBookmarks;

  window.addBookmark =
    addBookmark;

  window.removeBookmark =
    removeBookmark;

  window.getProgress =
    getProgress;

  window.saveProgress =
    saveProgress;

})();
