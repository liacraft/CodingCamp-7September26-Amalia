const $ = s => document.querySelector(s);
const KEY = {
  tasks: "lifeDashboardTasks",
  links: "lifeDashboardLinks",
  theme: "lifeDashboardTheme",
  name: "lifeDashboardName"
};

function updateDateTime() {
  const n = new Date();
  $("#clock").textContent = n.toLocaleTimeString("en-US", {
    hour12: false
  });
  $("#date").textContent = n.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const h = n.getHours();
  let g = h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
  const name = localStorage.getItem(KEY.name);
  $("#greeting").textContent = name ? `${g}, ${name}` : g
}
updateDateTime();
setInterval(updateDateTime, 1000);

/* Challenge: Light / Dark mode */

// ============================================================
// SECTION 3 — LOCAL STORAGE (theme reader)
// ============================================================

/**
 * loadTheme()
 * Reads the persisted theme from localStorage.
 * Returns "dark" or "light"; falls back to "light" on any error or
 * if the key is absent.
 * NOTE: Applying the theme to the DOM is done by applyTheme() (Section 4).
 */
function loadTheme() {
  try {
    const stored = localStorage.getItem(KEY.theme);
    return stored === "dark" ? "dark" : "light";
  } catch (e) {
    return "light";
  }
}

// Apply theme on load (DOM mutation stays here until applyTheme is wired up)
(function () {
  const theme = loadTheme();
  document.body.classList.toggle("dark", theme === "dark");
  $("#themeToggle").textContent = theme === "dark" ? "☀" : "☾";
})();
$("#themeToggle").onclick = () => {
  const dark = !document.body.classList.contains("dark");
  document.body.classList.toggle("dark", dark);
  localStorage.setItem(KEY.theme, dark ? "dark" : "light");
  $("#themeToggle").textContent = dark ? "☀" : "☾"
};

/* Challenge: Custom name */
if (!localStorage.getItem(KEY.name)) {
  const name = prompt("Welcome! What should I call you? (Optional)");
  if (name && name.trim()) localStorage.setItem(KEY.name, name.trim());
  updateDateTime()
}

/* 25-minute timer */
let remaining = 1500,
  interval = null;

function renderTimer() {
  $("#timer").textContent = `${String(Math.floor(remaining/60)).padStart(2,"0")}:${String(remaining%60).padStart(2,"0")}`
}
$("#startTimer").onclick = () => {
  if (interval) return;
  $("#timerStatus").textContent = "Focus mode is running.";
  interval = setInterval(() => {
    remaining--;
    renderTimer();
    if (remaining <= 0) {
      clearInterval(interval);
      interval = null;
      remaining = 0;
      $("#timerStatus").textContent = "Focus session complete!";
      renderTimer()
    }
  }, 1000)
}
$("#stopTimer").onclick = () => {
  clearInterval(interval);
  interval = null;
  $("#timerStatus").textContent = "Timer paused."
}
$("#resetTimer").onclick = () => {
  clearInterval(interval);
  interval = null;
  remaining = 1500;
  $("#timerStatus").textContent = "Ready when you are.";
  renderTimer()
};
renderTimer();

/* To-do + Local Storage + duplicate prevention */
let tasks = JSON.parse(localStorage.getItem(KEY.tasks) || "[]");

function saveTasks() {
  localStorage.setItem(KEY.tasks, JSON.stringify(tasks))
}

function renderTasks() {
  const list = $("#taskList");
  list.innerHTML = "";
  $("#taskCount").textContent = `${tasks.length} task${tasks.length===1?"":"s"}`;
  if (!tasks.length) {
    list.innerHTML = "<li class='helper'>No tasks yet. Add your first one.</li>";
    return
  }
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "task" + (t.done ? " done" : "");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.onchange = () => {
      t.done = cb.checked;
      saveTasks();
      renderTasks()
    };
    const text = document.createElement("span");
    text.textContent = t.text;
    const edit = document.createElement("button");
    edit.className = "edit";
    edit.textContent = "Edit";
    edit.onclick = () => {
      const v = prompt("Edit task:", t.text);
      if (v && v.trim()) {
        t.text = v.trim();
        saveTasks();
        renderTasks()
      }
    };
    const del = document.createElement("button");
    del.className = "danger";
    del.textContent = "Delete";
    del.onclick = () => {
      tasks = tasks.filter(x => x.id !== t.id);
      saveTasks();
      renderTasks()
    };
    li.append(cb, text, edit, del);
    list.append(li)
  })
}
$("#taskForm").onsubmit = e => {
  e.preventDefault();
  const input = $("#taskInput"),
    text = input.value.trim();
  if (!text) return;
  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    $("#taskMessage").textContent = "That task already exists.";
    return
  }
  tasks.push({
    id: Date.now(),
    text,
    done: false
  });
  saveTasks();
  renderTasks();
  input.value = "";
  $("#taskMessage").textContent = ""
};
renderTasks();

/* Quick links + Local Storage */
const defaults = [{
  id: 1,
  name: "Google",
  url: "https://www.google.com"
}, {
  id: 2,
  name: "GitHub",
  url: "https://github.com"
}];
let links = JSON.parse(localStorage.getItem(KEY.links) || "null") || defaults;

function saveLinks() {
  localStorage.setItem(KEY.links, JSON.stringify(links))
}

function renderLinks() {
  const box = $("#linkList");
  box.innerHTML = "";
  links.forEach(l => {
    const div = document.createElement("div");
    div.className = "link";
    const a = document.createElement("a");
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = l.name;
    const b = document.createElement("button");
    b.textContent = "×";
    b.onclick = () => {
      links = links.filter(x => x.id !== l.id);
      saveLinks();
      renderLinks()
    };
    div.append(a, b);
    box.append(div)
  })
}
$("#linkForm").onsubmit = e => {
  e.preventDefault();
  const name = $("#linkName").value.trim(),
    url = $("#linkUrl").value.trim();
  if (!name || !url) return;
  links.push({
    id: Date.now(),
    name,
    url
  });
  saveLinks();
  renderLinks();
  $("#linkName").value = "";
  $("#linkUrl").value = ""
};
renderLinks();