/* =========================================
   MISSION LAKSHYA NEET 2027
   Main JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initTheme();
  initMobileMenu();
  initSearch();
  initNavigation();
  initAnimations();
  initButtons();
});


/* =========================================
   LANGUAGE
   ========================================= */

function initLanguage() {
  const savedLanguage = localStorage.getItem("ml-language") || "hi";
  applyLanguage(savedLanguage);
}

function toggleLanguage() {
  const current = localStorage.getItem("ml-language") || "hi";
  const next = current === "hi" ? "en" : "hi";

  localStorage.setItem("ml-language", next);
  applyLanguage(next);
}

function applyLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-hi][data-en]").forEach(element => {
    element.textContent =
      language === "hi"
        ? element.dataset.hi
        : element.dataset.en;
  });

  const searchInput = document.querySelector("#searchInput");

  if (searchInput) {
    searchInput.placeholder =
      language === "hi"
        ? "कुछ भी खोजें..."
        : "Search anything...";
  }

  const languageButton = document.querySelector("#languageBtn");

  if (languageButton) {
    languageButton.textContent =
      language === "hi" ? "EN" : "हिं";
  }
}


/* =========================================
   THEME
   ========================================= */

function initTheme() {
  const savedTheme = localStorage.getItem("ml-theme") || "dark";
  applyTheme(savedTheme);
}

function toggleTheme() {
  const current = localStorage.getItem("ml-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";

  localStorage.setItem("ml-theme", next);
  applyTheme(next);
}

function applyTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");

  const themeButton = document.querySelector("#themeBtn");

  if (themeButton) {
    themeButton.textContent =
      theme === "dark" ? "☀️" : "🌙";
  }
}


/* =========================================
   MOBILE SIDEBAR
   ========================================= */

function initMobileMenu() {
  const menuButton = document.querySelector("#menuBtn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector("#sidebarOverlay");

  if (!menuButton || !sidebar) return;

  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");

    if (overlay) {
      overlay.classList.toggle("show");
    }
  });

  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    });
  }
}


/* =========================================
   SEARCH
   ========================================= */

function initSearch() {
  const input = document.querySelector("#searchInput");

  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    const searchableItems =
      document.querySelectorAll(
        ".feature-card, .subject-card, .tool-card, .quick-card"
      );

    searchableItems.forEach(item => {
      const text = item.textContent.toLowerCase();

      if (!query || text.includes(query)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}


/* =========================================
   NAVIGATION
   ========================================= */

function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        closeMobileSidebar();
      }
    });
  });
}

function closeMobileSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector("#sidebarOverlay");

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }
}


/* =========================================
   ANIMATIONS
   ========================================= */

function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".card, .feature-card, .subject-card, .tool-card, .stat-card"
  );

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach(element => {
      element.classList.add("visible");
    });

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
      threshold: 0.12
    }
  );

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}


/* =========================================
   BUTTONS
   ========================================= */

function initButtons() {
  const languageButton = document.querySelector("#languageBtn");

  if (languageButton) {
    languageButton.addEventListener("click", toggleLanguage);
  }

  const themeButton = document.querySelector("#themeBtn");

  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }

  document.querySelectorAll("[data-coming-soon]").forEach(button => {
    button.addEventListener("click", () => {
      const language =
        localStorage.getItem("ml-language") || "hi";

      alert(
        language === "hi"
          ? "यह feature जल्द ही उपलब्ध होगा।"
          : "This feature will be available soon."
      );
    });
  });
}


/* =========================================
   NOTIFICATION
   ========================================= */

function showNotification(message) {
  const notification = document.createElement("div");

  notification.className = "ml-notification";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 50);

  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}


/* =========================================
   LOCAL STORAGE HELPERS
   ========================================= */

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);

    return data
      ? JSON.parse(data)
      : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}


/* =========================================
   USER PROGRESS
   ========================================= */

function saveProgress(progress) {
  saveData("ml-progress", progress);
}

function getProgress() {
  return getData("ml-progress", {
    physics: 0,
    chemistry: 0,
    biology: 0,
    overall: 0
  });
}


/* =========================================
   BOOKMARKS
   ========================================= */

function getBookmarks() {
  return getData("ml-bookmarks", []);
}

function addBookmark(item) {
  const bookmarks = getBookmarks();

  if (!bookmarks.some(bookmark => bookmark.id === item.id)) {
    bookmarks.push(item);
    saveData("ml-bookmarks", bookmarks);
  }
}

function removeBookmark(id) {
  const bookmarks = getBookmarks()
    .filter(bookmark => bookmark.id !== id);

  saveData("ml-bookmarks", bookmarks);
}

function isBookmarked(id) {
  return getBookmarks()
    .some(bookmark => bookmark.id === id);
}


/* =========================================
   PERFORMANCE
   ========================================= */

window.addEventListener("beforeunload", () => {
  localStorage.setItem(
    "ml-last-visit",
    new Date().toISOString()
  );
});


/* =========================================
   GLOBAL FUNCTIONS
   ========================================= */

window.toggleLanguage = toggleLanguage;
window.toggleTheme = toggleTheme;
window.showNotification = showNotification;
window.saveData = saveData;
window.getData = getData;
window.saveProgress = saveProgress;
window.getProgress = getProgress;
window.getBookmarks = getBookmarks;
window.addBookmark = addBookmark;
window.removeBookmark = removeBookmark;
window.isBookmarked = isBookmarked;
