import { renderPage, siteData } from "./render.js";
import { initScene } from "./scene.js";
import { initIntroCanvas } from "./intro-canvas.js";

const root = document.documentElement;
const body = document.body;
const pageName = body.dataset.page || "home";
const basePath = body.dataset.base || "./";
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const revealObserverSupported = "IntersectionObserver" in window;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let ticking = false;

const storedTheme = localStorage.getItem("portfolio-theme");
if (storedTheme === "light" || storedTheme === "dark") {
  root.dataset.theme = storedTheme;
} else {
  root.dataset.theme = "dark";
}

document.title = pageName === "home" ? siteData.site.title : `${pageName[0].toUpperCase()}${pageName.slice(1)} | ${siteData.site.name}`;
document.querySelector('meta[name="description"]')?.setAttribute("content", siteData.site.description);

renderPage(pageName, basePath);
setupIntro();
activateNav();
bindUi();
setupReveal();
setupMotion();
initScene();

function setupIntro() {
  if (pageName !== "home") return;
  const intro = document.querySelector(".intro-overlay");
  if (!intro) return;
  const word = intro.querySelector("[data-intro-word]");
  const sub = intro.querySelector("[data-intro-sub]");

  if (prefersReducedMotion) {
    intro.remove();
    return;
  }

  const disposeIntroCanvas = initIntroCanvas();
  const greetings = [
    "Hello",
    "Namaste",
    "Hola",
    "Bonjour",
    "Ciao",
    "Hallo",
    "Ola",
    "Hej",
    "Ahoj",
    "Merhaba",
    "Salaam",
    "Konnichiwa",
    "Annyeong",
    "Ni Hao",
    "Sabaidee",
    "Xin chao",
    "Jambo",
    "Sawubona",
    "Shalom",
    "Vanakkam",
  ];

  const totalDuration = 4000;
  const interval = Math.floor(totalDuration / greetings.length);
  let greetingIndex = 0;

  if (word) {
    word.textContent = greetings[0];
  }

  if (sub) {
    sub.textContent = "Welcome";
  }

  const greetingTimer = window.setInterval(() => {
    greetingIndex += 1;
    if (greetingIndex >= greetings.length) {
      window.clearInterval(greetingTimer);
      return;
    }

    if (word) {
      word.classList.remove("is-visible");
      window.requestAnimationFrame(() => {
        word.textContent = greetings[greetingIndex];
        word.classList.add("is-visible");
      });
    }
  }, interval);

  window.setTimeout(() => {
    intro.classList.add("is-leaving");
  }, totalDuration);

  window.setTimeout(() => {
    window.clearInterval(greetingTimer);
    disposeIntroCanvas();
    intro.remove();
  }, totalDuration + 700);
}

function activateNav() {
  const current = pageName === "home" ? "home" : pageName;
  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.dataset.page === current) {
      link.classList.add("is-active");
    }
  });
}

function bindUi() {
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = nextTheme;
      localStorage.setItem("portfolio-theme", nextTheme);
    });
  }

  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-rx", `${((event.clientY / window.innerHeight) - 0.5) * -8}deg`);
      root.style.setProperty("--pointer-ry", `${((event.clientX / window.innerWidth) - 0.5) * 10}deg`);
      document.querySelectorAll("[data-depth]").forEach((node) => {
        const depth = Number(node.dataset.depth || 0.1);
        const moveX = ((event.clientX / window.innerWidth) - 0.5) * depth * 42;
        const moveY = ((event.clientY / window.innerHeight) - 0.5) * depth * 34;
        node.style.setProperty("--move-x", `${moveX}px`);
        node.style.setProperty("--move-y", `${moveY}px`);
      });
    });
  }
}

function setupReveal() {
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (!revealItems.length) return;

  if (!revealObserverSupported) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupMotion() {
  updateScrollScene();
  if (!prefersReducedMotion) {
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
  }
}

function requestTick() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateScrollScene();
    ticking = false;
  });
}

function updateScrollScene() {
  const scrollY = window.scrollY || window.pageYOffset;
  root.style.setProperty("--scroll-y", `${scrollY}px`);
  root.style.setProperty("--scroll-tilt", `${Math.min(scrollY * 0.02, 18)}deg`);

  document.querySelectorAll("[data-scroll-section]").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    const lift = (0.5 - progress) * 40;
    section.style.setProperty("--section-progress", progress.toFixed(3));
    section.style.setProperty("--section-lift", `${lift.toFixed(2)}px`);
  });

  const heroScene = document.querySelector("[data-scroll-scene]");
  const heroVisual = document.querySelector(".hero-portrait-wrap");
  if (heroScene && heroVisual) {
    const rect = heroScene.getBoundingClientRect();
    const total = Math.max(rect.height - window.innerHeight, 1);
    const progress = Math.max(0, Math.min(1, (-rect.top) / total));
    root.style.setProperty("--hero-progress", progress.toFixed(3));
    heroVisual.style.setProperty("--hero-shift", `${progress * -18}px`);
    heroVisual.style.setProperty("--hero-scale", `${1 + progress * 0.03}`);
  }
}
