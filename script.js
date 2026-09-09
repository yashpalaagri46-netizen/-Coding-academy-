/* =========================================================
   STUDY WALLAH
   NEET + JEE Preparation Platform
   Main JavaScript
   ========================================================= */

"use strict";

/* -----------------------------
   STORAGE
----------------------------- */

const STORAGE = {
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

/* -----------------------------
   DEFAULT DATA
----------------------------- */

const defaultProfile = {
  name: "Student",
  course: "NEET",
  photo: ""
};

const defaultProgress = {
  overall: 12,
  NEET: 15,
  JEE: 8,
  Physics: 12,
  Chemistry: 10,
  Biology: 18,
  Mathematics: 7,
  quizzes: 0,
  tests: 0
};

const defaultPlanner = [
  {
    id: 1,
    title: "Physics — Motion in a Straight Line",
    course: "NEET",
    done: false
  },
  {
    id: 2,
    title: "Chemistry — Some Basic Concepts",
    course: "NEET",
    done: false
  },
  {
    id: 3,
    title: "Biology — The Living World",
    course: "NEET",
    done: true
  }
];

const quizQuestions = [
  {
    question: "Which quantity has both magnitude and direction?",
    options: [
      "Distance",
      "Speed",
      "Displacement",
      "Time"
    ],
    answer: 2,
    explanation:
      "Displacement is a vector quantity because it has both magnitude and direction."
  },
  {
    question: "The SI unit of force is:",
    options: [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    answer: 1,
    explanation:
      "Force is measured in newtons (N) in the SI system."
  },
  {
    question: "Which organelle is known as the powerhouse of the cell?",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Golgi apparatus"
    ],
    answer: 2,
    explanation:
      "Mitochondria produce most of the ATP used by cells."
  },
  {
    question: "The molecular formula of water is:",
    options: [
      "CO₂",
      "H₂O",
      "O₂",
      "H₂"
    ],
    answer: 1,
    explanation:
      "A water molecule contains two hydrogen atoms and one oxygen atom."
  },
  {
    question: "What is the value of acceleration due to gravity near Earth's surface?",
    options: [
      "9.8 m/s²",
      "98 m/s²",
      "0.98 m/s²",
      "980 m/s²"
    ],
    answer: 0,
    explanation:
      "The commonly used value of gravitational acceleration near Earth's surface is approximately 9.8 m/s²."
  }
];

/* -----------------------------
   HELPERS
----------------------------- */

function $(selector, parent = document) {
  return parent.querySelector(selector);
}

function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Storage error:", error);
  }
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message, type = "info") {
  let box = $("#toast");

  if (!box) {
    box = document.createElement("div");
    box.id = "toast";
    box.className = "toast";
    document.body.appendChild(box);
  }

  box.textContent = message;
  box.dataset.type = type;
  box.classList.add("show");

  clearTimeout(window.studyWallahToastTimer);

  window.studyWallahToastTimer = setTimeout(() => {
    box.classList.remove("show");
  }, 2600);
}

/* -----------------------------
   APP STATE
----------------------------- */

let profile = readStorage(STORAGE.profile, defaultProfile);
let progress = readStorage(STORAGE.progress, defaultProgress);
let bookmarks = readStorage(STORAGE.bookmarks, []);
let activity = readStorage(STORAGE.activity, []);
let planner = readStorage(STORAGE.planner, defaultPlanner);
let quizHistory = readStorage(STORAGE.quizHistory, []);
let currentQuiz = [];
let currentQuizIndex = 0;
let quizScore = 0;
let quizTimer = null;
let quizSeconds = 600;

let testTimer = null;
let testSeconds = 3600;

/* -----------------------------
   INITIALIZE
----------------------------- */

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  loadTheme();
  loadLanguage();
  setupNavigation();
  setupMobileMenu();
  setupSearch();
  setupButtons();
  setupFilters();
  setupSettings();
  setupProfile();
  setupQuiz();
  setupTestButtons();
  setupBookmarks();
  setupPlanner();
  setupAI();
  setupYouTube();
  renderAll();
  updateDate();
  hideLoader();
}

/* -----------------------------
   LOADER
----------------------------- */

function hideLoader() {
  const loader = $("#loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 400);
}

/* -----------------------------
   NAVIGATION
----------------------------- */

function setupNavigation() {
  const navItems = $$("[data-page], .nav-item");

  navItems.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();

      const page =
        item.dataset.page ||
        item.getAttribute("href")?.replace("#", "");

      if (!page) return;

      showPage(page);
      closeMobileMenu();
    });
  });

  window.addEventListener("hashchange", () => {
    const page = location.hash.replace("#", "");

    if (page) {
      showPage(page, false);
    }
  });

  const initialPage = location.hash.replace("#", "") || "home";

  showPage(initialPage, false);
}

function showPage(page, updateHash = true) {
  const pages = $$(".page");

  let target =
    $(`#${CSS.escape(page)}`) ||
    $(`.page[data-page="${CSS.escape(page)}"]`) ||
    $(`[data-section="${CSS.escape(page)}"]`);

  if (!target) {
    target =
      $("#home") ||
      $(".page");
  }

  pages.forEach(section => {
    section.classList.remove("active");
    section.hidden = true;
  });

  if (target) {
    target.classList.add("active");
    target.hidden = false;
  }

  $$("[data-page], .nav-item").forEach(item => {
    const itemPage =
      item.dataset.page ||
      item.getAttribute("href")?.replace("#", "");

    item.classList.toggle("active", itemPage === page);
  });

  if (updateHash && history.replaceState) {
    history.replaceState(null, "", `#${page}`);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* -----------------------------
   MOBILE MENU
----------------------------- */

function setupMobileMenu() {
  const buttons = $$("[data-menu], .menu-btn, .hamburger");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  });

  const overlay = $("#mobileOverlay");

  if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
  }
}

function closeMobileMenu() {
  document.body.classList.remove("menu-open");
}

/* -----------------------------
   SEARCH
----------------------------- */

function setupSearch() {
  const inputs = $$(
    "#globalSearch, .global-search, [data-search]"
  );

  inputs.forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        performSearch(input.value);
      }
    });

    input.addEventListener("input", () => {
      if (input.value.trim().length >= 2) {
        showSearchSuggestions(input.value.trim());
      }
    });
  });
}

function performSearch(query) {
  const text = query.trim();

  if (!text) {
    toast("Search something first.");
    return;
  }

  const q = text.toLowerCase();

  const pages = [
    {
      name: "Physics",
      page: "courses",
      keywords: ["physics", "motion", "force", "work"]
    },
    {
      name: "Chemistry",
      page: "courses",
      keywords: ["chemistry", "atom", "mole", "chemical"]
    },
    {
      name: "Biology",
      page: "courses",
      keywords: ["biology", "cell", "plant", "human"]
    },
    {
      name: "Mathematics",
      page: "courses",
      keywords: ["math", "mathematics", "algebra", "calculus"]
    },
    {
      name: "DPP",
      page: "dpp",
      keywords: ["dpp", "daily practice", "practice"]
    },
    {
      name: "Question Bank",
      page: "question-bank",
      keywords: ["question", "mcq", "question bank"]
    },
    {
      name: "Quiz",
      page: "quiz",
      keywords: ["quiz", "test quiz"]
    },
    {
      name: "Tests",
      page: "tests",
      keywords: ["test", "mock", "mock test", "exam"]
    },
    {
      name: "Notes",
      page: "notes",
      keywords: ["notes", "revision", "study notes"]
    },
    {
      name: "YouTube Learning",
      page: "youtube",
      keywords: ["youtube", "video", "lecture", "live"]
    },
    {
      name: "Khushi AI Tutor",
      page: "ai",
      keywords: ["ai", "khushi", "doubt", "doubt solver"]
    },
    {
      name: "Study Planner",
      page: "planner",
      keywords: ["planner", "plan", "task", "study plan"]
    },
    {
      name: "Analytics",
      page: "analytics",
      keywords: ["analytics", "progress", "performance", "score"]
    }
  ];

  const result = pages.find(item =>
    item.keywords.some(keyword => keyword.includes(q) || q.includes(keyword))
  );

  if (result) {
    showPage(result.page);
    toast(`${result.name} opened.`);
  } else {
    toast(`No section found for "${text}".`);
  }
}

function showSearchSuggestions(query) {
  const box = $("#searchSuggestions");

  if (!box) return;

  const items = [
    "NEET Physics",
    "NEET Chemistry",
    "NEET Biology",
    "JEE Physics",
    "JEE Chemistry",
    "JEE Mathematics",
    "DPP",
    "Question Bank",
    "Mock Test",
    "Notes",
    "YouTube",
    "Khushi AI"
  ];

  const results = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  if (!results.length) {
    box.innerHTML = "";
    box.classList.remove("show");
    return;
  }

  box.innerHTML = results
    .slice(0, 6)
    .map(item => `<button type="button">${escapeHTML(item)}</button>`)
    .join("");

  box.classList.add("show");

  $$("button", box).forEach(button => {
    button.addEventListener("click", () => {
      const input = $("#globalSearch");

      if (input) {
        input.value = button.textContent;
        performSearch(button.textContent);
      }

      box.classList.remove("show");
    });
  });
}

/* -----------------------------
   BUTTONS
----------------------------- */

function setupButtons() {
  $$("[data-open-page]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.openPage);
    });
  });

  $$("[data-toast]").forEach(button => {
    button.addEventListener("click", () => {
      toast(button.dataset.toast);
    });
  });

  $$("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
      handleAction(button.dataset.action, button);
    });
  });
}

function handleAction(action, button) {
  switch (action) {
    case "continue":
      showPage("courses");
      break;

    case "start-quiz":
      showPage("quiz");
      startQuiz();
      break;

    case "start-test":
      showPage("tests");
      toast("Select a test to begin.");
      break;

    case "ai":
      showPage("ai");
      break;

    case "youtube":
      showPage("youtube");
      break;

    case "planner":
      showPage("planner");
      break;

    default:
      toast(button?.dataset?.message || "Coming soon.");
  }
}

/* -----------------------------
   FILTERS
----------------------------- */

function setupFilters() {
  $$("[data-filter]").forEach(filter => {
    filter.addEventListener("change", () => {
      applyFilter(filter.dataset.filter, filter.value);
    });
  });

  $$("[data-course-filter]").forEach(button => {
    button.addEventListener("click", () => {
      $$("[data-course-filter]").forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      filterCourse(button.dataset.courseFilter);
    });
  });
}

function applyFilter(type, value) {
  const cards = $$("[data-course], [data-subject], [data-type]");

  cards.forEach(card => {
    const match =
      !value ||
      value === "all" ||
      card.dataset[type] === value;

    card.style.display = match ? "" : "none";
  });
}

function filterCourse(course) {
  const cards = $$("[data-course-card]");

  if (!cards.length) return;

  cards.forEach(card => {
    const cardCourse = card.dataset.courseCard;

    card.style.display =
      course === "all" || cardCourse === course
        ? ""
        : "none";
  });
}

/* -----------------------------
   PROFILE
----------------------------- */

function setupProfile() {
  $$("[data-profile-open], #profileButton, .profile-button").forEach(
    button => {
      button.addEventListener("click", () => {
        showPage("settings");
      });
    }
  );
}

function updateProfileUI() {
  const name = profile.name || "Student";

  $$("[data-user-name]").forEach(el => {
    el.textContent = name;
  });

  $("#userName") &&
    ($("#userName").textContent = name);

  $$(".user-name").forEach(el => {
    el.textContent = name;
  });

  $$("[data-user-course]").forEach(el => {
    el.textContent = profile.course || "NEET";
  });

  $("#userCourse") &&
    ($("#userCourse").textContent = profile.course || "NEET");

  const profileInput = $("#profileName");

  if (profileInput) {
    profileInput.value = name === "Student" ? "" : name;
  }

  const courseInput = $("#profileCourse");

  if (courseInput) {
    courseInput.value = profile.course || "NEET";
  }
}

function saveProfile() {
  const nameInput =
    $("#profileName") ||
    $("[name='profileName']");

  const courseInput =
    $("#profileCourse") ||
    $("[name='profileCourse']");

  const name =
    nameInput?.value?.trim() || profile.name || "Student";

  const course =
    courseInput?.value || profile.course || "NEET";

  profile = {
    ...profile,
    name,
    course
  };

  writeStorage(STORAGE.profile, profile);
  updateProfileUI();

  toast("Profile saved successfully.", "success");
}

/* -----------------------------
   THEME
----------------------------- */

function loadTheme() {
  const savedTheme =
    localStorage.getItem(STORAGE.theme) || "purple";

  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  localStorage.setItem(STORAGE.theme, theme);

  $$("[data-theme-choice]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.themeChoice === theme
    );
  });

  $$("[data-theme]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.theme === theme
    );
  });
}

function setupThemeButtons() {
  $$("[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.themeChoice);
      toast("Theme changed.");
    });
  });

  $$("[data-theme]").forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.theme);
      toast("Theme changed.");
    });
  });
}

/* -----------------------------
   LANGUAGE
----------------------------- */

function loadLanguage() {
  const language =
    localStorage.getItem(STORAGE.language) || "en";

  document.documentElement.lang = language;

  $$("[data-language]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.language === language
    );
  });
}

function setupLanguage() {
  $$("[data-language]").forEach(button => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;

      localStorage.setItem(STORAGE.language, language);
      document.documentElement.lang = language;

      $$("[data-language]").forEach(btn =>
        btn.classList.toggle(
          "active",
          btn.dataset.language === language
        )
      );

      applyBasicLanguage(language);

      toast(
        language === "hi"
          ? "हिंदी भाषा चुनी गई।"
          : "English language selected."
      );
    });
  });
}

function applyBasicLanguage(language) {
  if (language !== "hi") return;

  const replacements = {
    "Home": "होम",
    "Courses": "कोर्स",
    "DPP": "DPP",
    "Question Bank": "प्रश्न बैंक",
    "Quiz": "क्विज़",
    "Tests": "टेस्ट",
    "Notes": "नोट्स",
    "YouTube Learning": "YouTube लर्निंग",
    "Study Planner": "स्टडी प्लानर",
    "Bookmarks": "बुकमार्क",
    "Analytics": "एनालिटिक्स",
    "Khushi AI Tutor": "खुशी AI ट्यूटर",
    "Resources": "रिसोर्सेज",
    "Help & Support": "मदद और सपोर्ट",
    "Settings": "सेटिंग्स"
  };

  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (replacements[key]) {
      element.textContent = replacements[key];
    }
  });
}

/* -----------------------------
   PROGRESS
----------------------------- */

function updateProgressUI() {
  const overall = clamp(
    Number(progress.overall) || 0,
    0,
    100
  );

  $$("[data-overall-progress]").forEach(el => {
    el.textContent = `${overall}%`;
  });

  $("#overallProgress") &&
    ($("#overallProgress").textContent = `${overall}%`);

  $$("[data-progress-bar]").forEach(bar => {
    bar.style.width = `${overall}%`;
  });

  $$("[data-stat='bookmarks']").forEach(el => {
    el.textContent = bookmarks.length;
  });

  $$("[data-stat='quizzes']").forEach(el => {
    el.textContent = progress.quizzes || 0;
  });

  $$("[data-stat='tests']").forEach(el => {
    el.textContent = progress.tests || 0;
  });

  $$("[data-stat='streak']").forEach(el => {
    el.textContent = calculateStreak();
  });

  $$("[data-progress-key]").forEach(el => {
    const key = el.dataset.progressKey;

    if (progress[key] !== undefined) {
      el.textContent = `${progress[key]}%`;
    }
  });
}

function increaseProgress(amount = 1) {
  progress.overall = clamp(
    (Number(progress.overall) || 0) + amount,
    0,
    100
  );

  writeStorage(STORAGE.progress, progress);
  updateProgressUI();
}

/* -----------------------------
   ACTIVITY
----------------------------- */

function addActivity(title, type = "Study") {
  activity.unshift({
    id: Date.now(),
    title,
    type,
    date: new Date().toISOString()
  });

  activity = activity.slice(0, 20);

  writeStorage(STORAGE.activity, activity);

  renderActivity();
}

function renderActivity() {
  const containers = $$(
    "[data-activity], #recentActivity"
  );

  containers.forEach(container => {
    if (!activity.length) {
      container.innerHTML =
        '<div class="empty-state">No recent activity yet.</div>';
      return;
    }

    container.innerHTML = activity
      .slice(0, 6)
      .map(item => {
        const date = new Date(item.date);

        return `
          <div class="activity-item">
            <div>
              <strong>${escapeHTML(item.title)}</strong>
              <small>${escapeHTML(item.type)} • ${date.toLocaleDateString()}</small>
            </div>
          </div>
        `;
      })
      .join("");
  });
}

/* -----------------------------
   BOOKMARKS
----------------------------- */

function setupBookmarks() {
  $$("[data-bookmark]").forEach(button => {
    button.addEventListener("click", () => {
      const item = {
        id: button.dataset.bookmarkId || Date.now(),
        title:
          button.dataset.bookmarkTitle ||
          button.closest("[data-title]")?.dataset.title ||
          "Saved item",
        type: button.dataset.bookmarkType || "Resource"
      };

      toggleBookmark(item);
      button.classList.toggle(
        "active",
        isBookmarked(item.id)
      );
    });
  });
}

function toggleBookmark(item) {
  const exists = bookmarks.some(
    saved => String(saved.id) === String(item.id)
  );

  if (exists) {
    bookmarks = bookmarks.filter(
      saved => String(saved.id) !== String(item.id)
    );

    toast("Removed from bookmarks.");
  } else {
    bookmarks.push(item);
    toast("Added to bookmarks.", "success");
  }

  writeStorage(STORAGE.bookmarks, bookmarks);
  renderBookmarks();
  updateProgressUI();
}

function isBookmarked(id) {
  return bookmarks.some(
    item => String(item.id) === String(id)
  );
}

function renderBookmarks() {
  const containers = $$(
    "[data-bookmarks], #bookmarksList"
  );

  containers.forEach(container => {
    if (!bookmarks.length) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No bookmarks yet</h3>
          <p>Save questions, notes, lessons and videos here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarks
      .map(item => `
        <div class="bookmark-item">
          <div>
            <strong>${escapeHTML(item.title)}</strong>
            <small>${escapeHTML(item.type)}</small>
          </div>

          <button
            type="button"
            data-remove-bookmark="${escapeHTML(item.id)}"
          >
            Remove
          </button>
        </div>
      `)
      .join("");

    $$("[data-remove-bookmark]", container).forEach(button => {
      button.addEventListener("click", () => {
        bookmarks = bookmarks.filter(
          item =>
            String(item.id) !==
            String(button.dataset.removeBookmark)
        );

        writeStorage(STORAGE.bookmarks, bookmarks);
        renderBookmarks();
        updateProgressUI();
        toast("Bookmark removed.");
      });
    });
  });
}

/* -----------------------------
   QUIZ
----------------------------- */

function setupQuiz() {
  const startButtons = $$(
    "[data-start-quiz], #startQuiz, .start-quiz"
  );

  startButtons.forEach(button => {
    button.addEventListener("click", startQuiz);
  });

  const restartButtons = $$(
    "[data-retry-quiz], #retryQuiz"
  );

  restartButtons.forEach(button => {
    button.addEventListener("click", startQuiz);
  });
}

function startQuiz() {
  clearInterval(quizTimer);

  currentQuiz = [...quizQuestions]
    .sort(() => Math.random() - 0.5);

  currentQuizIndex = 0;
  quizScore = 0;
  quizSeconds = 600;

  renderQuizQuestion();
  startQuizTimer();

  showPage("quiz");

  addActivity("Started a quiz", "Quiz");
}

function renderQuizQuestion() {
  const container =
    $("#quizContainer") ||
    $("[data-quiz-container]");

  if (!container) return;

  if (currentQuizIndex >= currentQuiz.length) {
    finishQuiz();
    return;
  }

  const q = currentQuiz[currentQuizIndex];

  container.innerHTML = `
    <div class="quiz-header">
      <div>
        <strong>Question ${currentQuizIndex + 1}</strong>
        <span> / ${currentQuiz.length}</span>
      </div>

      <div id="quizTimer">
        ${formatTime(quizSeconds)}
      </div>
    </div>

    <div class="quiz-progress">
      <div style="width:${((currentQuizIndex + 1) / currentQuiz.length) * 100}%"></div>
    </div>

    <div class="question-card">
      <h3>${escapeHTML(q.question)}</h3>

      <div class="options">
        ${q.options
          .map(
            (option, index) => `
              <button
                type="button"
                class="quiz-option"
                data-option-index="${index}"
              >
                <span>${String.fromCharCode(65 + index)}</span>
                ${escapeHTML(option)}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  $$(".quiz-option", container).forEach(button => {
    button.addEventListener("click", () => {
      answerQuiz(Number(button.dataset.optionIndex));
    });
  });
}

function answerQuiz(index) {
  const question = currentQuiz[currentQuizIndex];

  $$(".quiz-option").forEach(button => {
    button.disabled = true;

    const selected =
      Number(button.dataset.optionIndex);

    if (selected === question.answer) {
      button.classList.add("correct");
    }

    if (
      selected === index &&
      selected !== question.answer
    ) {
      button.classList.add("incorrect");
    }
  });

  if (index === question.answer) {
    quizScore++;
  }

  const explanation = document.createElement("div");

  explanation.className = "explanation";

  explanation.innerHTML = `
    <strong>Explanation</strong>
    <p>${escapeHTML(question.explanation)}</p>
    <button type="button" id="nextQuizQuestion">
      ${currentQuizIndex + 1 === currentQuiz.length ? "Finish Quiz" : "Next Question"}
    </button>
  `;

  const container =
    $("#quizContainer") ||
    $("[data-quiz-container]");

  container?.appendChild(explanation);

  $("#nextQuizQuestion")?.addEventListener(
    "click",
    nextQuizQuestion
  );
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

function startQuizTimer() {
  const update = () => {
    const timer = $("#quizTimer");

    if (timer) {
      timer.textContent =
        formatTime(quizSeconds);
    }

    if (quizSeconds <= 0) {
      clearInterval(quizTimer);
      finishQuiz();
      return;
    }

    quizSeconds--;
  };

  update();

  quizTimer = setInterval(update, 1000);
}

function finishQuiz() {
  clearInterval(quizTimer);

  const total = currentQuiz.length || 1;
  const percentage = Math.round(
    (quizScore / total) * 100
  );

  progress.quizzes =
    (Number(progress.quizzes) || 0) + 1;

  writeStorage(STORAGE.progress, progress);

  quizHistory.unshift({
    date: new Date().toISOString(),
    score: quizScore,
    total,
    percentage
  });

  quizHistory = quizHistory.slice(0, 20);

  writeStorage(
    STORAGE.quizHistory,
    quizHistory
  );

  increaseProgress(2);
  addActivity(
    `Quiz completed — ${percentage}%`,
    "Quiz"
  );

  const container =
    $("#quizContainer") ||
    $("[data-quiz-container]");

  if (!container) return;

  container.innerHTML = `
    <div class="result-card">
      <div class="result-icon">✓</div>
      <h2>Quiz Complete</h2>
      <div class="result-score">${percentage}%</div>
      <p>You scored ${quizScore} out of ${total}.</p>

      <div class="result-actions">
        <button type="button" id="retryQuizButton">
          Retry Quiz
        </button>

        <button type="button" id="goAnalyticsButton">
          View Analytics
        </button>
      </div>
    </div>
  `;

  $("#retryQuizButton")?.addEventListener(
    "click",
    startQuiz
  );

  $("#goAnalyticsButton")?.addEventListener(
    "click",
    () => showPage("analytics")
  );

  renderQuizHistory();
  updateProgressUI();
}

function renderQuizHistory() {
  const containers = $$(
    "[data-quiz-history], #quizHistory"
  );

  containers.forEach(container => {
    if (!quizHistory.length) {
      container.innerHTML =
        '<div class="empty-state">No quiz history.</div>';
      return;
    }

    container.innerHTML = quizHistory
      .slice(0, 10)
      .map(item => `
        <div class="history-item">
          <strong>${item.percentage}%</strong>
          <span>${item.score}/${item.total}</span>
          <small>${new Date(item.date).toLocaleDateString()}</small>
        </div>
      `)
      .join("");
  });
}

/* -----------------------------
   TESTS
----------------------------- */

function setupTestButtons() {
  $$("[data-start-test]").forEach(button => {
    button.addEventListener("click", () => {
      startTest(
        button.dataset.startTest ||
        "Mock Test"
      );
    });
  });
}

function startTest(testName) {
  clearInterval(testTimer);

  testSeconds = 3600;

  showPage("tests");

  toast(`${testName} started.`);

  addActivity(
    `Started ${testName}`,
    "Test"
  );

  startTestTimer();
}

function startTestTimer() {
  const timerElements = $$(
    "[data-test-timer], #testTimer"
  );

  const update = () => {
    timerElements.forEach(el => {
      el.textContent = formatTime(testSeconds);
    });

    if (testSeconds <= 0) {
      clearInterval(testTimer);
      toast("Test time is over.");
      return;
    }

    testSeconds--;
  };

  update();

  testTimer = setInterval(update, 1000);
}

/* -----------------------------
   PLANNER
----------------------------- */

function setupPlanner() {
  const addButtons = $$(
    "[data-add-task], #addTask"
  );

  addButtons.forEach(button => {
    button.addEventListener("click", addPlannerTask);
  });

  $$("[data-task-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      addPlannerTask();
    });
  });

  renderPlanner();
}

function addPlannerTask() {
  const input =
    $("#plannerTask") ||
    $("[name='plannerTask']") ||
    $("[data-planner-input]");

  const title = input?.value?.trim();

  if (!title) {
    toast("Enter a task first.");
    return;
  }

  planner.push({
    id: Date.now(),
    title,
    course: profile.course || "NEET",
    done: false
  });

  writeStorage(STORAGE.planner, planner);

  input.value = "";

  renderPlanner();

  toast("Task added.", "success");
}

function renderPlanner() {
  const containers = $$(
    "[data-planner-list], #plannerTasks, #taskList"
  );

  containers.forEach(container => {
    if (!planner.length) {
      container.innerHTML =
        '<div class="empty-state">No tasks yet.</div>';
      return;
    }

    container.innerHTML = planner
      .map(task => `
        <div class="planner-task ${task.done ? "completed" : ""}">
          <label>
            <input
              type="checkbox"
              data-task-id="${task.id}"
              ${task.done ? "checked" : ""}
            >
            <span>${escapeHTML(task.title)}</span>
          </label>

          <small>${escapeHTML(task.course)}</small>
        </div>
      `)
      .join("");

    $$("[data-task-id]", container).forEach(input => {
      input.addEventListener("change", () => {
        const task = planner.find(
          item =>
            String(item.id) ===
            String(input.dataset.taskId)
        );

        if (!task) return;

        task.done = input.checked;

        writeStorage(STORAGE.planner, planner);
        renderPlanner();
        updatePlannerStats();
      });
    });
  });

  updatePlannerStats();
}

function updatePlannerStats() {
  const total = planner.length;

  const completed = planner.filter(
    task => task.done
  ).length;

  const percentage = total
    ? Math.round((completed / total) * 100)
    : 0;

  $$("[data-planner-progress]").forEach(el => {
    el.textContent = `${percentage}%`;
  });

  $$("[data-planner-completed]").forEach(el => {
    el.textContent = completed;
  });

  $$("[data-planner-total]").forEach(el => {
    el.textContent = total;
  });
}

/* -----------------------------
   AI — KHUSHI
----------------------------- */

function setupAI() {
  const form =
    $("#aiForm") ||
    $("[data-ai-form]");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      sendAIMessage();
    });
  }

  const input =
    $("#aiQuestion") ||
    $("#aiInput") ||
    $("[data-ai-input]");

  if (input) {
    input.addEventListener("keydown", event => {
      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        sendAIMessage();
      }
    });
  }

  $$("[data-ai-language]").forEach(button => {
    button.addEventListener("click", () => {
      $$("[data-ai-language]").forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");
    });
  });

  $$("[data-ai-suggestion]").forEach(button => {
    button.addEventListener("click", () => {
      const input =
        $("#aiQuestion") ||
        $("#aiInput") ||
        $("[data-ai-input]");

      if (!input) return;

      input.value =
        button.dataset.aiSuggestion ||
        button.textContent;

      input.focus();
    });
  });
}

async function sendAIMessage() {
  const input =
    $("#aiQuestion") ||
    $("#aiInput") ||
    $("[data-ai-input]");

  const question = input?.value?.trim();

  if (!question) {
    toast("Khushi se kuch poochho.");
    return;
  }

  const chat =
    $("#aiChat") ||
    $("#chatMessages") ||
    $("[data-ai-chat]");

  if (chat) {
    appendAIMessage(
      chat,
      question,
      "user"
    );

    appendAIMessage(
      chat,
      "Khushi soch rahi hai...",
      "assistant",
      "thinking-message"
    );
  }

  input.value = "";

  try {
    const response = await fetch(
      "/.netlify/functions/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          language:
            localStorage.getItem(
              STORAGE.language
            ) || "en",
          course: profile.course || "NEET"
        })
      }
    );

    const data = await response.json();

    $(".thinking-message")?.remove();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error ||
        "AI response failed."
      );
    }

    if (chat) {
      appendAIMessage(
        chat,
        data.answer,
        "assistant"
      );
    }

    addActivity(
      "Asked Khushi AI a doubt",
      "AI Tutor"
    );
  } catch (error) {
    console.error(error);

    $(".thinking-message")?.remove();

    if (chat) {
      appendAIMessage(
        chat,
        "Khushi अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर कोशिश करें।",
        "assistant"
      );
    }

    toast("AI connection error.", "error");
  }
}

function appendAIMessage(
  container,
  text,
  type,
  extraClass = ""
) {
  const message = document.createElement("div");

  message.className =
    `chat-message ${type} ${extraClass}`;

  message.innerHTML = `
    <div class="chat-bubble">
      ${escapeHTML(text).replaceAll("\n", "<br>")}
    </div>
  `;

  container.appendChild(message);

  container.scrollTop =
    container.scrollHeight;
}

/* -----------------------------
   YOUTUBE
----------------------------- */

function setupYouTube() {
  const form =
    $("#youtubeSearchForm") ||
    $("[data-youtube-form]");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      searchYouTube();
    });
  }

  const searchButton =
    $("#youtubeSearchButton") ||
    $("[data-youtube-search]");

  searchButton?.addEventListener(
    "click",
    searchYouTube
  );

  $$("[data-youtube-subject]").forEach(button => {
    button.addEventListener("click", () => {
      const input =
        $("#youtubeSearch") ||
        $("#youtubeQuery") ||
        $("[data-youtube-input]");

      if (input) {
        input.value =
          button.dataset.youtubeSubject ||
          button.textContent;

        searchYouTube();
      }
    });
  });
}

async function searchYouTube() {
  const input =
    $("#youtubeSearch") ||
    $("#youtubeQuery") ||
    $("[data-youtube-input]");

  const query = input?.value?.trim();

  if (!query) {
    toast("YouTube search लिखो.");
    return;
  }

  const container =
    $("#youtubeResults") ||
    $("[data-youtube-results]");

  if (container) {
    container.innerHTML = `
      <div class="loading-state">
        YouTube videos search हो रहे हैं...
      </div>
    `;
  }

  try {
    const url =
      `/.netlify/functions/youtube?q=${encodeURIComponent(query)}&maxResults=12`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error ||
        "YouTube search failed."
      );
    }

    renderYouTubeResults(
      data.items || [],
      container
    );
  } catch (error) {
    console.error(error);

    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>YouTube search unavailable</h3>
          <p>API connection check करें.</p>
        </div>
      `;
    }

    toast("YouTube API error.", "error");
  }
}

function renderYouTubeResults(items, container) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No videos found</h3>
        <p>Different search try करें.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = items
    .map(video => `
      <article class="video-card">
        <img
          src="${escapeHTML(video.thumbnail || "")}"
          alt="${escapeHTML(video.title || "YouTube video")}"
          loading="lazy"
        >

        <div class="video-card-body">
          <h3>${escapeHTML(video.title || "")}</h3>

          <p>
            ${escapeHTML(
              video.channelTitle ||
              video.channel ||
              "YouTube"
            )}
          </p>

          <button
            type="button"
            data-video-id="${escapeHTML(video.videoId || "")}"
          >
            Watch Video
          </button>
        </div>
      </article>
    `)
    .join("");

  $$("[data-video-id]", container).forEach(button => {
    button.addEventListener("click", () => {
      openYouTubeVideo(
        button.dataset.videoId
      );
    });
  });
}

function openYouTubeVideo(videoId) {
  if (!videoId) return;

  const viewer =
    $("#youtubeViewer") ||
    $("[data-youtube-viewer]");

  if (viewer) {
    viewer.innerHTML = `
      <div class="video-player-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}"
          title="YouTube video"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `;

    viewer.scrollIntoView({
      behavior: "smooth"
    });
  } else {
    window.open(
      `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}

/* -----------------------------
   SETTINGS
----------------------------- */

function setupSettings() {
  setupThemeButtons();
  setupLanguage();

  $$("[data-save-profile], #saveProfile").forEach(
    button => {
      button.addEventListener(
        "click",
        saveProfile
      );
    }
  );

  $$("[data-reset-data], #resetData").forEach(
    button => {
      button.addEventListener(
        "click",
        resetStudyData
      );
    }
  );

  $$("[data-notification-toggle]").forEach(
    checkbox => {
      checkbox.addEventListener("change", () => {
        const settings =
          readStorage(
            STORAGE.settings,
            {}
          );

        settings.notifications =
          checkbox.checked;

        writeStorage(
          STORAGE.settings,
          settings
        );

        toast("Notification setting saved.");
      });
    }
  );
}

function resetStudyData() {
  const confirmed = confirm(
    "क्या आप Study Wallah का saved progress reset करना चाहते हैं?"
  );

  if (!confirmed) return;

  Object.values(STORAGE).forEach(key => {
    localStorage.removeItem(key);
  });

  location.reload();
}

/* -----------------------------
   NOTIFICATIONS
----------------------------- */

function setupNotifications() {
  const button =
    $("#notificationButton") ||
    $("[data-notifications]");

  button?.addEventListener(
    "click",
    () => {
      showNotifications();
    }
  );
}

function showNotifications() {
  const notifications = [
    {
      title: "Welcome to Study Wallah",
      text: "NEET + JEE preparation शुरू करें."
    },
    {
      title: "Daily Practice",
      text: "आज का DPP complete करें."
    },
    {
      title: "Khushi AI",
      text: "अपने doubts Khushi से पूछें."
    }
  ];

  const modal =
    $("#notificationModal") ||
    $("#modal");

  if (!modal) {
    toast(
      notifications
        .map(item => item.title)
        .join(" • ")
    );

    return;
  }

  modal.classList.add("open");

  const body =
    $(".modal-body", modal) ||
    modal;

  body.innerHTML = `
    <h3>Notifications</h3>

    ${notifications
      .map(
        item => `
          <div class="notification-item">
            <strong>${escapeHTML(item.title)}</strong>
            <p>${escapeHTML(item.text)}</p>
          </div>
        `
      )
      .join("")}
  `;
}

/* -----------------------------
   MODAL
----------------------------- */

function setupModal() {
  $$("[data-modal-close], .modal-close").forEach(
    button => {
      button.addEventListener("click", () => {
        button.closest(".modal")?.classList.remove(
          "open"
        );
      });
    }
  );

  $$(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  });
}

/* -----------------------------
   STREAK
----------------------------- */

function calculateStreak() {
  if (!activity.length) return 0;

  const dates = [
    ...new Set(
      activity.map(item =>
        new Date(item.date)
          .toISOString()
          .slice(0, 10)
      )
    )
  ].sort().reverse();

  let streak = 0;
  let current = new Date();

  for (const dateString of dates) {
    const expected =
      current.toISOString().slice(0, 10);

    if (dateString === expected) {
      streak++;
      current.setDate(
        current.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
}

/* -----------------------------
   ANALYTICS
----------------------------- */

function renderAnalytics() {
  const values = {
    NEET: progress.NEET || 0,
    JEE: progress.JEE || 0,
    Physics: progress.Physics || 0,
    Chemistry: progress.Chemistry || 0,
    Biology: progress.Biology || 0,
    Mathematics: progress.Mathematics || 0
  };

  $$("[data-analytics-key]").forEach(el => {
    const key = el.dataset.analyticsKey;

    if (values[key] !== undefined) {
      el.textContent =
        `${values[key]}%`;
    }
  });

  $$("[data-analytics-bar]").forEach(bar => {
    const key = bar.dataset.analyticsBar;

    if (values[key] !== undefined) {
      bar.style.width =
        `${clamp(values[key], 0, 100)}%`;
    }
  });
}

/* -----------------------------
   DATE
----------------------------- */

function updateDate() {
  const now = new Date();

  $$("[data-current-date]").forEach(el => {
    el.textContent =
      now.toLocaleDateString(
        undefined,
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      );
  });
}

/* -----------------------------
   TIME FORMAT
----------------------------- */

function formatTime(totalSeconds) {
  const seconds =
    Math.max(0, Number(totalSeconds) || 0);

  const hours =
    Math.floor(seconds / 3600);

  const minutes =
    Math.floor((seconds % 3600) / 60);

  const remaining =
    seconds % 60;

  return [
    hours,
    minutes,
    remaining
  ]
    .map((value, index) => {
      if (index === 0 && hours === 0) {
        return "00";
      }

      return String(value).padStart(2, "0");
    })
    .join(":");
}

/* -----------------------------
   RENDER ALL
----------------------------- */

function renderAll() {
  updateProfileUI();
  updateProgressUI();
  renderActivity();
  renderBookmarks();
  renderPlanner();
  renderQuizHistory();
  renderAnalytics();
  setupNotifications();
  setupModal();

  const language =
    localStorage.getItem(
      STORAGE.language
    ) || "en";

  if (language === "hi") {
    applyBasicLanguage("hi");
  }
}

/* -----------------------------
   ONLINE / OFFLINE
----------------------------- */

window.addEventListener("online", () => {
  toast("Internet connection restored.", "success");
});

window.addEventListener("offline", () => {
  toast(
    "You are offline. Saved features are still available."
  );
});

/* -----------------------------
   GLOBAL HELPERS
----------------------------- */

window.StudyWallah = {
  showPage,
  toast,
  startQuiz,
  sendAIMessage,
  searchYouTube,
  toggleBookmark,
  addActivity,
  increaseProgress,
  saveProfile,
  applyTheme
};
