/* =========================================================
   STUDY WALLAH
   Main Frontend JavaScript
   NEET + JEE Preparation Platform
   Vercel Compatible
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEYS = {
  profile: "studywallah_profile",
  theme: "studywallah_theme",
  language: "studywallah_language",
  bookmarks: "studywallah_bookmarks",
  progress: "studywallah_progress",
  activity: "studywallah_activity",
  planner: "studywallah_planner",
  quizHistory: "studywallah_quiz_history",
  notifications: "studywallah_notifications",
  settings: "studywallah_settings"
};

const defaultProfile = {
  name: "Student",
  email: "",
  photo: "",
  course: "NEET",
  joined: new Date().toISOString()
};

const defaultProgress = {
  overall: 0,
  neet: 0,
  jee: 0,
  physics: 0,
  chemistry: 0,
  biology: 0,
  mathematics: 0,
  lessonsCompleted: 0,
  questionsAttempted: 0,
  correctAnswers: 0,
  studyMinutes: 0,
  streak: 0,
  lastStudyDate: ""
};

const defaultPlanner = {
  tasks: [
    {
      id: "task-1",
      title: "Physics revision",
      subject: "Physics",
      time: "30 min",
      completed: false
    },
    {
      id: "task-2",
      title: "Chemistry DPP",
      subject: "Chemistry",
      time: "30 min",
      completed: false
    },
    {
      id: "task-3",
      title: "Biology NCERT reading",
      subject: "Biology",
      time: "45 min",
      completed: false
    }
  ]
};

const defaultSettings = {
  notifications: true,
  sound: true,
  language: "English",
  theme: "purple"
};

/* =========================================================
   QUIZ DATA
   ========================================================= */

const defaultQuizQuestions = [
  {
    id: "bio-1",
    subject: "Biology",
    question: "The basic structural and functional unit of life is:",
    options: [
      "Cell",
      "Tissue",
      "Organ",
      "Organ system"
    ],
    answer: 0,
    explanation:
      "The cell is the basic structural and functional unit of living organisms."
  },
  {
    id: "phy-1",
    subject: "Physics",
    question:
      "What is the SI unit of force?",
    options: [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    answer: 1,
    explanation:
      "The SI unit of force is newton (N)."
  },
  {
    id: "chem-1",
    subject: "Chemistry",
    question:
      "The atomic number of an element represents the number of:",
    options: [
      "Neutrons",
      "Electrons only",
      "Protons",
      "Nucleons"
    ],
    answer: 2,
    explanation:
      "Atomic number is equal to the number of protons in the nucleus."
  },
  {
    id: "math-1",
    subject: "Mathematics",
    question:
      "What is the derivative of x² with respect to x?",
    options: [
      "x",
      "2x",
      "x²",
      "2"
    ],
    answer: 1,
    explanation:
      "Using the power rule, d(x²)/dx = 2x."
  },
  {
    id: "bio-2",
    subject: "Biology",
    question:
      "Which organelle is commonly known as the powerhouse of the cell?",
    options: [
      "Ribosome",
      "Nucleus",
      "Mitochondria",
      "Golgi apparatus"
    ],
    answer: 2,
    explanation:
      "Mitochondria are the major site of aerobic cellular respiration and ATP production."
  }
];

/* =========================================================
   SAMPLE QUESTION BANK
   ========================================================= */

const questionBank = [
  {
    id: "qb-1",
    course: "NEET",
    subject: "Biology",
    chapter: "Cell",
    difficulty: "Easy",
    question: "Which organelle contains genetic material in a typical eukaryotic cell?",
    options: [
      "Nucleus",
      "Lysosome",
      "Vacuole",
      "Cell wall"
    ],
    answer: 0,
    explanation:
      "In typical eukaryotic cells, the nucleus contains most of the cell's genetic material."
  },
  {
    id: "qb-2",
    course: "NEET",
    subject: "Physics",
    chapter: "Motion",
    difficulty: "Medium",
    question: "The slope of a velocity-time graph represents:",
    options: [
      "Distance",
      "Acceleration",
      "Displacement",
      "Momentum"
    ],
    answer: 1,
    explanation:
      "The slope of a velocity-time graph gives acceleration."
  },
  {
    id: "qb-3",
    course: "NEET",
    subject: "Chemistry",
    chapter: "Mole Concept",
    difficulty: "Easy",
    question: "One mole of a substance contains approximately:",
    options: [
      "6.022 × 10²³ particles",
      "3.011 × 10²³ particles",
      "9.81 × 10² particles",
      "1.602 × 10¹⁹ particles"
    ],
    answer: 0,
    explanation:
      "One mole contains Avogadro's number, approximately 6.022 × 10²³ particles."
  },
  {
    id: "qb-4",
    course: "JEE",
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "Medium",
    question: "The derivative of sin x is:",
    options: [
      "cos x",
      "-cos x",
      "sin x",
      "-sin x"
    ],
    answer: 0,
    explanation:
      "The derivative of sin x with respect to x is cos x."
  }
];

/* =========================================================
   APP STATE
   ========================================================= */

let profile = loadStorage(
  STORAGE_KEYS.profile,
  defaultProfile
);

let currentTheme = loadStorage(
  STORAGE_KEYS.theme,
  defaultSettings.theme
);

let currentLanguage = loadStorage(
  STORAGE_KEYS.language,
  defaultSettings.language
);

let bookmarks = loadStorage(
  STORAGE_KEYS.bookmarks,
  []
);

let progress = loadStorage(
  STORAGE_KEYS.progress,
  defaultProgress
);

let activity = loadStorage(
  STORAGE_KEYS.activity,
  []
);

let planner = loadStorage(
  STORAGE_KEYS.planner,
  defaultPlanner
);

let quizHistory = loadStorage(
  STORAGE_KEYS.quizHistory,
  []
);

let notifications = loadStorage(
  STORAGE_KEYS.notifications,
  []
);

let settings = loadStorage(
  STORAGE_KEYS.settings,
  defaultSettings
);

let quizState = {
  questions: [],
  current: 0,
  score: 0,
  selected: null,
  timer: null,
  seconds: 0,
  started: false
};

let testState = {
  timer: null,
  seconds: 0,
  currentQuestion: 0,
  answers: {},
  questions: []
};

/* =========================================================
   HELPERS
   ========================================================= */

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function loadStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.warn("Storage read error:", key, error);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Storage save error:", key, error);
  }
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function toast(message, type = "info") {
  let element = $("#toast");

  if (!element) {
    element = document.createElement("div");
    element.id = "toast";
    element.className = "toast";
    document.body.appendChild(element);
  }

  element.textContent = message;
  element.dataset.type = type;
  element.classList.add("show");

  clearTimeout(element._timeout);

  element._timeout = setTimeout(() => {
    element.classList.remove("show");
  }, 2500);
}

function addActivity(title, type = "Study") {
  activity.unshift({
    id: Date.now(),
    title,
    type,
    time: new Date().toISOString()
  });

  activity = activity.slice(0, 20);

  saveStorage(STORAGE_KEYS.activity, activity);
  renderActivity();
}

function updateProgress() {
  const subjects = [
    progress.physics,
    progress.chemistry,
    progress.biology,
    progress.mathematics
  ];

  const total = subjects.reduce((a, b) => a + Number(b || 0), 0);

  progress.overall = Math.round(
    total / subjects.length
  );

  saveStorage(
    STORAGE_KEYS.progress,
    progress
  );

  renderProgress();
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);

function initializeApp() {
  hideLoader();
  applyTheme();
  applyLanguage();
  setupNavigation();
  setupMobileMenu();
  setupGlobalSearch();
  setupFilters();
  setupProfile();
  setupSettings();
  setupThemeButtons();
  setupLanguageButtons();
  setupBookmarks();
  setupQuiz();
  setupTests();
  setupPlanner();
  setupAI();
  setupYouTube();
  setupGenericActions();

  renderProfile();
  renderProgress();
  renderActivity();
  renderPlanner();
  renderBookmarks();
  renderAnalytics();
  renderNotifications();
  renderQuestionBank();
  renderCurrentDate();
  updateOnlineStatus();

  window.StudyWallah = {
    profile,
    progress,
    bookmarks,
    openPage,
    toast
  };
}

/* =========================================================
   LOADER
   ========================================================= */

function hideLoader() {
  const loader = $("#loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 500);
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {
  $$("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;

      if (!page) return;

      openPage(page);
    });
  });

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const page =
        button.dataset.page ||
        button.getAttribute("data-page");

      if (page) {
        openPage(page);
      }
    });
  });
}

function openPage(pageName) {
  const sections = $$(
    ".page-section, [data-section]"
  );

  let found = false;

  sections.forEach((section) => {
    const sectionName =
      section.dataset.section ||
      section.id ||
      "";

    const matches =
      sectionName.toLowerCase() ===
      String(pageName).toLowerCase();

    section.classList.toggle(
      "active",
      matches
    );

    if (matches) {
      found = true;
    }
  });

  const buttons = $$(
    "[data-page], .nav-item"
  );

  buttons.forEach((button) => {
    const value =
      button.dataset.page ||
      button.getAttribute("data-page");

    button.classList.toggle(
      "active",
      value === pageName
    );
  });

  if (!found) {
    const target = $(`#${pageName}`);

    if (target) {
      target.classList.add("active");
    }
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMobileMenu();

  if (pageName === "analytics") {
    renderAnalytics();
  }

  if (pageName === "planner") {
    renderPlanner();
  }

  if (pageName === "bookmarks") {
    renderBookmarks();
  }

  addActivity(
    `Opened ${formatPageName(pageName)}`,
    "Navigation"
  );
}

function formatPageName(name) {
  return String(name || "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {
  const menuButton =
    $("#mobileMenuBtn") ||
    $(".mobile-menu-btn") ||
    $('[data-action="mobile-menu"]');

  if (menuButton) {
    menuButton.addEventListener(
      "click",
      toggleMobileMenu
    );
  }

  $$(".sidebar-overlay").forEach((overlay) => {
    overlay.addEventListener(
      "click",
      closeMobileMenu
    );
  });
}

function toggleMobileMenu() {
  document.body.classList.toggle(
    "sidebar-open"
  );

  const sidebar =
    $(".sidebar");

  if (sidebar) {
    sidebar.classList.toggle(
      "open"
    );
  }
}

function closeMobileMenu() {
  document.body.classList.remove(
    "sidebar-open"
  );

  const sidebar =
    $(".sidebar");

  if (sidebar) {
    sidebar.classList.remove(
      "open"
    );
  }
}

/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function setupGlobalSearch() {
  const search =
    $("#globalSearch") ||
    $("#searchInput") ||
    $('[data-global-search]');

  if (!search) return;

  search.addEventListener(
    "input",
    () => {
      showSearchSuggestions(
        search.value.trim()
      );
    }
  );

  search.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        performGlobalSearch(
          search.value.trim()
        );
      }
    }
  );
}

function performGlobalSearch(query) {
  if (!query) {
    toast("Search something first.");
    return;
  }

  const q = query.toLowerCase();

  const results = [];

  questionBank.forEach((item) => {
    if (
      item.question.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q) ||
      item.chapter.toLowerCase().includes(q)
    ) {
      results.push({
        title: item.question,
        type: "Question Bank"
      });
    }
  });

  const pages = [
    "courses",
    "dpp",
    "question-bank",
    "quiz",
    "tests",
    "notes",
    "youtube",
    "planner",
    "bookmarks",
    "analytics",
    "ai",
    "resources"
  ];

  pages.forEach((page) => {
    if (
      page
        .replaceAll("-", " ")
        .includes(q)
    ) {
      results.push({
        title: formatPageName(page),
        type: "Section"
      });
    }
  });

  renderSearchResults(
    results,
    query
  );

  addActivity(
    `Searched for "${query}"`,
    "Search"
  );
}

function showSearchSuggestions(query) {
  const box =
    $("#searchSuggestions") ||
    $(".search-suggestions");

  if (!box) return;

  if (!query) {
    box.innerHTML = "";
    box.classList.remove("show");
    return;
  }

  const q = query.toLowerCase();

  const suggestions = [
    "NEET Physics",
    "NEET Chemistry",
    "NEET Biology",
    "JEE Physics",
    "JEE Chemistry",
    "JEE Mathematics",
    "DPP",
    "Question Bank",
    "Quiz",
    "Tests",
    "Notes",
    "YouTube Learning",
    "Khushi AI Tutor"
  ].filter((item) =>
    item.toLowerCase().includes(q)
  );

  box.innerHTML = suggestions
    .slice(0, 6)
    .map(
      (item) =>
        `<button type="button" class="search-suggestion">${escapeHTML(
          item
        )}</button>`
    )
    .join("");

  box.classList.add("show");

  $$(".search-suggestion", box).forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          performGlobalSearch(
            button.textContent
          );
          box.classList.remove(
            "show"
          );
        }
      );
    }
  );
}

function renderSearchResults(results, query) {
  const container =
    $("#searchResults") ||
    $(".search-results");

  if (!container) return;

  if (!results.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No results found</h3>
        <p>Try another search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="search-result-title">
      Search results for "${escapeHTML(
        query
      )}"
    </div>

    ${results
      .map(
        (result) => `
        <div class="search-result-card">
          <strong>${escapeHTML(
            result.title
          )}</strong>
          <span>${escapeHTML(
            result.type
          )}</span>
        </div>
      `
      )
      .join("")}
  `;
}

/* =========================================================
   FILTERS
   ========================================================= */

function setupFilters() {
  $$("select[data-filter]").forEach(
    (select) => {
      select.addEventListener(
        "change",
        () => {
          applyFilter(
            select.dataset.filter,
            select.value
          );
        }
      );
    }
  );

  $$("[data-filter-button]").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          applyFilter(
            button.dataset.filterButton,
            button.dataset.value
          );
        }
      );
    }
  );
}

function applyFilter(type, value) {
  if (
    type === "question-bank" ||
    type === "questionBank"
  ) {
    renderQuestionBank(value);
  }

  if (type === "course") {
    filterCards(
      ".course-card",
      value
    );
  }

  if (type === "subject") {
    filterCards(
      "[data-subject]",
      value
    );
  }

  if (type === "difficulty") {
    filterCards(
      "[data-difficulty]",
      value
    );
  }
}

function filterCards(
  selector,
  value
) {
  $$(selector).forEach((card) => {
    if (
      !value ||
      value === "all"
    ) {
      card.style.display = "";
      return;
    }

    const subject =
      card.dataset.subject ||
      "";

    const difficulty =
      card.dataset.difficulty ||
      "";

    const course =
      card.dataset.course ||
      "";

    const match =
      subject === value ||
      difficulty === value ||
      course === value;

    card.style.display = match
      ? ""
      : "none";
  });
}

/* =========================================================
   PROFILE
   ========================================================= */

function setupProfile() {
  const form =
    $("#profileForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const nameInput =
        form.querySelector(
          '[name="name"]'
        );

      const emailInput =
        form.querySelector(
          '[name="email"]'
        );

      if (nameInput) {
        profile.name =
          nameInput.value.trim() ||
          "Student";
      }

      if (emailInput) {
        profile.email =
          emailInput.value.trim();
      }

      saveStorage(
        STORAGE_KEYS.profile,
        profile
      );

      renderProfile();

      toast(
        "Profile saved successfully.",
        "success"
      );
    }
  );
}

function renderProfile() {
  $$(
    '[data-profile-name], .profile-name'
  ).forEach((element) => {
    element.textContent =
      profile.name || "Student";
  });

  $$(
    '[data-profile-email], .profile-email'
  ).forEach((element) => {
    element.textContent =
      profile.email || "";
  });

  const nameInput =
    $('[name="name"]');

  if (nameInput) {
    nameInput.value =
      profile.name || "";
  }

  const emailInput =
    $('[name="email"]');

  if (emailInput) {
    emailInput.value =
      profile.email || "";
  }
}

/* =========================================================
   SETTINGS
   ========================================================= */

function setupSettings() {
  const resetButton =
    $('[data-action="reset-data"]') ||
    $("#resetData");

  if (resetButton) {
    resetButton.addEventListener(
      "click",
      resetAllData
    );
  }

  const notificationToggle =
    $("#notificationToggle");

  if (notificationToggle) {
    notificationToggle.checked =
      Boolean(
        settings.notifications
      );

    notificationToggle.addEventListener(
      "change",
      () => {
        settings.notifications =
          notificationToggle.checked;

        saveStorage(
          STORAGE_KEYS.settings,
          settings
        );
      }
    );
  }
}

function resetAllData() {
  const confirmed =
    window.confirm(
      "Reset Study Wallah saved progress, bookmarks and settings?"
    );

  if (!confirmed) return;

  Object.values(
    STORAGE_KEYS
  ).forEach((key) => {
    localStorage.removeItem(key);
  });

  toast(
    "Data reset. Reloading..."
  );

  setTimeout(() => {
    location.reload();
  }, 800);
}

/* =========================================================
   THEMES
   ========================================================= */

function setupThemeButtons() {
  $$("[data-theme]").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          currentTheme =
            button.dataset.theme;

          saveStorage(
            STORAGE_KEYS.theme,
            currentTheme
          );

          applyTheme();

          toast(
            `Theme changed to ${currentTheme}.`,
            "success"
          );
        }
      );
    }
  );
}

function applyTheme() {
  document.documentElement.dataset.theme =
    currentTheme;

  document.body.dataset.theme =
    currentTheme;
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function setupLanguageButtons() {
  $$("[data-language]").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          currentLanguage =
            button.dataset.language;

          saveStorage(
            STORAGE_KEYS.language,
            currentLanguage
          );

          settings.language =
            currentLanguage;

          saveStorage(
            STORAGE_KEYS.settings,
            settings
          );

          applyLanguage();

          toast(
            `Language: ${currentLanguage}`,
            "success"
          );
        }
      );
    }
  );
}

function applyLanguage() {
  document.documentElement.lang =
    currentLanguage === "Hindi"
      ? "hi"
      : "en";
}

/* =========================================================
   PROGRESS
   ========================================================= */

function renderProgress() {
  const values = {
    overall: progress.overall,
    neet: progress.neet,
    jee: progress.jee,
    physics: progress.physics,
    chemistry: progress.chemistry,
    biology: progress.biology,
    mathematics: progress.mathematics,
    lessons: progress.lessonsCompleted,
    attempted:
      progress.questionsAttempted,
    correct:
      progress.correctAnswers,
    streak: progress.streak
  };

  Object.entries(values).forEach(
    ([key, value]) => {
      $$(
        `[data-progress="${key}"]`
      ).forEach((element) => {
        element.textContent =
          `${value}%`;
      });

      $$(
        `[data-stat="${key}"]`
      ).forEach((element) => {
        element.textContent =
          value;
      });
    }
  );

  $$(
    "[data-progress-bar]"
  ).forEach((bar) => {
    const key =
      bar.dataset.progressBar;

    const value =
      Number(
        progress[key] || 0
      );

    bar.style.width =
      `${clamp(
        value,
        0,
        100
      )}%`;
  });
}

/* =========================================================
   ACTIVITY
   ========================================================= */

function renderActivity() {
  const container =
    $("#recentActivity") ||
    $(".recent-activity");

  if (!container) return;

  if (!activity.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Your recent study activity will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML =
    activity
      .slice(0, 8)
      .map((item) => {
        const date =
          new Date(item.time);

        return `
          <div class="activity-item">
            <div>
              <strong>${escapeHTML(
                item.title
              )}</strong>
              <small>${escapeHTML(
                item.type
              )}</small>
            </div>

            <time>${date.toLocaleString(
              currentLanguage === "Hindi"
                ? "hi-IN"
                : "en-IN",
              {
                dateStyle: "short",
                timeStyle: "short"
              }
            )}</time>
          </div>
        `;
      })
      .join("");
}

/* =========================================================
   BOOKMARKS
   ========================================================= */

function setupBookmarks() {
  document.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-bookmark]"
        );

      if (!button) return;

      event.preventDefault();

      const item = {
        id:
          button.dataset.bookmarkId ||
          button.dataset.id ||
          `bookmark-${Date.now()}`,
        title:
          button.dataset.bookmarkTitle ||
          button.dataset.title ||
          "Saved item",
        type:
          button.dataset.bookmarkType ||
          "Resource"
      };

      toggleBookmark(item);
    }
  );
}

function toggleBookmark(item) {
  const index =
    bookmarks.findIndex(
      (bookmark) =>
        bookmark.id === item.id
    );

  if (index >= 0) {
    bookmarks.splice(index, 1);

    toast(
      "Removed from bookmarks."
    );
  } else {
    bookmarks.unshift(item);

    toast(
      "Added to bookmarks.",
      "success"
    );
  }

  saveStorage(
    STORAGE_KEYS.bookmarks,
    bookmarks
  );

  renderBookmarks();
}

function isBookmarked(id) {
  return bookmarks.some(
    (item) => item.id === id
  );
}

function renderBookmarks() {
  const container =
    $("#bookmarksList") ||
    $(".bookmarks-list");

  if (!container) return;

  if (!bookmarks.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No bookmarks yet</h3>
        <p>Save questions, lessons, notes or resources here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML =
    bookmarks
      .map(
        (item) => `
          <div class="bookmark-item">
            <div>
              <strong>${escapeHTML(
                item.title
              )}</strong>
              <small>${escapeHTML(
                item.type
              )}</small>
            </div>

            <button
              type="button"
              class="btn btn-small"
              data-remove-bookmark="${escapeHTML(
                item.id
              )}"
            >
              Remove
            </button>
          </div>
        `
      )
      .join("");

  $$(
    "[data-remove-bookmark]",
    container
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        bookmarks =
          bookmarks.filter(
            (item) =>
              item.id !==
              button.dataset
                .removeBookmark
          );

        saveStorage(
          STORAGE_KEYS.bookmarks,
          bookmarks
        );

        renderBookmarks();
      }
    );
  });
}

/* =========================================================
   QUESTION BANK
   ========================================================= */

function renderQuestionBank(filter = "all") {
  const container =
    $("#questionBankList") ||
    $(".question-bank-list");

  if (!container) return;

  let data = questionBank;

  if (
    filter &&
    filter !== "all"
  ) {
    data =
      data.filter(
        (item) =>
          item.subject === filter ||
          item.course === filter ||
          item.difficulty === filter
      );
  }

  container.innerHTML =
    data
      .map(
        (item, index) => `
          <article
            class="question-card"
            data-subject="${escapeHTML(
              item.subject
            )}"
            data-difficulty="${escapeHTML(
              item.difficulty
            )}"
          >
            <div class="question-meta">
              <span>${escapeHTML(
                item.course
              )}</span>
              <span>${escapeHTML(
                item.subject
              )}</span>
              <span>${escapeHTML(
                item.difficulty
              )}</span>
            </div>

            <h3>
              Q${index + 1}.
              ${escapeHTML(
                item.question
              )}
            </h3>

            <div class="question-options">
              ${item.options
                .map(
                  (option, optionIndex) => `
                    <button
                      type="button"
                      class="question-option"
                      data-question-id="${escapeHTML(
                        item.id
                      )}"
                      data-option="${optionIndex}"
                    >
                      ${String.fromCharCode(
                        65 + optionIndex
                      )}.
                      ${escapeHTML(
                        option
                      )}
                    </button>
                  `
                )
                .join("")}
            </div>

            <div
              class="question-explanation"
              id="explanation-${escapeHTML(
                item.id
              )}"
            ></div>
          </article>
        `
      )
      .join("");

  $$(".question-option", container)
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          answerQuestionBank(
            button
          );
        }
      );
    });
}

function answerQuestionBank(button) {
  const questionId =
    button.dataset.questionId;

  const item =
    questionBank.find(
      (question) =>
        question.id === questionId
    );

  if (!item) return;

  const selected =
    Number(
      button.dataset.option
    );

  const correct =
    selected === item.answer;

  $$( 
    `[data-question-id="${CSS.escape(
      questionId
    )}"]`
  ).forEach((option) => {
    option.disabled = true;
  });

  button.classList.add(
    correct
      ? "correct"
      : "incorrect"
  );

  if (!correct) {
    const correctButton =
      $(
        `[data-question-id="${CSS.escape(
          questionId
        )}"][data-option="${item.answer}"]`
      );

    if (correctButton) {
      correctButton.classList.add(
        "correct"
      );
    }
  }

  const explanation =
    $(
      `#explanation-${CSS.escape(
        questionId
      )}`
    );

  if (explanation) {
    explanation.innerHTML = `
      <strong>
        ${correct ? "Correct" : "Review this"}
      </strong>
      <p>${escapeHTML(
        item.explanation
      )}</p>
    `;
  }

  progress.questionsAttempted++;

  if (correct) {
    progress.correctAnswers++;
  }

  saveStorage(
    STORAGE_KEYS.progress,
    progress
  );

  renderProgress();

  addActivity(
    `Attempted ${item.subject} question`,
    "Question Bank"
  );
}

/* =========================================================
   QUIZ
   ========================================================= */

function setupQuiz() {
  const startButton =
    $("#startQuiz") ||
    $('[data-action="start-quiz"]');

  if (startButton) {
    startButton.addEventListener(
      "click",
      startQuiz
    );
  }

  const retryButton =
    $("#retryQuiz") ||
    $('[data-action="retry-quiz"]');

  if (retryButton) {
    retryButton.addEventListener(
      "click",
      startQuiz
    );
  }
}

function startQuiz() {
  quizState.questions =
    [...defaultQuizQuestions]
      .sort(() => Math.random() - 0.5);

  quizState.current = 0;
  quizState.score = 0;
  quizState.selected = null;
  quizState.seconds = 0;
  quizState.started = true;

  clearInterval(
    quizState.timer
  );

  quizState.timer =
    setInterval(() => {
      quizState.seconds++;

      const timer =
        $("#quizTimer");

      if (timer) {
        timer.textContent =
          formatTime(
            quizState.seconds
          );
      }
    }, 1000);

  renderQuizQuestion();

  addActivity(
    "Started a quiz",
    "Quiz"
  );
}

function renderQuizQuestion() {
  const container =
    $("#quizContainer");

  if (!container) return;

  const question =
    quizState.questions[
      quizState.current
    ];

  if (!question) {
    finishQuiz();
    return;
  }

  container.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-progress">
        Question
        ${quizState.current + 1}
        /
        ${quizState.questions.length}
      </div>

      <h2>
        ${escapeHTML(
          question.question
        )}
      </h2>

      <div class="quiz-options">
        ${question.options
          .map(
            (option, index) => `
              <button
                type="button"
                class="quiz-option"
                data-option="${index}"
              >
                <span>
                  ${String.fromCharCode(
                    65 + index
                  )}
                </span>
                ${escapeHTML(
                  option
                )}
              </button>
            `
          )
          .join("")}
      </div>

      <div
        class="quiz-feedback"
        id="quizFeedback"
      ></div>

      <button
        type="button"
        class="btn primary"
        id="nextQuizQuestion"
        style="display:none"
      >
        Next Question
      </button>
    </div>
  `;

  $$(".quiz-option", container)
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          selectQuizAnswer(
            Number(
              button.dataset.option
            )
          );
        }
      );
    });

  const next =
    $("#nextQuizQuestion");

  if (next) {
    next.addEventListener(
      "click",
      () => {
        quizState.current++;
        renderQuizQuestion();
      }
    );
  }
}

function selectQuizAnswer(index) {
  if (
    quizState.selected !== null
  ) {
    return;
  }

  quizState.selected = index;

  const question =
    quizState.questions[
      quizState.current
    ];

  const correct =
    index === question.answer;

  if (correct) {
    quizState.score++;
  }

  progress.questionsAttempted++;

  if (correct) {
    progress.correctAnswers++;
  }

  saveStorage(
    STORAGE_KEYS.progress,
    progress
  );

  renderProgress();

  $$(".quiz-option").forEach(
    (button, optionIndex) => {
      button.disabled = true;

      if (
        optionIndex ===
        question.answer
      ) {
        button.classList.add(
          "correct"
        );
      }

      if (
        optionIndex === index &&
        !correct
      ) {
        button.classList.add(
          "incorrect"
        );
      }
    }
  );

  const feedback =
    $("#quizFeedback");

  if (feedback) {
    feedback.innerHTML = `
      <strong>
        ${correct ? "Correct!" : "Not quite."}
      </strong>

      <p>
        ${escapeHTML(
          question.explanation
        )}
      </p>
    `;
  }

  const next =
    $("#nextQuizQuestion");

  if (next) {
    next.style.display =
      "inline-flex";
  }
}

function finishQuiz() {
  clearInterval(
    quizState.timer
  );

  quizState.timer = null;

  const total =
    quizState.questions.length;

  const percentage =
    total
      ? Math.round(
          (quizState.score /
            total) *
            100
        )
      : 0;

  quizHistory.unshift({
    id: Date.now(),
    score: quizState.score,
    total,
    percentage,
    time: new Date().toISOString()
  });

  quizHistory =
    quizHistory.slice(0, 20);

  saveStorage(
    STORAGE_KEYS.quizHistory,
    quizHistory
  );

  const container =
    $("#quizContainer");

  if (container) {
    container.innerHTML = `
      <div class="quiz-result">
        <h2>Quiz Complete</h2>

        <div class="score-circle">
          ${percentage}%
        </div>

        <p>
          Score:
          <strong>
            ${quizState.score}/${total}
          </strong>
        </p>

        <p>
          Time:
          ${formatTime(
            quizState.seconds
          )}
        </p>

        <button
          type="button"
          class="btn primary"
          id="retryQuiz"
        >
          Retry Quiz
        </button>
      </div>
    `;

    $("#retryQuiz")
      ?.addEventListener(
        "click",
        startQuiz
      );
  }

  addActivity(
    `Completed quiz with ${percentage}%`,
    "Quiz"
  );
}

/* =========================================================
   TESTS
   ========================================================= */

function setupTests() {
  $$("[data-start-test]").forEach(
    (button) => {
      button.addEventListener(
        "click",
        () => {
          startTest(
            button.dataset.startTest
          );
        }
      );
    }
  );
}

function startTest(type = "NEET") {
  testState.questions =
    [...questionBank]
      .filter(
        (item) =>
          item.course ===
          type
      );

  if (!testState.questions.length) {
    testState.questions =
      [...questionBank];
  }

  testState.currentQuestion = 0;
  testState.answers = {};
  testState.seconds = 0;

  clearInterval(
    testState.timer
  );

  testState.timer =
    setInterval(() => {
      testState.seconds++;

      const timer =
        $("#testTimer");

      if (timer) {
        timer.textContent =
          formatTime(
            testState.seconds
          );
      }
    }, 1000);

  renderTestQuestion();

  addActivity(
    `Started ${type} test`,
    "Test"
  );
}

function renderTestQuestion() {
  const container =
    $("#testContainer");

  if (!container) return;

  const question =
    testState.questions[
      testState.currentQuestion
    ];

  if (!question) {
    finishTest();
    return;
  }

  container.innerHTML = `
    <div class="test-question">
      <div class="test-progress">
        Question
        ${
          testState.currentQuestion +
          1
        }
        /
        ${testState.questions.length}
      </div>

      <h2>
        ${escapeHTML(
          question.question
        )}
      </h2>

      <div class="test-options">
        ${question.options
          .map(
            (option, index) => `
              <button
                type="button"
                class="test-option"
                data-test-option="${index}"
              >
                ${String.fromCharCode(
                  65 + index
                )}.
                ${escapeHTML(
                  option
                )}
              </button>
            `
          )
          .join("")}
      </div>

      <button
        type="button"
        class="btn primary"
        id="nextTestQuestion"
      >
        ${
          testState.currentQuestion ===
          testState.questions.length - 1
            ? "Submit Test"
            : "Next"
        }
      </button>
    </div>
  `;

  $$(".test-option", container)
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          $$(".test-option", container)
            .forEach((item) =>
              item.classList.remove(
                "selected"
              )
            );

          button.classList.add(
            "selected"
          );

          testState.answers[
            testState.currentQuestion
          ] = Number(
            button.dataset.testOption
          );
        }
      );
    });

  $("#nextTestQuestion")
    ?.addEventListener(
      "click",
      () => {
        testState.currentQuestion++;

        if (
          testState.currentQuestion >=
          testState.questions.length
        ) {
          finishTest();
        } else {
          renderTestQuestion();
        }
      }
    );
}

function finishTest() {
  clearInterval(
    testState.timer
  );

  testState.timer = null;

  let score = 0;

  testState.questions.forEach(
    (question, index) => {
      if (
        testState.answers[index] ===
        question.answer
      ) {
        score++;
      }
    }
  );

  const total =
    testState.questions.length;

  const percentage =
    total
      ? Math.round(
          (score / total) * 100
        )
      : 0;

  progress.questionsAttempted +=
    total;

  progress.correctAnswers +=
    score;

  saveStorage(
    STORAGE_KEYS.progress,
    progress
  );

  renderProgress();

  const container =
    $("#testContainer");

  if (container) {
    container.innerHTML = `
      <div class="test-result">
        <h2>Test Submitted</h2>

        <div class="score-circle">
          ${percentage}%
        </div>

        <p>
          Score:
          <strong>
            ${score}/${total}
          </strong>
        </p>

        <p>
          Time:
          ${formatTime(
            testState.seconds
          )}
        </p>
      </div>
    `;
  }

  addActivity(
    `Completed test with ${percentage}%`,
    "Test"
  );
}

/* =========================================================
   PLANNER
   ========================================================= */

function setupPlanner() {
  const form =
    $("#plannerForm");

  if (form) {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const input =
          form.querySelector(
            '[name="task"]'
          );

        if (!input) return;

        const title =
          input.value.trim();

        if (!title) return;

        planner.tasks.push({
          id:
            `task-${Date.now()}`,
          title,
          subject:
            "General",
          time:
            "30 min",
          completed:
            false
        });

        saveStorage(
          STORAGE_KEYS.planner,
          planner
        );

        input.value = "";

        renderPlanner();

        toast(
          "Task added.",
          "success"
        );
      }
    );
  }
}

function renderPlanner() {
  const container =
    $("#plannerTasks") ||
    $(".planner-tasks");

  if (!container) return;

  container.innerHTML =
    planner.tasks
      .map(
        (task) => `
          <div
            class="planner-task ${
              task.completed
                ? "completed"
                : ""
            }"
          >
            <label>
              <input
                type="checkbox"
                data-task-id="${escapeHTML(
                  task.id
                )}"
                ${
                  task.completed
                    ? "checked"
                    : ""
                }
              >

              <span>
                <strong>
                  ${escapeHTML(
                    task.title
                  )}
                </strong>

                <small>
                  ${escapeHTML(
                    task.subject
                  )}
                  ·
                  ${escapeHTML(
                    task.time
                  )}
                </small>
              </span>
            </label>
          </div>
        `
      )
      .join("");

  $$(
    "[data-task-id]",
    container
  ).forEach((checkbox) => {
    checkbox.addEventListener(
      "change",
      () => {
        const task =
          planner.tasks.find(
            (item) =>
              item.id ===
              checkbox.dataset
                .taskId
          );

        if (!task) return;

        task.completed =
          checkbox.checked;

        saveStorage(
          STORAGE_KEYS.planner,
          planner
        );

        renderPlanner();

        if (task.completed) {
          addActivity(
            `Completed: ${task.title}`,
            "Planner"
          );
        }
      }
    );
  });

  const completed =
    planner.tasks.filter(
      (task) =>
        task.completed
    ).length;

  const total =
    planner.tasks.length;

  const percentage =
    total
      ? Math.round(
          (completed / total) *
            100
        )
      : 0;

  $$(
    '[data-planner-progress]'
  ).forEach((element) => {
    element.textContent =
      `${percentage}%`;
  });
}

/* =========================================================
   AI KHUSHI
   VERCEL API: /api/chat
   ========================================================= */

function setupAI() {
  const form =
    $("#aiForm") ||
    $("#chatForm") ||
    $('[data-ai-form]');

  const input =
    $("#aiInput") ||
    $("#chatInput") ||
    $('[data-ai-input]');

  if (form && input) {
    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const message =
          input.value.trim();

        if (!message) {
          toast(
            "Please enter your question."
          );
          return;
        }

        input.value = "";

        await sendAIMessage(
          message
        );
      }
    );
  }

  $$(
    '[data-ai-language]'
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        $$(
          "[data-ai-language]"
        ).forEach((item) =>
          item.classList.remove(
            "active"
          )
        );

        button.classList.add(
          "active"
        );

        window.khushiLanguage =
          button.dataset
            .aiLanguage;
      }
    );
  });
}

async function sendAIMessage(message) {
  const chat =
    $("#aiChat") ||
    $("#chatMessages") ||
    $(".ai-chat");

  if (!chat) return;

  appendChatMessage(
    "user",
    message
  );

  const loadingId =
    `ai-loading-${Date.now()}`;

  appendChatMessage(
    "assistant",
    "Khushi is thinking...",
    loadingId
  );

  try {
    const history =
      getAIHistory();

    const response =
      await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            message,
            history
          })
        }
      );

    const data =
      await response.json();

    removeChatMessage(
      loadingId
    );

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "AI request failed."
      );
    }

    const answer =
      data?.answer ||
      "I could not generate an answer.";

    appendChatMessage(
      "assistant",
      answer
    );

    addActivity(
      "Asked Khushi AI Tutor",
      "AI Tutor"
    );
  } catch (error) {
    console.error(
      "Khushi AI error:",
      error
    );

    removeChatMessage(
      loadingId
    );

    appendChatMessage(
      "assistant",
      "Khushi is temporarily unavailable. Please check your Vercel API settings and GEMINI_API_KEY."
    );

    toast(
      "AI connection failed.",
      "error"
    );
  }
}

function appendChatMessage(
  role,
  text,
  id = ""
) {
  const chat =
    $("#aiChat") ||
    $("#chatMessages") ||
    $(".ai-chat");

  if (!chat) return;

  const message =
    document.createElement("div");

  message.className =
    `chat-message ${role}`;

  if (id) {
    message.id = id;
  }

  message.innerHTML = `
    <div class="chat-avatar">
      ${
        role === "user"
          ? "👤"
          : "👩‍🏫"
      }
    </div>

    <div class="chat-bubble">
      ${formatAIText(text)}
    </div>
  `;

  chat.appendChild(
    message
  );

  chat.scrollTop =
    chat.scrollHeight;
}

function removeChatMessage(id) {
  const element =
    document.getElementById(id);

  if (element) {
    element.remove();
  }
}

function formatAIText(text) {
  const safe =
    escapeHTML(text);

  return safe
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function getAIHistory() {
  const chat =
    $("#aiChat") ||
    $("#chatMessages") ||
    $(".ai-chat");

  if (!chat) return [];

  const messages =
    $$(".chat-message", chat)
      .slice(-12)
      .map((message) => {
        const role =
          message.classList.contains(
            "user"
          )
            ? "user"
            : "model";

        const bubble =
          $(".chat-bubble", message);

        return {
          role,
          text:
            bubble?.textContent ||
            ""
        };
      });

  return messages;
}

/* =========================================================
   VOICE INPUT
   ========================================================= */

function setupVoiceInput() {
  const button =
    $("#voiceInput") ||
    $('[data-action="voice"]');

  if (!button) return;

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    button.addEventListener(
      "click",
      () => {
        toast(
          "Voice input is not supported in this browser."
        );
      }
    );

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang =
    "hi-IN";

  recognition.interimResults =
    false;

  recognition.continuous =
    false;

  recognition.addEventListener(
    "result",
    (event) => {
      const text =
        event.results?.[0]?.[0]
          ?.transcript || "";

      const input =
        $("#aiInput") ||
        $("#chatInput");

      if (input) {
        input.value = text;
        input.focus();
      }
    }
  );

  button.addEventListener(
    "click",
    () => {
      recognition.start();

      toast(
        "Listening..."
      );
    }
  );
}

/* =========================================================
   YOUTUBE
   VERCEL API: /api/youtube
   ========================================================= */

function setupYouTube() {
  const form =
    $("#youtubeSearchForm");

  const input =
    $("#youtubeSearch");

  if (form && input) {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        searchYouTube(
          input.value.trim()
        );
      }
    );
  }

  const searchButton =
    $("#youtubeSearchBtn");

  if (searchButton) {
    searchButton.addEventListener(
      "click",
      () => {
        searchYouTube(
          input?.value.trim() ||
            "NEET JEE lecture"
        );
      }
    );
  }
}

async function searchYouTube(query) {
  const container =
    $("#youtubeResults") ||
    $(".youtube-results");

  if (!container) return;

  if (!query) {
    toast(
      "Enter a YouTube search."
    );
    return;
  }

  container.innerHTML = `
    <div class="loading-state">
      Searching YouTube...
    </div>
  `;

  try {
    const params =
      new URLSearchParams({
        q: query,
        maxResults: "12"
      });

    const subject =
      $("#youtubeSubject")?.value;

    const type =
      $("#youtubeType")?.value;

    if (subject) {
      params.set(
        "subject",
        subject
      );
    }

    if (type) {
      params.set(
        "type",
        type
      );
    }

    const response =
      await fetch(
        `/api/youtube?${params.toString()}`
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "YouTube request failed."
      );
    }

    renderYouTubeResults(
      data.items || []
    );

    addActivity(
      `Searched YouTube for "${query}"`,
      "YouTube"
    );
  } catch (error) {
    console.error(
      "YouTube error:",
      error
    );

    container.innerHTML = `
      <div class="empty-state">
        <h3>YouTube search unavailable</h3>
        <p>
          Check your Vercel YOUTUBE_API_KEY environment variable.
        </p>
      </div>
    `;

    toast(
      "YouTube connection failed.",
      "error"
    );
  }
}

function renderYouTubeResults(
  items
) {
  const container =
    $("#youtubeResults") ||
    $(".youtube-results");

  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No videos found</h3>
        <p>Try another search.</p>
      </div>
    `;
    return;
  }

  container.innerHTML =
    items
      .map(
        (item) => `
          <article
            class="youtube-card"
            data-video-id="${escapeHTML(
              item.videoId
            )}"
          >
            <img
              src="${escapeHTML(
                item.thumbnail
              )}"
              alt=""
              loading="lazy"
            >

            <div class="youtube-card-body">
              <h3>
                ${escapeHTML(
                  item.title
                )}
              </h3>

              <p>
                ${escapeHTML(
                  item.channelTitle ||
                    ""
                )}
              </p>

              <button
                type="button"
                class="btn primary"
                data-play-video="${escapeHTML(
                  item.videoId
                )}"
              >
                Watch
              </button>

              <button
                type="button"
                class="btn"
                data-save-video="${escapeHTML(
                  item.videoId
                )}"
                data-video-title="${escapeHTML(
                  item.title
                )}"
              >
                Bookmark
              </button>
            </div>
          </article>
        `
      )
      .join("");

  $$(
    "[data-play-video]",
    container
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        openYouTubeVideo(
          button.dataset
            .playVideo
        );
      }
    );
  });

  $$(
    "[data-save-video]",
    container
  ).forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        toggleBookmark({
          id:
            `youtube-${button.dataset.saveVideo}`,
          title:
            button.dataset.videoTitle,
          type:
            "YouTube Video"
        });
      }
    );
  });
}

function openYouTubeVideo(
  videoId
) {
  const viewer =
    $("#youtubeViewer") ||
    $("#videoViewer");

  const iframe =
    $("#youtubePlayer") ||
    $("#videoPlayer");

  if (iframe) {
    iframe.src =
      `https://www.youtube.com/embed/${encodeURIComponent(
        videoId
      )}`;

    if (viewer) {
      viewer.classList.add(
        "active"
      );
    }

    return;
  }

  window.open(
    `https://www.youtube.com/watch?v=${encodeURIComponent(
      videoId
    )}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function renderAnalytics() {
  const attempted =
    progress.questionsAttempted;

  const correct =
    progress.correctAnswers;

  const accuracy =
    attempted
      ? Math.round(
          (correct /
            attempted) *
            100
        )
      : 0;

  const values = {
    overall:
      progress.overall,
    accuracy,
    attempted,
    correct,
    streak:
      progress.streak,
    lessons:
      progress.lessonsCompleted
  };

  Object.entries(values).forEach(
    ([key, value]) => {
      $$(
        `[data-analytics="${key}"]`
      ).forEach((element) => {
        element.textContent =
          key === "accuracy"
            ? `${value}%`
            : value;
      });
    }
  );

  renderAnalyticsBars();
}

function renderAnalyticsBars() {
  const subjects = [
    ["Physics", progress.physics],
    [
      "Chemistry",
      progress.chemistry
    ],
    ["Biology", progress.biology],
    [
      "Mathematics",
      progress.mathematics
    ]
  ];

  const container =
    $("#analyticsBars") ||
    $(".analytics-bars");

  if (!container) return;

  container.innerHTML =
    subjects
      .map(
        ([name, value]) => `
          <div class="analytics-bar-item">
            <div class="analytics-label">
              <span>
                ${escapeHTML(
                  name
                )}
              </span>

              <strong>
                ${value}%
              </strong>
            </div>

            <div class="analytics-bar">
              <span
                style="width:${clamp(
                  value,
                  0,
                  100
                )}%"
              ></span>
            </div>
          </div>
        `
      )
      .join("");
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function renderNotifications() {
  const container =
    $("#notificationsList") ||
    $(".notifications-list");

  if (!container) return;

  if (!notifications.length) {
    notifications = [
      {
        id: 1,
        title: "Welcome to Study Wallah",
        message:
          "Start your NEET or JEE preparation today.",
        read: false
      },
      {
        id: 2,
        title: "Khushi AI Tutor",
        message:
          "Ask Khushi your Physics, Chemistry, Biology or Maths doubts.",
        read: false
      }
    ];

    saveStorage(
      STORAGE_KEYS.notifications,
      notifications
    );
  }

  container.innerHTML =
    notifications
      .map(
        (item) => `
          <div class="notification-item ${
            item.read
              ? "read"
              : "unread"
          }">
            <strong>
              ${escapeHTML(
                item.title
              )}
            </strong>

            <p>
              ${escapeHTML(
                item.message
              )}
            </p>
          </div>
        `
      )
      .join("");
}

/* =========================================================
   DATE
   ========================================================= */

function renderCurrentDate() {
  const date =
    new Date();

  $$(
    "[data-current-date]"
  ).forEach((element) => {
    element.textContent =
      date.toLocaleDateString(
        currentLanguage ===
          "Hindi"
          ? "hi-IN"
          : "en-IN",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );
  });
}

/* =========================================================
   ONLINE / OFFLINE
   ========================================================= */

function updateOnlineStatus() {
  const update = () => {
    const online =
      navigator.onLine;

    $$(
      "[data-online-status]"
    ).forEach((element) => {
      element.textContent =
        online
          ? "Online"
          : "Offline";
    });

    document.body.classList.toggle(
      "offline",
      !online
    );
  };

  update();

  window.addEventListener(
    "online",
    update
  );

  window.addEventListener(
    "offline",
    update
  );
}

/* =========================================================
   GENERIC ACTION BUTTONS
   ========================================================= */

function setupGenericActions() {
  document.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-action]"
        );

      if (!button) return;

      const action =
        button.dataset.action;

      if (
        action ===
        "mobile-menu"
      ) {
        toggleMobileMenu();
      }

      if (
        action ===
        "close-mobile-menu"
      ) {
        closeMobileMenu();
      }

      if (
        action ===
        "notifications"
      ) {
        openNotifications();
      }

      if (
        action ===
        "profile"
      ) {
        openPage("profile");
      }

      if (
        action ===
        "settings"
      ) {
        openPage("settings");
      }

      if (
        action ===
        "search"
      ) {
        const input =
          $("#globalSearch");

        input?.focus();
      }

      if (
        action ===
        "voice"
      ) {
        startVoiceInput();
      }
    }
  );

  setupVoiceInput();
}

function openNotifications() {
  const container =
    $("#notificationsPanel") ||
    $(".notifications-panel");

  if (container) {
    container.classList.toggle(
      "open"
    );
  } else {
    openPage(
      "notifications"
    );
  }
}

/* =========================================================
   VOICE
   ========================================================= */

function startVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast(
      "Voice input is not supported in this browser."
    );
    return;
  }

  const input =
    $("#aiInput") ||
    $("#chatInput");

  const recognition =
    new SpeechRecognition();

  recognition.lang =
    "hi-IN";

  recognition.interimResults =
    false;

  recognition.continuous =
    false;

  recognition.onstart = () => {
    toast(
      "Listening..."
    );
  };

  recognition.onresult =
    (event) => {
      const text =
        event.results?.[0]?.[0]
          ?.transcript || "";

      if (input) {
        input.value = text;
        input.focus();
      }
    };

  recognition.onerror = () => {
    toast(
      "Voice input could not start."
    );
  };

  recognition.start();
}

/* =========================================================
   STUDY STREAK
   ========================================================= */

function updateStudyStreak() {
  const today =
    todayKey();

  if (
    progress.lastStudyDate ===
    today
  ) {
    return;
  }

  const previous =
    new Date();

  previous.setDate(
    previous.getDate() - 1
  );

  const yesterday =
    previous
      .toISOString()
      .slice(0, 10);

  if (
    progress.lastStudyDate ===
    yesterday
  ) {
    progress.streak++;
  } else {
    progress.streak = 1;
  }

  progress.lastStudyDate =
    today;

  saveStorage(
    STORAGE_KEYS.progress,
    progress
  );

  renderProgress();
}

/* =========================================================
   LESSON PROGRESS
   ========================================================= */

function markLessonComplete(
  subject,
  amount = 2
) {
  const key =
    String(subject || "")
      .toLowerCase();

  if (
    Object.prototype.hasOwnProperty.call(
      progress,
      key
    )
  ) {
    progress[key] =
      clamp(
        Number(
          progress[key]
        ) + amount,
        0,
        100
      );
  }

  progress.lessonsCompleted++;

  updateStudyStreak();
  updateProgress();

  addActivity(
    `Completed ${subject} lesson`,
    "Course"
  );

  toast(
    "Lesson completed.",
    "success"
  );
}

/* =========================================================
   MODAL SUPPORT
   ========================================================= */

function openModal(content) {
  let modal =
    $("#globalModal");

  if (!modal) {
    modal =
      document.createElement(
        "div"
      );

    modal.id =
      "globalModal";

    modal.className =
      "modal";

    document.body.appendChild(
      modal
    );
  }

  modal.innerHTML = `
    <div class="modal-backdrop"></div>

    <div class="modal-dialog">
      <button
        type="button"
        class="modal-close"
        id="closeGlobalModal"
      >
        ×
      </button>

      ${content}
    </div>
  `;

  modal.classList.add(
    "open"
  );

  $("#closeGlobalModal")
    ?.addEventListener(
      "click",
      closeModal
    );

  $(".modal-backdrop")
    ?.addEventListener(
      "click",
      closeModal
    );
}

function closeModal() {
  const modal =
    $("#globalModal");

  if (modal) {
    modal.classList.remove(
      "open"
    );
  }
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "/" &&
      document.activeElement?.tagName !==
        "INPUT" &&
      document.activeElement?.tagName !==
        "TEXTAREA"
    ) {
      event.preventDefault();

      const search =
        $("#globalSearch");

      search?.focus();
    }

    if (
      event.key === "Escape"
    ) {
      closeMobileMenu();
      closeModal();
    }
  }
);

/* =========================================================
   STUDY TIMER
   ========================================================= */

let studyTimer = {
  interval: null,
  seconds: 0,
  running: false
};

function startStudyTimer() {
  if (
    studyTimer.running
  ) {
    return;
  }

  studyTimer.running = true;

  studyTimer.interval =
    setInterval(() => {
      studyTimer.seconds++;

      const timer =
        $("#studyTimer");

      if (timer) {
        timer.textContent =
          formatTime(
            studyTimer.seconds
          );
      }

      if (
        studyTimer.seconds %
          60 ===
        0
      ) {
        progress.studyMinutes++;

        saveStorage(
          STORAGE_KEYS.progress,
          progress
        );
      }
    }, 1000);
}

function stopStudyTimer() {
  clearInterval(
    studyTimer.interval
  );

  studyTimer.interval =
    null;

  studyTimer.running =
    false;
}

/* =========================================================
   EXTERNAL RESOURCE SAFETY
   ========================================================= */

function setupSafeExternalLinks() {
  $$(
    'a[target="_blank"]'
  ).forEach((link) => {
    link.rel =
      "noopener noreferrer";
  });
}

/* =========================================================
   APP STARTUP EXTRAS
   ========================================================= */

updateStudyStreak();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    setupSafeExternalLinks();

    const startStudy =
      $('[data-action="start-study"]');

    if (startStudy) {
      startStudy.addEventListener(
        "click",
        () => {
          startStudyTimer();

          toast(
            "Study timer started.",
            "success"
          );
        }
      );
    }

    const stopStudy =
      $('[data-action="stop-study"]');

    if (stopStudy) {
      stopStudy.addEventListener(
        "click",
        () => {
          stopStudyTimer();

          toast(
            "Study timer stopped."
          );
        }
      );
    }
  }
);

/* =========================================================
   PUBLIC API
   ========================================================= */

window.StudyWallah = {
  openPage,
  toast,
  toggleBookmark,
  startQuiz,
  startTest,
  sendAIMessage,
  searchYouTube,
  markLessonComplete,
  startStudyTimer,
  stopStudyTimer
};
