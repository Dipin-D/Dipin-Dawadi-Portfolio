import { renderPage, siteData } from "./render.js";

const root = document.documentElement;
const body = document.body;
const pageName = body.dataset.page || "home";
const basePath = body.dataset.base || "./";
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

renderPage(pageName, basePath);
setPageMetadata();
activateNav();
bindNavigation();
setupAuthorizationLab();
setupReveal();
setupInterfaceSignals();
if (window.gsap) {
  setupDirectedMotion();
} else {
  window.addEventListener("load", setupDirectedMotion, { once: true });
}

function setPageMetadata() {
  const pageTitles = {
    home: siteData.site.title,
    projects: `Projects | ${siteData.site.name}`,
    experiences: `Experience | ${siteData.site.name}`,
  };
  document.title = pageTitles[pageName] || siteData.site.title;
}

function activateNav() {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.dataset.page === pageName) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function setMenuState(open) {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("is-open", open);
}

function bindNavigation() {
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || menuToggle.getAttribute("aria-expanded") !== "true") return;
    setMenuState(false);
    menuToggle.focus();
  });
}

function setupReveal() {
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if (!revealItems.length) return;

  const gsapWillHandleReveal = Boolean(window.gsap) && !prefersReducedMotion && !window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
  if (gsapWillHandleReveal || prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupInterfaceSignals() {
  const header = document.querySelector(".site-header");
  if (header) {
    const trace = document.createElement("span");
    trace.className = "scroll-trace";
    trace.setAttribute("aria-hidden", "true");
    header.append(trace);
    let ticking = false;
    const updateTrace = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      trace.style.transform = `scaleX(${distance > 0 ? Math.min(window.scrollY / distance, 1) : 0})`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) requestAnimationFrame(updateTrace);
      ticking = true;
    }, { passive: true });
    updateTrace();
  }

  const transition = document.createElement("div");
  transition.className = "route-transition";
  transition.setAttribute("aria-hidden", "true");
  transition.innerHTML = '<i></i><b>ACCESSING / PORTFOLIO</b><span>DD—001</span>';
  body.append(transition);
  requestAnimationFrame(() => body.classList.add("page-ready"));

  if (prefersReducedMotion) return;
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || link.target === "_blank" || url.hash || url.protocol === "mailto:") return;
    event.preventDefault();
    const label = url.pathname.includes("projects") ? "PROJECT ARCHIVE" : url.pathname.includes("experiences") ? "CAREER RECORD" : "OVERVIEW";
    transition.querySelector("b").textContent = `ACCESSING / ${label}`;
    body.classList.add("is-leaving");
    window.setTimeout(() => { window.location.href = url.href; }, 440);
  });
}

function setupAuthorizationLab() {
  const lab = document.querySelector("[data-auth-lab]");
  if (!lab) return;

  const stages = [
    {
      code: "IDENTITY / 01",
      state: "VERIFIED",
      title: "Is this person who the request says they are?",
      copy: "Confirm the user, employment context, request source, and accountable owner before access moves forward.",
    },
    {
      code: "ROLE MAP / 02",
      state: "MAPPED",
      title: "Does the requested role match the job to be done?",
      copy: "Translate business responsibilities into the smallest appropriate set of roles, systems, and authorization objects.",
    },
    {
      code: "SOD REVIEW / 03",
      state: "EVALUATED",
      title: "Would this access create a preventable conflict?",
      copy: "Evaluate Segregation of Duties risk, identify sensitive combinations, and document the controls or mitigation behind the decision.",
    },
    {
      code: "APPROVAL / 04",
      state: "CONTROLLED",
      title: "Has the accountable owner approved the risk?",
      copy: "Keep authorization tied to the right approver, business purpose, policy, and time-bound context before provisioning.",
    },
    {
      code: "EVIDENCE / 05",
      state: "PRESERVED",
      title: "Can the entire decision be reconstructed later?",
      copy: "Preserve the request, analysis, approvals, changes, and review history so the access record is clear when audit asks why.",
    },
  ];

  const buttons = [...lab.querySelectorAll("[data-auth-stage]")];
  const fields = {
    code: lab.querySelector("[data-auth-code]"),
    state: lab.querySelector("[data-auth-state]"),
    title: lab.querySelector("[data-auth-title]"),
    copy: lab.querySelector("[data-auth-copy]"),
  };

  function selectStage(index, focus = false) {
    const stage = stages[index];
    if (!stage) return;

    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    Object.entries(fields).forEach(([key, element]) => {
      if (element) element.textContent = stage[key];
    });

    if (focus) buttons[index].focus();
    lab.style.setProperty("--auth-progress", `${(index / Math.max(buttons.length - 1, 1)) * 100}%`);
    const inspector = lab.querySelector(".auth-inspector");
    if (inspector) {
      inspector.classList.remove("is-updating");
      void inspector.offsetWidth;
      inspector.classList.add("is-updating");
    }

    if (window.gsap && !prefersReducedMotion) {
      window.gsap.fromTo(
        [fields.title, fields.copy],
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.36, stagger: 0.05, ease: "power3.out" },
      );
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectStage(index));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % buttons.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = buttons.length - 1;
      selectStage(next, true);
    });
  });
}

function setupDirectedMotion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const mobileLite = window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;
  if (!gsap || prefersReducedMotion || mobileLite) return;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".button, .nav-cta").forEach((target) => {
    const moveX = gsap.quickTo(target, "x", { duration: 0.38, ease: "power3.out" });
    const moveY = gsap.quickTo(target, "y", { duration: 0.38, ease: "power3.out" });
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.1);
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.14);
    });
    target.addEventListener("pointerleave", () => { moveX(0); moveY(0); });
  });

  if (pageName === "home") {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set("[data-hero-name] span", { overflow: "hidden" });
    heroTimeline
      .fromTo(".system-id", { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.42 })
      .fromTo("[data-hero-name] i", { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 0.78, stagger: 0.1, ease: "power4.out" }, "-=0.14")
      .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.58, stagger: 0.1, transformOrigin: "left" }, "-=0.5")
      .fromTo(".control-role, .control-focus, .control-summary, .hero-actions", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.07 }, "-=0.42")
      .fromTo(".control-map", { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 }, { clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 0.85, ease: "power4.inOut" }, "-=0.76")
      .fromTo(".circuit", { scaleY: 0 }, { scaleY: 1, duration: 0.48, stagger: 0.12, transformOrigin: "top" }, "-=0.38")
      .fromTo(".map-stage", { scale: 0.72, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.42, stagger: 0.14, ease: "back.out(1.7)" }, "-=0.28")
      .fromTo(".map-connector", { scaleX: 0 }, { scaleX: 1, duration: 0.34, stagger: 0.14, transformOrigin: "left" }, "-=0.5")
      .fromTo(".control-log", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, "-=0.18")
      .fromTo("[data-hero-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.65, transformOrigin: "left" }, "-=0.24")
      .add(() => document.querySelector(".control-map")?.classList.add("is-live"));

    const hero = document.querySelector(".control-hero");
    const controlMap = hero?.querySelector(".control-map");
    if (hero && controlMap) {
      const moveX = gsap.quickTo(controlMap, "x", { duration: 0.7, ease: "power3.out" });
      const moveY = gsap.quickTo(controlMap, "y", { duration: 0.7, ease: "power3.out" });
      hero.addEventListener("pointermove", (event) => {
        const bounds = hero.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
      });
      hero.addEventListener("pointerleave", () => {
        moveX(0);
        moveY(0);
      });
    }
  }

  if (!ScrollTrigger) return;

  document.querySelectorAll(".section-intro").forEach((section) => {
    const targets = section.querySelectorAll(".section-index, .kicker, h2, .section-copy, .section-link");
    gsap.fromTo(targets, { y: 34, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: 0.66, stagger: 0.075, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 82%", once: true },
    });
  });

  document.querySelectorAll("[data-count-value]").forEach((element) => {
    const raw = element.dataset.countValue;
    const number = Number(raw.replace(/[^0-9.]/g, ""));
    const state = { value: 0 };
    gsap.to(state, {
      value: number, duration: 1.25, ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
      onUpdate: () => {
        let value = raw.includes(".") ? state.value.toFixed(1) : Math.round(state.value).toLocaleString("en-US");
        if (raw.includes("K")) value = `${Math.round(state.value)}K`;
        element.textContent = `${value}${raw.endsWith("+") ? "+" : ""}`;
      },
    });
  });

  const portrait = document.querySelector(".role-portrait");
  if (portrait) {
    gsap.fromTo(portrait, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.inOut", scrollTrigger: { trigger: portrait, start: "top 82%", once: true } });
    gsap.fromTo(portrait.querySelector("img"), { scale: 1.14 }, { scale: 1.02, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: portrait, start: "top 82%", once: true } });
  }

  const authLab = document.querySelector(".authorization-lab");
  if (authLab) {
    gsap.fromTo(authLab, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power4.inOut", scrollTrigger: { trigger: authLab, start: "top 82%", once: true } });
    gsap.fromTo(authLab.querySelectorAll(".auth-node"), { x: -22, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.48, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: authLab, start: "top 78%", once: true } });
    gsap.fromTo(authLab.querySelector(".auth-inspector"), { x: 28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: authLab, start: "top 76%", once: true } });
  }

  document.querySelectorAll(".capability-row, .archive-line").forEach((row, index) => {
    gsap.fromTo(row.children, { x: index % 2 ? 22 : -22, autoAlpha: 0 }, {
      x: 0, autoAlpha: 1, duration: 0.55, stagger: 0.055, ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 88%", once: true },
    });
  });

  document.querySelectorAll(".experience-record").forEach((record) => {
    gsap.fromTo(record.querySelector(".experience-record__date"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: record, start: "top 84%", once: true } });
    gsap.fromTo(record.querySelector(".experience-record__main"), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.68, ease: "power3.out", scrollTrigger: { trigger: record, start: "top 82%", once: true } });
  });

  const contact = document.querySelector(".contact-terminal");
  if (contact) {
    gsap.fromTo(contact.children, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.68, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: contact, start: "top 82%", once: true } });
  }

  document.querySelectorAll(".archive-record").forEach((record, index) => {
    const image = record.querySelector(".record-image");
    const copy = record.querySelector(".archive-record__copy");
    if (image) gsap.fromTo(image, { clipPath: index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.inOut", scrollTrigger: { trigger: record, start: "top 80%", once: true } });
    if (copy) gsap.fromTo(copy, { x: index % 2 ? -28 : 28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.68, ease: "power3.out", scrollTrigger: { trigger: record, start: "top 78%", once: true } });
  });

  const archiveHero = document.querySelector(".archive-hero");
  if (archiveHero) {
    gsap.fromTo(archiveHero.querySelectorAll(".archive-hero__index, .kicker, h1, p:last-child"), { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.09, ease: "power3.out" });
    gsap.to(archiveHero, { backgroundPosition: "0 0, -72px 0, 0 0", ease: "none", scrollTrigger: { trigger: archiveHero, start: "top top", end: "bottom top", scrub: 0.8 } });
  }

  document.querySelectorAll("[data-case-record]").forEach((card) => {
    const marker = card.querySelector(".case-record__rail i");
    const content = card.querySelector(".case-record__body");
    gsap.fromTo(
      content,
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.62,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 82%", once: true },
      },
    );
    gsap.fromTo(marker, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 82%", once: true } });
  });
}
