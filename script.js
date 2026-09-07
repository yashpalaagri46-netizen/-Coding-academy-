/* =========================================================
   CODING ACADEMY
   Main Application JavaScript
   Creator: Yashpal Aagri
   ========================================================= */

"use strict";

/* =========================================================
   1. APP CONFIG
   ========================================================= */

const APP_CONFIG = {
    creator: "Yashpal Aagri",

    /*
      Social links:
      अभी जिन URLs का पता है वही डालें।
      बाकी URLs बाद में इसी section में आसानी से डाल सकते हो.
    */
    socialLinks: {
        youtube: "",
        whatsapp: "",
        facebook: "",
        instagram: "",
        telegram: "https://t.me/Yashpal_aagri"
    },

    /*
      IMPORTANT:
      API keys यहाँ कभी मत डालना.
      AI और YouTube API को secure backend/serverless endpoint
      के through connect किया जाएगा.
    */
    aiEndpoint: "",
    youtubeEndpoint: ""
};

const STORAGE_KEY = "codingAcademyState_v1";


/* =========================================================
   2. COURSES
   ========================================================= */

const courses = [
    {
        id: "html",
        name: "HTML",
        icon: "🌐",
        level: "Beginner",
        lessons: 24,
        description: "Learn the structure of modern websites.",
        progress: 0
    },
    {
        id: "css",
        name: "CSS",
        icon: "🎨",
        level: "Beginner",
        lessons: 28,
        description: "Design beautiful responsive websites.",
        progress: 0
    },
    {
        id: "javascript",
        name: "JavaScript",
        icon: "⚡",
        level: "Intermediate",
        lessons: 42,
        description: "Make websites interactive and dynamic.",
        progress: 0
    },
    {
        id: "python",
        name: "Python",
        icon: "🐍",
        level: "Beginner",
        lessons: 36,
        description: "Start programming with Python.",
        progress: 0
    },
    {
        id: "c",
        name: "C",
        icon: "©️",
        level: "Beginner",
        lessons: 30,
        description: "Build strong programming fundamentals.",
        progress: 0
    },
    {
        id: "cpp",
        name: "C++",
        icon: "🚀",
        level: "Intermediate",
        lessons: 38,
        description: "Learn object-oriented programming.",
        progress: 0
    },
    {
        id: "java",
        name: "Java",
        icon: "☕",
        level: "Intermediate",
        lessons: 40,
        description: "Learn Java programming from basics.",
        progress: 0
    },
    {
        id: "react",
        name: "React",
        icon: "⚛️",
        level: "Advanced",
        lessons: 32,
        description: "Build modern React applications.",
        progress: 0
    },
    {
        id: "node",
        name: "Node.js",
        icon: "🟢",
        level: "Advanced",
        lessons: 30,
        description: "Create backend applications with Node.js.",
        progress: 0
    }
];


/* =========================================================
   3. PRACTICE QUESTION BANK
   ========================================================= */

const practiceQuestions = [
    {
        id: "p1",
        course: "HTML",
        topic: "HTML Basics",
        difficulty: "Easy",
        question: "Which HTML element is used for the main heading?",
        options: ["<h1>", "<heading>", "<head>", "<title>"],
        answer: 0,
        explanation: "The h1 element represents the most important heading on a page."
    },
    {
        id: "p2",
        course: "HTML",
        topic: "Links",
        difficulty: "Easy",
        question: "Which HTML element creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
        explanation: "The anchor element creates hyperlinks."
    },
    {
        id: "p3",
        course: "CSS",
        topic: "Selectors",
        difficulty: "Easy",
        question: "Which selector targets an element with class='card'?",
        options: [".card", "#card", "card", "*card"],
        answer: 0,
        explanation: "A dot is used to select a CSS class."
    },
    {
        id: "p4",
        course: "CSS",
        topic: "Colors",
        difficulty: "Easy",
        question: "Which CSS property changes text color?",
        options: ["background", "font-color", "color", "text-color"],
        answer: 2,
        explanation: "The color property controls the foreground/text color."
    },
    {
        id: "p5",
        course: "JavaScript",
        topic: "Variables",
        difficulty: "Easy",
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "let", "fixed", "define"],
        answer: 1,
        explanation: "let creates a block-scoped variable that can later be reassigned."
    },
    {
        id: "p6",
        course: "JavaScript",
        topic: "Functions",
        difficulty: "Easy",
        question: "Which syntax creates a JavaScript function?",
        options: [
            "function myFunction() {}",
            "create myFunction() {}",
            "def myFunction() {}",
            "func myFunction() {}"
        ],
        answer: 0,
        explanation: "JavaScript uses the function keyword for traditional function declarations."
    },
    {
        id: "p7",
        course: "JavaScript",
        topic: "Arrays",
        difficulty: "Medium",
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: 0,
        explanation: "push() adds one or more elements to the end of an array."
    },
    {
        id: "p8",
        course: "Python",
        topic: "Basics",
        difficulty: "Easy",
        question: "Which function displays text in Python?",
        options: ["echo()", "print()", "write()", "display()"],
        answer: 1,
        explanation: "Python uses print() to display output."
    },
    {
        id: "p9",
        course: "Python",
        topic: "Variables",
        difficulty: "Easy",
        question: "Which is a valid Python variable assignment?",
        options: ["x = 10", "int x = 10", "var x := 10", "let x = 10"],
        answer: 0,
        explanation: "Python variables can be assigned directly with the = operator."
    },
    {
        id: "p10",
        course: "C++",
        topic: "Basics",
        difficulty: "Medium",
        question: "Which symbol is used to end a C++ statement?",
        options: [":", ";", ".", ","],
        answer: 1,
        explanation: "Most C++ statements end with a semicolon."
    },
    {
        id: "p11",
        course: "React",
        topic: "Components",
        difficulty: "Medium",
        question: "What is a React component primarily used for?",
        options: [
            "Building reusable UI",
            "Managing databases directly",
            "Replacing HTML completely",
            "Creating operating systems"
        ],
        answer: 0,
        explanation: "React components allow UI to be split into reusable pieces."
    },
    {
        id: "p12",
        course: "Node.js",
        topic: "Basics",
        difficulty: "Medium",
        question: "Node.js allows JavaScript to run primarily where?",
        options: ["Only inside CSS", "On the server/runtime", "Only in SQL", "Only in Photoshop"],
        answer: 1,
        explanation: "Node.js provides a JavaScript runtime outside the browser."
    }
];


/* =========================================================
   4. QUIZ QUESTIONS
   ========================================================= */

const quizQuestions = [
    {
        id: "q1",
        question: "Which technology is mainly responsible for webpage structure?",
        options: ["HTML", "CSS", "JavaScript", "Node.js"],
        answer: 0,
        explanation: "HTML defines the structure and content of a webpage."
    },
    {
        id: "q2",
        question: "Which technology is mainly used for styling webpages?",
        options: ["Python", "CSS", "C++", "SQL"],
        answer: 1,
        explanation: "CSS controls presentation and styling."
    },
    {
        id: "q3",
        question: "Which language is commonly used to add browser interactivity?",
        options: ["JavaScript", "HTML", "CSS", "Markdown"],
        answer: 0,
        explanation: "JavaScript provides client-side interactivity."
    },
    {
        id: "q4",
        question: "Which language is known for indentation-based code blocks?",
        options: ["C", "Python", "Java", "HTML"],
        answer: 1,
        explanation: "Python uses indentation to define code blocks."
    },
    {
        id: "q5",
        question: "React is primarily used for building what?",
        options: [
            "User interfaces",
            "Hard drives",
            "Operating system kernels",
            "Computer processors"
        ],
        answer: 0,
        explanation: "React is a library for building user interfaces."
    }
];


/* =========================================================
   5. RESOURCES
   ========================================================= */

const resources = [
    {
        id: "r1",
        title: "MDN Web Docs",
        category: "Web Development",
        description: "Reference and guides for HTML, CSS and JavaScript.",
        url: "https://developer.mozilla.org/"
    },
    {
        id: "r2",
        title: "W3Schools",
        category: "Learning",
        description: "Tutorials and examples for many programming technologies.",
        url: "https://www.w3schools.com/"
    },
    {
        id: "r3",
        title: "freeCodeCamp",
        category: "Practice",
        description: "Free coding lessons and practice projects.",
        url: "https://www.freecodecamp.org/"
    },
    {
        id: "r4",
        title: "Python Documentation",
        category: "Python",
        description: "Official Python documentation.",
        url: "https://docs.python.org/3/"
    },
    {
        id: "r5",
        title: "GitHub",
        category: "Development",
        description: "Code hosting and collaboration platform.",
        url: "https://github.com/"
    },
    {
        id: "r6",
        title: "React Documentation",
        category: "React",
        description: "Official React documentation and learning resources.",
        url: "https://react.dev/"
    },
    {
        id: "r7",
        title: "Node.js",
        category: "Backend",
        description: "Official Node.js website and documentation.",
        url: "https://nodejs.org/"
    },
    {
        id: "r8",
        title: "JavaScript.info",
        category: "JavaScript",
        description: "Modern JavaScript tutorial.",
        url: "https://javascript.info/"
    }
];


/* =========================================================
   6. DEFAULT STATE
   ========================================================= */

const defaultState = {
    name: "Yashpal Aagri",
    photo: "",
    language: "en",
    appearance: "dark",
    theme: "purple",

    courseProgress: {},

    bookmarks: [],

    notes: [],

    tasks: [],

    activity: [],

    quizHistory: [],

    testHistory: [],

    attempted: 0,
    correct: 0,

    streak: 0,
    lastActiveDate: "",

    notifications: [
        {
            title: "Welcome to Coding Academy",
            text: "Your coding journey starts here.",
            time: Date.now()
        }
    ]
};


/* =========================================================
   7. LOAD / SAVE STATE
   ========================================================= */

let state = loadState();

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return structuredClone(defaultState);
        }

        const parsed = JSON.parse(saved);

        return {
            ...structuredClone(defaultState),
            ...parsed,
            courseProgress: parsed.courseProgress || {},
            bookmarks: parsed.bookmarks || [],
            notes: parsed.notes || [],
            tasks: parsed.tasks || [],
            activity: parsed.activity || [],
            quizHistory: parsed.quizHistory || [],
            testHistory: parsed.testHistory || [],
            notifications: parsed.notifications || []
        };
    } catch (error) {
        console.warn("Could not load saved state.", error);
        return structuredClone(defaultState);
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn("Could not save state.", error);
    }
}


/* =========================================================
   8. HELPERS
   ========================================================= */

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return [...document.querySelectorAll(selector)];
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

function uid(prefix = "id") {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function formatDate(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString();
}

function getCourseProgress(courseId) {
    return Math.min(100, Math.max(0, Number(state.courseProgress[courseId] || 0)));
}

function setCourseProgress(courseId, value) {
    state.courseProgress[courseId] = Math.min(
        100,
        Math.max(0, Number(value))
    );
    saveState();
}

function overallProgress() {
    if (!courses.length) return 0;

    const total = courses.reduce(
        (sum, course) => sum + getCourseProgress(course.id),
        0
    );

    return Math.round(total / courses.length);
}

function recordActivity(title, description = "") {
    const today = todayKey();

    if (state.lastActiveDate !== today) {
        if (state.lastActiveDate) {
            const previous = new Date(state.lastActiveDate);
            const current = new Date(today);

            const diff = Math.round(
                (current - previous) / 86400000
            );

            if (diff === 1) {
                state.streak += 1;
            } else if (diff > 1) {
                state.streak = 1;
            }
        } else {
            state.streak = 1;
        }

        state.lastActiveDate = today;
    }

    state.activity.unshift({
        id: uid("activity"),
        title,
        description,
        time: Date.now()
    });

    state.activity = state.activity.slice(0, 20);

    saveState();
}

function addNotification(title, text) {
    state.notifications.unshift({
        title,
        text,
        time: Date.now()
    });

    state.notifications = state.notifications.slice(0, 15);
    saveState();
}


/* =========================================================
   9. TOAST
   ========================================================= */

function toast(message) {
    const box = $("#toast");
    const text = $("#toastMessage");

    if (!box || !text) return;

    text.textContent = message;
    box.classList.add("show");

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
        box.classList.remove("show");
    }, 2800);
}


/* =========================================================
   10. NAVIGATION
   ========================================================= */

function showSection(sectionName) {
    const target = $(`#section-${sectionName}`);

    if (!target) return;

    $$(".page-section").forEach(section => {
        section.classList.remove("active");
    });

    target.classList.add("active");

    $$(".nav-item").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.section === sectionName
        );
    });

    history.replaceState(
        null,
        "",
        `#${sectionName}`
    );

    closeSidebar();

    if (sectionName === "home") {
        renderHome();
    }

    if (sectionName === "courses") {
        renderCourses();
    }

    if (sectionName === "practice") {
        renderPractice();
    }

    if (sectionName === "notes") {
        renderNotes();
    }

    if (sectionName === "bookmarks") {
        renderBookmarks();
    }

    if (sectionName === "resources") {
        renderResources();
    }

    if (sectionName === "planner") {
        renderTasks();
    }

    if (sectionName === "analytics") {
        renderAnalytics();
    }

    if (sectionName === "support") {
        renderSocialLinks();
    }
}

function setupNavigation() {
    $$(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            showSection(item.dataset.section);
        });
    });

    $$("[data-section-link]").forEach(button => {
        button.addEventListener("click", () => {
            showSection(button.dataset.sectionLink);
        });
    });
}


/* =========================================================
   11. MOBILE SIDEBAR
   ========================================================= */

function openSidebar() {
    $("#sidebar")?.classList.add("open");
    $("#sidebarOverlay")?.classList.add("show");
}

function closeSidebar() {
    $("#sidebar")?.classList.remove("open");
    $("#sidebarOverlay")?.classList.remove("show");
}

function setupSidebar() {
    $("#mobileMenu")?.addEventListener("click", openSidebar);
    $("#sidebarOverlay")?.addEventListener("click", closeSidebar);
}


/* =========================================================
   12. HOME
   ========================================================= */

function renderHome() {
    const homeCourses = $("#homeCourses");

    if (homeCourses) {
        homeCourses.innerHTML = courses
            .slice(0, 4)
            .map(course => courseCardHTML(course))
            .join("");
    }

    const statCourses = $("#statCourses");
    const statProgress = $("#statProgress");
    const statQuestions = $("#statQuestions");
    const statStreak = $("#statStreak");

    if (statCourses) {
        statCourses.textContent = courses.filter(
            c => getCourseProgress(c.id) >= 100
        ).length;
    }

    if (statProgress) {
        statProgress.textContent = `${overallProgress()}%`;
    }

    if (statQuestions) {
        statQuestions.textContent = state.attempted;
    }

    if (statStreak) {
        statStreak.textContent = state.streak;
    }

    const progressText = $("#homeProgress");
    const progressBar = $("#homeProgressBar");

    if (progressText) {
        progressText.textContent = `${overallProgress()}%`;
    }

    if (progressBar) {
        progressBar.style.width = `${overallProgress()}%`;
    }

    renderRecentActivity();
}

function renderRecentActivity() {
    const box = $("#recentActivity");

    if (!box) return;

    if (!state.activity.length) {
        box.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>No activity yet</h3>
                <p>Start a course or practice questions.</p>
            </div>
        `;
        return;
    }

    box.innerHTML = state.activity
        .slice(0, 6)
        .map(item => `
            <div class="activity-item">
                <div class="activity-icon">⚡</div>
                <div>
                    <strong>${escapeHTML(item.title)}</strong>
                    <p>${escapeHTML(item.description || "")}</p>
                    <small>${formatDate(item.time)}</small>
                </div>
            </div>
        `)
        .join("");
}


/* =========================================================
   13. COURSE CARDS
   ========================================================= */

function courseCardHTML(course) {
    const progress = getCourseProgress(course.id);

    return `
        <article class="course-card">
            <div class="course-card-top">
                <div class="course-icon">${course.icon}</div>

                <button
                    class="icon-btn course-bookmark"
                    data-course-bookmark="${course.id}"
                    title="Bookmark"
                >
                    ${isBookmarked("course", course.id) ? "★" : "☆"}
                </button>
            </div>

            <div class="course-card-body">
                <span class="course-level">${escapeHTML(course.level)}</span>

                <h3>${escapeHTML(course.name)}</h3>

                <p>${escapeHTML(course.description)}</p>

                <div class="course-meta">
                    <span>📘 ${course.lessons} Lessons</span>
                    <span>${progress}%</span>
                </div>

                <div class="progress-track">
                    <div
                        class="progress-fill"
                        style="width:${progress}%"
                    ></div>
                </div>

                <button
                    class="primary-btn full-btn"
                    data-continue-course="${course.id}"
                >
                    ${progress > 0 ? "Continue Learning" : "Start Course"}
                </button>
            </div>
        </article>
    `;
}

function renderCourses() {
    const grid = $("#coursesGrid");
    const filter = $("#courseFilter");

    if (!grid) return;

    const selected = filter?.value || "all";

    const filtered = selected === "all"
        ? courses
        : courses.filter(
            course => course.level.toLowerCase() === selected
        );

    grid.innerHTML = filtered
        .map(course => courseCardHTML(course))
        .join("");
}

function setupCourseEvents() {
    document.addEventListener("click", event => {
        const continueButton =
            event.target.closest("[data-continue-course]");

        if (continueButton) {
            const id = continueButton.dataset.continueCourse;
            const course = courses.find(c => c.id === id);

            if (!course) return;

            const current = getCourseProgress(id);

            setCourseProgress(
                id,
                current === 100 ? 100 : current + 10
            );

            recordActivity(
                `Studied ${course.name}`,
                "Course progress updated."
            );

            toast(
                current >= 90
                    ? `${course.name} completed!`
                    : `${course.name} progress updated.`
            );

            renderHome();
            renderCourses();
            renderAnalytics();
        }

        const bookmarkButton =
            event.target.closest("[data-course-bookmark]");

        if (bookmarkButton) {
            toggleBookmark(
                "course",
                bookmarkButton.dataset.courseBookmark
            );

            renderCourses();
            renderHome();
            renderBookmarks();
        }
    });
}


/* =========================================================
   14. COURSE FILTER
   ========================================================= */

function setupCourseFilter() {
    $("#courseFilter")?.addEventListener(
        "change",
        renderCourses
    );
}


/* =========================================================
   15. BOOKMARK SYSTEM
   ========================================================= */

function isBookmarked(type, id) {
    return state.bookmarks.some(
        item => item.type === type && item.id === id
    );
}

function toggleBookmark(type, id) {
    const index = state.bookmarks.findIndex(
        item => item.type === type && item.id === id
    );

    if (index >= 0) {
        state.bookmarks.splice(index, 1);
        toast("Removed from bookmarks.");
    } else {
        let item = {
            type,
            id,
            title: "Saved Item",
            description: ""
        };

        if (type === "course") {
            const course = courses.find(c => c.id === id);

            if (course) {
                item.title = course.name;
                item.description = course.description;
            }
        }

        if (type === "question") {
            const question = practiceQuestions.find(q => q.id === id);

            if (question) {
                item.title = question.question;
                item.description = `${question.course} • ${question.topic}`;
            }
        }

        if (type === "resource") {
            const resource = resources.find(r => r.id === id);

            if (resource) {
                item.title = resource.title;
                item.description = resource.description;
            }
        }

        state.bookmarks.push(item);
        toast("Added to bookmarks.");
    }

    saveState();
}


/* =========================================================
   16. BOOKMARKS PAGE
   ========================================================= */

function renderBookmarks() {
    const container = $("#bookmarksContainer");

    if (!container) return;

    if (!state.bookmarks.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔖</div>
                <h3>No bookmarks yet</h3>
                <p>Save courses, questions and resources here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = state.bookmarks
        .map(item => `
            <div class="bookmark-item">
                <div class="bookmark-icon">
                    ${item.type === "course" ? "📚" :
                      item.type === "question" ? "❓" : "🔗"}
                </div>

                <div class="bookmark-content">
                    <span class="bookmark-type">
                        ${escapeHTML(item.type)}
                    </span>

                    <h3>${escapeHTML(item.title)}</h3>

                    <p>${escapeHTML(item.description || "")}</p>

                    <button
                        class="secondary-btn"
                        data-open-bookmark-type="${item.type}"
                        data-open-bookmark-id="${item.id}"
                    >
                        Open
                    </button>

                    <button
                        class="icon-btn"
                        data-remove-bookmark-type="${item.type}"
                        data-remove-bookmark-id="${item.id}"
                    >
                        ✕
                    </button>
                </div>
            </div>
        `)
        .join("");
}

function setupBookmarkEvents() {
    document.addEventListener("click", event => {
        const remove =
            event.target.closest("[data-remove-bookmark-type]");

        if (remove) {
            toggleBookmark(
                remove.dataset.removeBookmarkType,
                remove.dataset.removeBookmarkId
            );

            renderBookmarks();
            renderCourses();
            renderHome();
        }

        const open =
            event.target.closest("[data-open-bookmark-type]");

        if (open) {
            const type = open.dataset.openBookmarkType;
            const id = open.dataset.openBookmarkId;

            if (type === "course") {
                showSection("courses");
            } else if (type === "question") {
                showSection("practice");
            } else if (type === "resource") {
                showSection("resources");
                openResource(id);
            }
        }
    });
}


/* =========================================================
   17. CODE EDITOR
   ========================================================= */

const defaultEditorCode = {
    html: `<div class="demo-card">
  <h1>Hello Coding Academy</h1>
  <p>Edit the code and press Run.</p>
  <button onclick="showMessage()">Click Me</button>
</div>`,

    css: `.demo-card {
  font-family: Arial;
  padding: 30px;
  text-align: center;
}

.demo-card h1 {
  color: #7c3aed;
}

.demo-card button {
  padding: 10px 18px;
  cursor: pointer;
}`,

    js: `function showMessage() {
  alert("Hello from Coding Academy!");
}`
};

function getEditorValue(id, fallback = "") {
    return document.getElementById(id)?.value ?? fallback;
}

function runEditor() {
    const html = getEditorValue("htmlEditor", "");
    const css = getEditorValue("cssEditor", "");
    const js = getEditorValue("jsEditor", "");

    const output = $("#codeOutput");

    if (!output) return;

    const safeJS = js.replace(
        /<\/script>/gi,
        "<\\/script>"
    );

    output.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
${css}
</style>
</head>
<body>
${html}

<script>
try {
${safeJS}
} catch(error) {
document.body.insertAdjacentHTML(
"beforeend",
"<pre style='color:red'>" +
error.message.replace(/</g, "&lt;") +
"</pre>"
);
}
<\/script>

</body>
</html>
`;

    recordActivity(
        "Used Code Editor",
        "Ran HTML/CSS/JavaScript code."
    );

    toast("Code executed.");
}

function resetEditor() {
    $("#htmlEditor").value = defaultEditorCode.html;
    $("#cssEditor").value = defaultEditorCode.css;
    $("#jsEditor").value = defaultEditorCode.js;

    const output = $("#codeOutput");

    if (output) {
        output.srcdoc = "";
    }

    toast("Editor reset.");
}

function clearOutput() {
    const output = $("#codeOutput");

    if (output) {
        output.srcdoc = "";
    }
}

function loadExercise(type) {
    const exercises = {
        html: {
            html: `<h1>My First Webpage</h1>
<p>Write a short introduction about yourself.</p>`,
            css: `body {
  font-family: Arial;
  padding: 30px;
}`,
            js: ``
        },

        css: {
            html: `<div class="box">CSS Practice</div>`,
            css: `.box {
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}`,
            js: ``
        },

        js: {
            html: `<button onclick="changeText()">
  Change Text
</button>

<p id="message">Original text</p>`,
            css: `button {
  padding: 10px 20px;
}`,
            js: `function changeText() {
  document.getElementById("message").textContent =
    "JavaScript is working!";
}`
        }
    };

    const exercise = exercises[type];

    if (!exercise) return;

    $("#htmlEditor").value = exercise.html;
    $("#cssEditor").value = exercise.css;
    $("#jsEditor").value = exercise.js;

    toast(`${type.toUpperCase()} exercise loaded.`);
}

function setupEditor() {
    $("#htmlEditor").value = defaultEditorCode.html;
    $("#cssEditor").value = defaultEditorCode.css;
    $("#jsEditor").value = defaultEditorCode.js;

    $("#editorRun")?.addEventListener(
        "click",
        runEditor
    );

    $("#editorReset")?.addEventListener(
        "click",
        resetEditor
    );

    $("#clearOutput")?.addEventListener(
        "click",
        clearOutput
    );

    $$(".editor-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            $$(".editor-tab").forEach(t =>
                t.classList.remove("active")
            );

            tab.classList.add("active");

            $$(".editor-panel").forEach(panel =>
                panel.classList.remove("active")
            );

            const target = $(
                `#editor-${tab.dataset.editor}`
            );

            target?.classList.add("active");
        });
    });
}


/* =========================================================
   18. PRACTICE
   ========================================================= */

function renderPractice() {
    const container = $("#practiceContainer");
    const filter = $("#practiceFilter");

    if (!container) return;

    const selected = filter?.value || "all";

    const questions = selected === "all"
        ? practiceQuestions
        : practiceQuestions.filter(
            q => q.course.toLowerCase() === selected.toLowerCase()
        );

    container.innerHTML = questions
        .map((q, index) => `
            <div class="practice-card" data-practice-id="${q.id}">
                <div class="practice-top">
                    <span>${escapeHTML(q.course)}</span>
                    <span>${escapeHTML(q.difficulty)}</span>
                </div>

                <h3>${index + 1}. ${escapeHTML(q.question)}</h3>

                <div class="practice-options">
                    ${q.options.map((option, i) => `
                        <button
                            class="practice-option"
                            data-question-id="${q.id}"
                            data-option-index="${i}"
                        >
                            ${String.fromCharCode(65 + i)}.
                            ${escapeHTML(option)}
                        </button>
                    `).join("")}
                </div>

                <div class="practice-explanation" hidden>
                    ${escapeHTML(q.explanation)}
                </div>

                <div class="practice-actions">
                    <button
                        class="secondary-btn"
                        data-question-bookmark="${q.id}"
                    >
                        ${isBookmarked("question", q.id)
                            ? "★ Saved"
                            : "☆ Bookmark"}
                    </button>
                </div>
            </div>
        `)
        .join("");
}

function setupPractice() {
    $("#practiceFilter")?.addEventListener(
        "change",
        renderPractice
    );

    document.addEventListener("click", event => {
        const option =
            event.target.closest(".practice-option");

        if (option) {
            const question = practiceQuestions.find(
                q => q.id === option.dataset.questionId
            );

            if (!question) return;

            const card = option.closest(".practice-card");
            const buttons = card.querySelectorAll(
                ".practice-option"
            );

            if (
                [...buttons].some(
                    button => button.disabled
                )
            ) {
                return;
            }

            const selected =
                Number(option.dataset.optionIndex);

            buttons.forEach(button => {
                button.disabled = true;

                const index =
                    Number(button.dataset.optionIndex);

                if (index === question.answer) {
                    button.classList.add("correct");
                }

                if (
                    index === selected &&
                    selected !== question.answer
                ) {
                    button.classList.add("wrong");
                }
            });

            const explanation =
                card.querySelector(".practice-explanation");

            if (explanation) {
                explanation.hidden = false;
            }

            state.attempted += 1;

            if (selected === question.answer) {
                state.correct += 1;
                toast("Correct answer!");
            } else {
                toast("Keep practicing!");
            }

            recordActivity(
                "Practice Question",
                `${question.course} • ${question.topic}`
            );

            saveState();
            renderHome();
            renderAnalytics();
        }

        const bookmark =
            event.target.closest("[data-question-bookmark]");

        if (bookmark) {
            toggleBookmark(
                "question",
                bookmark.dataset.questionBookmark
            );

            renderPractice();
            renderBookmarks();
        }
    });
}


/* =========================================================
   19. QUIZ
   ========================================================= */

let quizState = {
    questions: [],
    current: 0,
    answers: [],
    timer: null,
    seconds: 300
};

function startQuiz() {
    clearInterval(quizState.timer);

    quizState = {
        questions: [...quizQuestions],
        current: 0,
        answers: [],
        timer: null,
        seconds: 300
    };

    $("#quizStart")?.classList.add("hidden");
    $("#quizResult")?.classList.add("hidden");
    $("#quizArea")?.classList.remove("hidden");

    quizState.timer = setInterval(() => {
        quizState.seconds -= 1;

        updateQuizTimer();

        if (quizState.seconds <= 0) {
            finishQuiz();
        }
    }, 1000);

    renderQuizQuestion();
}

function updateQuizTimer() {
    const timer = $("#quizTimer");

    if (!timer) return;

    const minutes =
        Math.floor(quizState.seconds / 60);

    const seconds =
        quizState.seconds % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderQuizQuestion() {
    const area = $("#quizArea");

    if (!area) return;

    const question =
        quizState.questions[quizState.current];

    if (!question) {
        finishQuiz();
        return;
    }

    area.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-progress">
                Question ${quizState.current + 1}
                / ${quizState.questions.length}
            </div>

            <h2>${escapeHTML(question.question)}</h2>

            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button
                        class="quiz-option"
                        data-quiz-option="${index}"
                    >
                        ${String.fromCharCode(65 + index)}.
                        ${escapeHTML(option)}
                    </button>
                `).join("")}
            </div>

            <button
                class="primary-btn"
                id="quizNextButton"
            >
                ${
                    quizState.current ===
                    quizState.questions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"
                }
            </button>
        </div>
    `;

    const nextButton =
        $("#quizNextButton");

    let selectedAnswer = null;

    $$(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {
            $$(".quiz-option").forEach(
                b => b.classList.remove("selected")
            );

            button.classList.add("selected");

            selectedAnswer =
                Number(button.dataset.quizOption);
        });
    });

    nextButton?.addEventListener("click", () => {
        if (selectedAnswer === null) {
            toast("Please select an answer.");
            return;
        }

        quizState.answers[quizState.current] =
            selectedAnswer;

        quizState.current += 1;

        if (
            quizState.current >=
            quizState.questions.length
        ) {
            finishQuiz();
        } else {
            renderQuizQuestion();
        }
    });
}

function finishQuiz() {
    clearInterval(quizState.timer);

    let score = 0;

    quizState.questions.forEach((question, index) => {
        if (
            quizState.answers[index] ===
            question.answer
        ) {
            score++;
        }
    });

    state.attempted += quizState.questions.length;
    state.correct += score;

    const percentage = Math.round(
        (score / quizState.questions.length) * 100
    );

    state.quizHistory.unshift({
        id: uid("quiz"),
        date: Date.now(),
        score,
        total: quizState.questions.length,
        percentage
    });

    state.quizHistory =
        state.quizHistory.slice(0, 20);

    recordActivity(
        "Completed Quiz",
        `${score}/${quizState.questions.length} correct`
    );

    saveState();

    $("#quizArea")?.classList.add("hidden");
    $("#quizStart")?.classList.remove("hidden");

    const result = $("#quizResult");

    if (result) {
        result.classList.remove("hidden");

        result.innerHTML = `
            <div class="result-card">
                <div class="result-icon">🏆</div>

                <h2>Quiz Completed</h2>

                <div class="result-score">
                    ${score}/${quizState.questions.length}
                </div>

                <p>${percentage}% Score</p>

                <button
                    class="primary-btn"
                    id="retryQuiz"
                >
                    Retry Quiz
                </button>
            </div>
        `;

        $("#retryQuiz")?.addEventListener(
            "click",
            startQuiz
        );
    }

    renderHome();
    renderAnalytics();

    toast(`Quiz completed: ${percentage}%`);
}

function setupQuiz() {
    $("#startQuiz")?.addEventListener(
        "click",
        startQuiz
    );
}


/* =========================================================
   20. TESTS
   ========================================================= */

let testState = {
    questions: [],
    type: "",
    current: 0,
    answers: [],
    timer: null,
    seconds: 600
};

function startTest(type) {
    clearInterval(testState.timer);

    testState = {
        questions: [...practiceQuestions],
        type,
        current: 0,
        answers: [],
        timer: null,
        seconds: 600
    };

    $("#testArea")?.classList.remove("hidden");

    testState.timer = setInterval(() => {
        testState.seconds--;

        if (testState.seconds <= 0) {
            finishTest();
        }
    }, 1000);

    renderTestQuestion();
}

function renderTestQuestion() {
    const area = $("#testArea");

    if (!area) return;

    const question =
        testState.questions[testState.current];

    if (!question) {
        finishTest();
        return;
    }

    area.innerHTML = `
        <div class="test-card">
            <div class="test-header">
                <span>
                    ${escapeHTML(testState.type.toUpperCase())} TEST
                </span>

                <span>
                    ${testState.current + 1}
                    /
                    ${testState.questions.length}
                </span>
            </div>

            <h2>${escapeHTML(question.question)}</h2>

            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button
                        class="quiz-option"
                        data-test-option="${index}"
                    >
                        ${String.fromCharCode(65 + index)}.
                        ${escapeHTML(option)}
                    </button>
                `).join("")}
            </div>

            <button
                class="primary-btn"
                id="testNextButton"
            >
                ${
                    testState.current ===
                    testState.questions.length - 1
                        ? "Submit Test"
                        : "Next"
                }
            </button>
        </div>
    `;

    let selected = null;

    $$(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {
            $$(".quiz-option").forEach(
                b => b.classList.remove("selected")
            );

            button.classList.add("selected");

            selected =
                Number(button.dataset.testOption);
        });
    });

    $("#testNextButton")?.addEventListener(
        "click",
        () => {
            if (selected === null) {
                toast("Select an answer first.");
                return;
            }

            testState.answers[testState.current] =
                selected;

            testState.current++;

            if (
                testState.current >=
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
    clearInterval(testState.timer);

    let score = 0;

    testState.questions.forEach((question, index) => {
        if (
            testState.answers[index] ===
            question.answer
        ) {
            score++;
        }
    });

    const total = testState.questions.length;
    const percentage = Math.round(
        score / total * 100
    );

    state.attempted += total;
    state.correct += score;

    state.testHistory.unshift({
        id: uid("test"),
        type: testState.type,
        score,
        total,
        percentage,
        date: Date.now()
    });

    state.testHistory =
        state.testHistory.slice(0, 20);

    recordActivity(
        `${testState.type} Test`,
        `${score}/${total} correct`
    );

    saveState();

    const area = $("#testArea");

    if (area) {
        area.innerHTML = `
            <div class="result-card">
                <div class="result-icon">📊</div>

                <h2>Test Completed</h2>

                <div class="result-score">
                    ${score}/${total}
                </div>

                <p>${percentage}%</p>

                <button
                    class="primary-btn"
                    onclick="startTest('${escapeHTML(testState.type)}')"
                >
                    Retry Test
                </button>
            </div>
        `;
    }

    renderHome();
    renderAnalytics();

    toast(`Test completed: ${percentage}%`);
}


/* =========================================================
   21. NOTES
   ========================================================= */

let activeNoteId = null;

function renderNotes() {
    const list = $("#notesList");
    const search = $("#notesSearch")?.value
        ?.toLowerCase() || "";

    if (!list) return;

    const filtered = state.notes.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.content.toLowerCase().includes(search)
    );

    if (!filtered.length) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h3>No notes found</h3>
                <p>Create your first study note.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = filtered
        .map(note => `
            <button
                class="note-list-item ${
                    note.id === activeNoteId ? "active" : ""
                }"
                data-note-id="${note.id}"
            >
                <strong>${escapeHTML(note.title)}</strong>
                <span>
                    ${escapeHTML(
                        note.content.slice(0, 70)
                    )}
                </span>
            </button>
        `)
        .join("");
}

function openNote(id) {
    const note = state.notes.find(
        n => n.id === id
    );

    if (!note) return;

    activeNoteId = id;

    $("#noteTitle").value = note.title;
    $("#noteContent").value = note.content;

    renderNotes();
}

function newNote() {
    const note = {
        id: uid("note"),
        title: "New Note",
        content: "",
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    state.notes.unshift(note);
    activeNoteId = note.id;

    saveState();

    openNote(note.id);
    toast("New note created.");
}

function saveNote() {
    if (!activeNoteId) {
        newNote();
        return;
    }

    const note = state.notes.find(
        n => n.id === activeNoteId
    );

    if (!note) return;

    note.title =
        $("#noteTitle").value.trim() ||
        "Untitled Note";

    note.content =
        $("#noteContent").value;

    note.updatedAt = Date.now();

    saveState();

    renderNotes();

    toast("Note saved.");
}

function deleteNote() {
    if (!activeNoteId) return;

    const index = state.notes.findIndex(
        n => n.id === activeNoteId
    );

    if (index === -1) return;

    state.notes.splice(index, 1);
    activeNoteId = null;

    $("#noteTitle").value = "";
    $("#noteContent").value = "";

    saveState();
    renderNotes();

    toast("Note deleted.");
}

function setupNotes() {
    $("#newNoteBtn")?.addEventListener(
        "click",
        newNote
    );

    $("#saveNoteBtn")?.addEventListener(
        "click",
        saveNote
    );

    $("#deleteNoteBtn")?.addEventListener(
        "click",
        deleteNote
    );

    $("#notesSearch")?.addEventListener(
        "input",
        renderNotes
    );

    document.addEventListener("click", event => {
        const item =
            event.target.closest("[data-note-id]");

        if (item) {
            openNote(item.dataset.noteId);
        }
    });
}


/* =========================================================
   22. RESOURCES
   ========================================================= */

let currentResourceUrl = "";

function renderResources() {
    const grid = $("#resourceGrid");

    if (!grid) return;

    grid.innerHTML = resources
        .map(resource => `
            <article class="resource-card">
                <div class="resource-icon">🔗</div>

                <span>${escapeHTML(resource.category)}</span>

                <h3>${escapeHTML(resource.title)}</h3>

                <p>${escapeHTML(resource.description)}</p>

                <div class="resource-actions">
                    <button
                        class="primary-btn"
                        data-open-resource="${resource.id}"
                    >
                        Open
                    </button>

                    <button
                        class="secondary-btn"
                        data-resource-bookmark="${resource.id}"
                    >
                        ${isBookmarked("resource", resource.id)
                            ? "★"
                            : "☆"}
                    </button>
                </div>
            </article>
        `)
        .join("");
}

function openResource(id) {
    const resource = resources.find(
        r => r.id === id
    );

    if (!resource) return;

    currentResourceUrl = resource.url;

    const viewer = $("#resourceViewer");

    if (viewer) {
        viewer.src = resource.url;
    }

    $("#openResourceExternal")?.classList.remove(
        "hidden"
    );

    toast(`${resource.title} opened.`);
}

function setupResources() {
    document.addEventListener("click", event => {
        const open =
            event.target.closest("[data-open-resource]");

        if (open) {
            openResource(open.dataset.openResource);
        }

        const bookmark =
            event.target.closest("[data-resource-bookmark]");

        if (bookmark) {
            toggleBookmark(
                "resource",
                bookmark.dataset.resourceBookmark
            );

            renderResources();
            renderBookmarks();
        }
    });

    $("#openResourceExternal")?.addEventListener(
        "click",
        () => {
            if (!currentResourceUrl) return;

            window.open(
                currentResourceUrl,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );
}


/* =========================================================
   23. YOUTUBE / VIDEO LEARNING
   ========================================================= */

function searchYouTube() {
    const input = $("#videoSearch");

    const query =
        input?.value.trim() ||
        "coding tutorial";

    const url =
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

    toast("YouTube search opened.");
}

function renderVideoSuggestions() {
    const container = $("#videoResults");

    if (!container) return;

    const topics = [
        "HTML Full Course",
        "CSS Full Course",
        "JavaScript Full Course",
        "Python Full Course",
        "C++ Programming",
        "React JS Tutorial",
        "Node.js Tutorial"
    ];

    container.innerHTML = topics
        .map(topic => `
            <div class="video-card">
                <div class="video-thumbnail">
                    ▶
                </div>

                <div class="video-info">
                    <h3>${escapeHTML(topic)}</h3>

                    <p>
                        Search this topic on YouTube.
                    </p>

                    <button
                        class="primary-btn"
                        data-youtube-topic="${escapeHTML(topic)}"
                    >
                        Watch / Search
                    </button>
                </div>
            </div>
        `)
        .join("");
}

function setupVideos() {
    $("#youtubeSearchBtn")?.addEventListener(
        "click",
        searchYouTube
    );

    $("#videoSearchAction")?.addEventListener(
        "click",
        searchYouTube
    );

    document.addEventListener("click", event => {
        const button =
            event.target.closest("[data-youtube-topic]");

        if (!button) return;

        const topic =
            button.dataset.youtubeTopic;

        window.open(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`,
            "_blank",
            "noopener,noreferrer"
        );
    });

    renderVideoSuggestions();
}


/* =========================================================
   24. STUDY PLANNER
   ========================================================= */

function renderTasks() {
    const container = $("#tasksContainer");
    const count = $("#taskCount");

    if (!container) return;

    const completed =
        state.tasks.filter(task => task.completed).length;

    if (count) {
        count.textContent =
            `${completed}/${state.tasks.length} completed`;
    }

    if (!state.tasks.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📅</div>
                <h3>No tasks yet</h3>
                <p>Add a daily study task.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = state.tasks
        .map(task => `
            <div class="task-item ${
                task.completed ? "completed" : ""
            }">
                <label class="task-check">
                    <input
                        type="checkbox"
                        data-task-toggle="${task.id}"
                        ${task.completed ? "checked" : ""}
                    >

                    <span></span>
                </label>

                <div class="task-content">
                    <strong>${escapeHTML(task.title)}</strong>
                    <small>
                        Priority:
                        ${escapeHTML(task.priority)}
                    </small>
                </div>

                <button
                    class="icon-btn"
                    data-task-delete="${task.id}"
                >
                    🗑️
                </button>
            </div>
        `)
        .join("");
}

function addTask() {
    const input = $("#taskInput");

    if (!input) return;

    const title = input.value.trim();

    if (!title) {
        toast("Enter a task first.");
        return;
    }

    state.tasks.push({
        id: uid("task"),
        title,
        priority:
            $("#taskPriority")?.value || "medium",
        completed: false,
        createdAt: Date.now()
    });

    input.value = "";

    saveState();
    renderTasks();

    recordActivity(
        "Added Study Task",
        title
    );

    toast("Task added.");
}

function setupPlanner() {
    $("#addTaskBtn")?.addEventListener(
        "click",
        addTask
    );

    $("#taskInput")?.addEventListener(
        "keydown",
        event => {
            if (event.key === "Enter") {
                addTask();
            }
        }
    );

    document.addEventListener("change", event => {
        const checkbox =
            event.target.closest("[data-task-toggle]");

        if (!checkbox) return;

        const task = state.tasks.find(
            t => t.id === checkbox.dataset.taskToggle
        );

        if (!task) return;

        task.completed = checkbox.checked;

        saveState();
        renderTasks();

        if (task.completed) {
            recordActivity(
                "Completed Study Task",
                task.title
            );
        }
    });

    document.addEventListener("click", event => {
        const deleteButton =
            event.target.closest("[data-task-delete]");

        if (!deleteButton) return;

        state.tasks = state.tasks.filter(
            task =>
                task.id !==
                deleteButton.dataset.taskDelete
        );

        saveState();
        renderTasks();

        toast("Task removed.");
    });
}


/* =========================================================
   25. AI CODING TUTOR
   ========================================================= */

function addAIMessage(role, message) {
    const container = $("#aiMessages");

    if (!container) return;

    const div = document.createElement("div");

    div.className =
        `ai-message ${role}`;

    div.innerHTML = `
        <div class="ai-message-bubble">
            ${escapeHTML(message).replaceAll(
                "\n",
                "<br>"
            )}
        </div>
    `;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function localAIResponse(question) {
    const q = question.toLowerCase();

    if (
        q.includes("html") ||
        q.includes("हtml")
    ) {
        return "HTML webpage की structure बनाने के लिए इस्तेमाल होता है। पहले HTML elements जैसे headings, paragraphs, links, images और forms सीखो।";
    }

    if (q.includes("css")) {
        return "CSS webpage की styling के लिए है। पहले selectors, colors, spacing, box model, Flexbox और Grid सीखो।";
    }

    if (
        q.includes("javascript") ||
        q.includes("js")
    ) {
        return "JavaScript webpage को interactive बनाता है। Variables, functions, arrays, objects और DOM से शुरुआत करो।";
    }

    if (q.includes("python")) {
        return "Python सीखते समय variables, conditions, loops, functions, lists, dictionaries और modules से शुरुआत करना अच्छा रहेगा।";
    }

    if (
        q.includes("error") ||
        q.includes("bug") ||
        q.includes("error")
    ) {
        return "Error solve करने के लिए पहले पूरा error message पढ़ो, फिर जिस line पर error आया है उसे check करो। Variable names, brackets, spelling और data type भी verify करो।";
    }

    if (
        q.includes("react")
    ) {
        return "React में components, props, state, events और hooks महत्वपूर्ण concepts हैं। पहले reusable components समझो।";
    }

    return "मैं तुम्हें Coding Academy में coding concepts समझने में मदद कर सकता हूँ। अपना सवाल, code या error message भेजो।";
}

async function askAI() {
    const input = $("#aiQuestion");

    if (!input) return;

    const question = input.value.trim();

    if (!question) {
        toast("अपना सवाल लिखो.");
        return;
    }

    addAIMessage("user", question);

    input.value = "";

    const loading = "Thinking...";

    addAIMessage("assistant", loading);

    const container = $("#aiMessages");

    try {
        if (APP_CONFIG.aiEndpoint) {
            const response = await fetch(
                APP_CONFIG.aiEndpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "AI service unavailable"
                );
            }

            const data = await response.json();

            container.lastElementChild
                ?.remove();

            addAIMessage(
                "assistant",
                data.answer ||
                data.message ||
                "No response received."
            );
        } else {
            container.lastElementChild
                ?.remove();

            addAIMessage(
                "assistant",
                localAIResponse(question)
            );
        }

        recordActivity(
            "Used AI Coding Tutor",
            "Asked a coding question."
        );
    } catch (error) {
        container.lastElementChild
            ?.remove();

        addAIMessage(
            "assistant",
            "AI service अभी available नहीं है। Backend AI endpoint configure करने के बाद real AI responses मिलेंगे."
        );
    }
}

function setupAI() {
    $("#askAiBtn")?.addEventListener(
        "click",
        askAI
    );

    $("#aiQuestion")?.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {
                event.preventDefault();
                askAI();
            }
        }
    );

    $$(".ai-tools button[data-ai-question]")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    $("#aiQuestion").value =
                        button.dataset.aiQuestion;

                    $("#aiQuestion").focus();
                }
            );
        });
}


/* =========================================================
   26. ANALYTICS
   ========================================================= */

function renderAnalytics() {
    const progress =
        $("#analyticsProgress");

    const attempted =
        $("#analyticsAttempted");

    const correct =
        $("#analyticsCorrect");

    const quizzes =
        $("#analyticsQuizzes");

    if (progress) {
        progress.textContent =
            `${overallProgress()}%`;
    }

    if (attempted) {
        attempted.textContent =
            state.attempted;
    }

    if (correct) {
        correct.textContent =
            state.correct;
    }

    if (quizzes) {
        quizzes.textContent =
            state.quizHistory.length;
    }

    renderCourseAnalytics();
    renderQuizHistory();
}

function renderCourseAnalytics() {
    const container =
        $("#courseAnalytics");

    if (!container) return;

    container.innerHTML = courses
        .map(course => {
            const progress =
                getCourseProgress(course.id);

            return `
                <div class="analytics-course">
                    <div>
                        <strong>
                            ${course.icon}
                            ${escapeHTML(course.name)}
                        </strong>

                        <span>${progress}%</span>
                    </div>

                    <div class="progress-track">
                        <div
                            class="progress-fill"
                            style="width:${progress}%"
                        ></div>
                    </div>
                </div>
            `;
        })
        .join("");
}

function renderQuizHistory() {
    const container =
        $("#quizHistory");

    if (!container) return;

    if (!state.quizHistory.length) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No quiz attempts yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML =
        state.quizHistory
            .slice(0, 10)
            .map(item => `
                <div class="history-item">
                    <div>
                        <strong>Quiz</strong>
                        <small>
                            ${formatDate(item.date)}
                        </small>
                    </div>

                    <strong>
                        ${item.score}/${item.total}
                        (${item.percentage}%)
                    </strong>
                </div>
            `)
            .join("");
}


/* =========================================================
   27. GLOBAL SEARCH
   ========================================================= */

function performGlobalSearch(query) {
    const box = $("#searchResults");

    if (!box) return;

    const term = query.trim().toLowerCase();

    if (!term) {
        box.classList.remove("show");
        box.innerHTML = "";
        return;
    }

    const courseResults = courses
        .filter(course =>
            course.name.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term)
        )
        .map(course => ({
            type: "course",
            id: course.id,
            title: course.name,
            description: course.description
        }));

    const questionResults = practiceQuestions
        .filter(q =>
            q.question.toLowerCase().includes(term) ||
            q.course.toLowerCase().includes(term) ||
            q.topic.toLowerCase().includes(term)
        )
        .map(q => ({
            type: "question",
            id: q.id,
            title: q.question,
            description: q.course
        }));

    const resourceResults = resources
        .filter(r =>
            r.title.toLowerCase().includes(term) ||
            r.category.toLowerCase().includes(term)
        )
        .map(r => ({
            type: "resource",
            id: r.id,
            title: r.title,
            description: r.description
        }));

    const results = [
        ...courseResults,
        ...questionResults,
        ...resourceResults
    ].slice(0, 10);

    if (!results.length) {
        box.innerHTML = `
            <div class="search-empty">
                No results found.
            </div>
        `;

        box.classList.add("show");
        return;
    }

    box.innerHTML = results
        .map(result => `
            <button
                class="search-result"
                data-search-type="${result.type}"
                data-search-id="${result.id}"
            >
                <strong>
                    ${escapeHTML(result.title)}
                </strong>

                <small>
                    ${escapeHTML(result.description)}
                </small>
            </button>
        `)
        .join("");

    box.classList.add("show");
}

function setupSearch() {
    const search =
        $("#globalSearch");

    search?.addEventListener(
        "input",
        () => {
            performGlobalSearch(
                search.value
            );
        }
    );

    document.addEventListener("click", event => {
        const result =
            event.target.closest(".search-result");

        if (result) {
            const type =
                result.dataset.searchType;

            const id =
                result.dataset.searchId;

            $("#searchResults")
                ?.classList.remove("show");

            if (type === "course") {
                showSection("courses");
            }

            if (type === "question") {
                showSection("practice");
            }

            if (type === "resource") {
                showSection("resources");
                openResource(id);
            }
        }

        if (
            !event.target.closest(".top-search") &&
            !event.target.closest("#searchResults")
        ) {
            $("#searchResults")
                ?.classList.remove("show");
        }
    });
}


/* =========================================================
   28. PROFILE
   ========================================================= */

function updateAvatars() {
    const avatars = [
        $("#topAvatar"),
        $("#sidebarAvatar"),
        $("#modalAvatar")
    ].filter(Boolean);

    avatars.forEach(avatar => {
        if (state.photo) {
            avatar.innerHTML = `
                <img
                    src="${state.photo}"
                    alt="Profile"
                >
            `;
            avatar.classList.add("has-photo");
        } else {
            avatar.innerHTML =
                escapeHTML(
                    (state.name || "Y")
                        .charAt(0)
                        .toUpperCase()
                );

            avatar.classList.remove("has-photo");
        }
    });

    $$(".profile-name").forEach(element => {
        element.textContent = state.name;
    });
}

function openProfile() {
    $("#profileModal")
        ?.classList.add("show");

    $("#profileNameInput").value =
        state.name;

    updateAvatars();
}

function closeModal(id) {
    $(`#${id}`)?.classList.remove("show");
}

function saveProfile() {
    const input =
        $("#profileNameInput");

    const name =
        input?.value.trim();

    if (name) {
        state.name = name;
    }

    saveState();
    updateAvatars();

    closeModal("profileModal");

    toast("Profile saved.");
}

function removeProfilePhoto() {
    state.photo = "";

    saveState();
    updateAvatars();

    toast("Profile photo removed.");
}

function setupProfile() {
    $("#profileBtn")?.addEventListener(
        "click",
        openProfile
    );

    $("#profilePhotoInput")?.addEventListener(
        "change",
        event => {
            const file =
                event.target.files?.[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                toast("Please select an image.");
                return;
            }

            const reader =
                new FileReader();

            reader.onload = () => {
                state.photo =
                    reader.result;

                saveState();
                updateAvatars();

                toast(
                    "Profile photo updated."
                );
            };

            reader.readAsDataURL(file);
        }
    );

    $("#removePhotoBtn")?.addEventListener(
        "click",
        removeProfilePhoto
    );

    $("#saveProfileBtn")?.addEventListener(
        "click",
        saveProfile
    );
}


/* =========================================================
   29. SOCIAL LINKS / SUPPORT
   ========================================================= */

function renderSocialLinks() {
    const container =
        $("#socialLinks");

    if (!container) return;

    const social = [
        {
            key: "youtube",
            label: "YouTube",
            icon: "▶️"
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            icon: "💬"
        },
        {
            key: "facebook",
            label: "Facebook",
            icon: "f"
        },
        {
            key: "instagram",
            label: "Instagram",
            icon: "📷"
        },
        {
            key: "telegram",
            label: "Telegram Support",
            icon: "✈️"
        }
    ];

    container.innerHTML = social
        .map(item => {
            const url =
                APP_CONFIG.socialLinks[item.key];

            if (url) {
                return `
                    <a
                        class="social-btn"
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>${item.icon}</span>
                        ${item.label}
                    </a>
                `;
            }

            return `
                <button
                    class="social-btn disabled"
                    disabled
                    title="Add URL later in script.js"
                >
                    <span>${item.icon}</span>
                    ${item.label}
                    <small>Add link later</small>
                </button>
            `;
        })
        .join("");
}


/* =========================================================
   30. FEEDBACK / SUPPORT
   ========================================================= */

let feedbackType = "feedback";

function openFeedback(type) {
    feedbackType = type;

    const title =
        $("#feedbackTitle");

    if (title) {
        title.textContent =
            type === "problem"
                ? "Report a Problem"
                : "Send Feedback";
    }

    $("#feedbackModal")
        ?.classList.add("show");
}

function sendFeedback() {
    const text =
        $("#feedbackText")?.value.trim();

    if (!text) {
        toast("Please write your message.");
        return;
    }

    const feedback =
        JSON.parse(
            localStorage.getItem(
                "codingAcademyFeedback"
            ) || "[]"
        );

    feedback.push({
        id: uid("feedback"),
        type: feedbackType,
        text,
        date: Date.now()
    });

    localStorage.setItem(
        "codingAcademyFeedback",
        JSON.stringify(feedback)
    );

    $("#feedbackText").value = "";

    closeModal("feedbackModal");

    toast(
        "Thank you for your feedback!"
    );
}

function setupSupport() {
    $("#sendFeedbackBtn")
        ?.addEventListener(
            "click",
            sendFeedback
        );

    renderSocialLinks();
}


/* =========================================================
   31. NOTIFICATIONS
   ========================================================= */

function showNotifications() {
    if (!state.notifications.length) {
        toast("No new notifications.");
        return;
    }

    const latest =
        state.notifications[0];

    toast(
        `${latest.title}: ${latest.text}`
    );
}

function setupNotifications() {
    $("#notificationBtn")
        ?.addEventListener(
            "click",
            showNotifications
        );
}


/* =========================================================
   32. LANGUAGE
   ========================================================= */

const translations = {
    en: {
        searchPlaceholder:
            "Search courses, lessons, questions...",
        welcome:
            "Welcome back",
        courses:
            "Courses",
        practice:
            "Practice",
        quiz:
            "Quiz",
        tests:
            "Tests",
        notes:
            "Notes",
        bookmarks:
            "Bookmarks",
        videos:
            "Videos",
        resources:
            "Resources",
        planner:
            "Study Planner",
        ai:
            "AI Coding Tutor",
        analytics:
            "Analytics",
        support:
            "Support & Help",
        settings:
            "Settings"
    },

    hi: {
        searchPlaceholder:
            "Courses, lessons और questions खोजें...",
        welcome:
            "वापसी पर स्वागत है",
        courses:
            "कोर्स",
        practice:
            "अभ्यास",
        quiz:
            "क्विज़",
        tests:
            "टेस्ट",
        notes:
            "नोट्स",
        bookmarks:
            "बुकमार्क",
        videos:
            "वीडियो",
        resources:
            "रिसोर्स",
        planner:
            "स्टडी प्लानर",
        ai:
            "AI Coding Tutor",
        analytics:
            "एनालिटिक्स",
        support:
            "सपोर्ट और हेल्प",
        settings:
            "सेटिंग्स"
    }
};

function applyLanguage() {
    const lang =
        translations[state.language] ||
        translations.en;

    const search =
        $("#globalSearch");

    if (search) {
        search.placeholder =
            lang.searchPlaceholder;
    }

    $$("[data-i18n]").forEach(element => {
        const key =
            element.dataset.i18n;

        if (lang[key]) {
            element.textContent =
                lang[key];
        }
    });

    const languageSelect =
        $("#languageSelect");

    if (languageSelect) {
        languageSelect.value =
            state.language;
    }
}


/* =========================================================
   33. THEMES
   ========================================================= */

const themes = {
    purple: {
        primary: "#7c3aed",
        secondary: "#a855f7",
        accent: "#c084fc"
    },

    violet: {
        primary: "#6d28d9",
        secondary: "#8b5cf6",
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
        accent: "#22d3ee"
    },

    pink: {
        primary: "#db2777",
        secondary: "#ec4899",
        accent: "#f472b6"
    },

    rose: {
        primary: "#e11d48",
        secondary: "#f43f5e",
        accent: "#fb7185"
    },

    red: {
        primary: "#dc2626",
        secondary: "#ef4444",
        accent: "#f87171"
    },

    orange: {
        primary: "#ea580c",
        secondary: "#f97316",
        accent: "#fb923c"
    },

    gold: {
        primary: "#ca8a04",
        secondary: "#eab308",
        accent: "#facc15"
    },

    indigo: {
        primary: "#4f46e5",
        secondary: "#6366f1",
        accent: "#818cf8"
    },

    slate: {
        primary: "#475569",
        secondary: "#64748b",
        accent: "#94a3b8"
    },

    amethyst: {
        primary: "#9333ea",
        secondary: "#a855f7",
        accent: "#d8b4fe"
    }
};

function applyTheme() {
    const theme =
        themes[state.theme] ||
        themes.purple;

    const root =
        document.documentElement;

    root.style.setProperty(
        "--primary",
        theme.primary
    );

    root.style.setProperty(
        "--secondary",
        theme.secondary
    );

    root.style.setProperty(
        "--accent",
        theme.accent
    );

    document.body.dataset.theme =
        state.theme;

    document.body.dataset.appearance =
        state.appearance;
}

function renderThemeGrid() {
    const grid =
        $("#themeGrid");

    if (!grid) return;

    grid.innerHTML =
        Object.keys(themes)
            .map(theme => `
                <button
                    class="theme-option ${
                        state.theme === theme
                            ? "active"
                            : ""
                    }"
                    data-theme-option="${theme}"
                >
                    <span
                        style="
                            background:
                            ${themes[theme].primary}
                        "
                    ></span>

                    ${theme}
                </button>
            `)
            .join("");
}

function setupSettings() {
    $("#appearanceSelect")
        ?.addEventListener(
            "change",
            event => {
                state.appearance =
                    event.target.value;

                saveState();
                applyTheme();
            }
        );

    $("#languageSelect")
        ?.addEventListener(
            "change",
            event => {
                state.language =
                    event.target.value;

                saveState();
                applyLanguage();

                toast(
                    state.language === "hi"
                        ? "भाषा बदल दी गई."
                        : "Language changed."
                );
            }
        );

    document.addEventListener("click", event => {
        const themeButton =
            event.target.closest(
                "[data-theme-option]"
            );

        if (!themeButton) return;

        state.theme =
            themeButton.dataset.themeOption;

        saveState();
        applyTheme();
        renderThemeGrid();

        toast("Theme changed.");
    });

    $("#resetDataBtn")
        ?.addEventListener(
            "click",
            resetAllData
        );

    renderThemeGrid();
}

function resetAllData() {
    const confirmed =
        window.confirm(
            "Are you sure you want to reset your Coding Academy data?"
        );

    if (!confirmed) return;

    localStorage.removeItem(
        STORAGE_KEY
    );

    state =
        structuredClone(defaultState);

    activeNoteId = null;

    applyTheme();
    applyLanguage();
    updateAvatars();

    renderHome();
    renderCourses();
    renderPractice();
    renderNotes();
    renderBookmarks();
    renderResources();
    renderTasks();
    renderAnalytics();
    renderSocialLinks();

    toast("All local data has been reset.");
}


/* =========================================================
   34. MODAL CLOSE
   ========================================================= */

function setupModals() {
    $$(".modal").forEach(modal => {
        modal.addEventListener(
            "click",
            event => {
                if (
                    event.target === modal
                ) {
                    modal.classList.remove(
                        "show"
                    );
                }
            }
        );
    });

    $$("[data-close-modal]")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    closeModal(
                        button.dataset.closeModal
                    );
                }
            );
        });

    document.addEventListener(
        "keydown",
        event => {
            if (event.key === "Escape") {
                $$(".modal.show")
                    .forEach(modal =>
                        modal.classList.remove(
                            "show"
                        )
                    );
            }
        }
    );
}


/* =========================================================
   35. APPEARANCE SELECT INITIALIZATION
   ========================================================= */

function syncSettingsUI() {
    if ($("#appearanceSelect")) {
        $("#appearanceSelect").value =
            state.appearance;
    }

    if ($("#languageSelect")) {
        $("#languageSelect").value =
            state.language;
    }
}


/* =========================================================
   36. CREATOR NAME
   ========================================================= */

function updateCreatorName() {
    $$("[data-creator]").forEach(element => {
        element.textContent =
            APP_CONFIG.creator;
    });

    $$(".creator-name").forEach(element => {
        element.textContent =
            APP_CONFIG.creator;
    });
}


/* =========================================================
   37. HASH NAVIGATION
   ========================================================= */

function setupHashNavigation() {
    const hash =
        location.hash.replace("#", "");

    if (
        hash &&
        $(`#section-${hash}`)
    ) {
        showSection(hash);
    } else {
        showSection("home");
    }

    window.addEventListener(
        "hashchange",
        () => {
            const current =
                location.hash.replace("#", "");

            if (
                current &&
                $(`#section-${current}`)
            ) {
                showSection(current);
            }
        }
    );
}


/* =========================================================
   38. GLOBAL BUTTON FUNCTIONS
   ========================================================= */

window.showSection = showSection;
window.loadExercise = loadExercise;
window.startTest = startTest;
window.openFeedback = openFeedback;
window.openProfile = openProfile;
window.closeModal = closeModal;


/* =========================================================
   39. INITIALIZE APP
   ========================================================= */

function initApp() {
    console.log(
        "Coding Academy initialized."
    );

    applyTheme();
    applyLanguage();

    syncSettingsUI();

    updateAvatars();
    updateCreatorName();

    setupNavigation();
    setupSidebar();
    setupCourseEvents();
    setupCourseFilter();

    setupBookmarkEvents();

    setupEditor();

    setupPractice();

    setupQuiz();

    setupNotes();

    setupResources();

    setupVideos();

    setupPlanner();

    setupAI();

    setupSearch();

    setupProfile();

    setupSupport();

    setupNotifications();

    setupSettings();

    setupModals();

    setupHashNavigation();

    renderHome();
    renderCourses();
    renderPractice();
    renderNotes();
    renderBookmarks();
    renderResources();
    renderTasks();
    renderAnalytics();
    renderSocialLinks();
    renderThemeGrid();

    addNotification(
        "Coding Academy Ready",
        "Your learning dashboard is ready."
    );
}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initApp
    );
} else {
    initApp();
      }
