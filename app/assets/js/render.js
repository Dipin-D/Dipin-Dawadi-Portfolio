import { siteData } from "./data.js";

const featuredExperience = siteData.experiences.find((item) => item.featured);
const featuredProject = siteData.projects.find((item) => item.featured);
const cmsExperience = siteData.experiences.find(
  (item) => item.title === "Undergraduate Software Researcher - CMS & AWS Integration"
);
const primaryFeaturedExperience =
  siteData.experiences.find(
    (item) => item.featured && item.title !== "Undergraduate Software Researcher - CMS & AWS Integration"
  ) || featuredExperience;
let assetBase = "./";

function iconLink(link) {
  return `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`;
}

function escapeAttr(value) {
  return value ? String(value).replace(/"/g, "&quot;") : "";
}

function mediaBlock(item, extraClass = "") {
  if (!item.image) {
    return `<div class="card-visual placeholder ${extraClass}" data-visual-label="Concept"><span class="placeholder-monogram">${item.title.slice(0, 2).toUpperCase()}</span><span>${item.title}</span></div>`;
  }

  return `
    <div class="card-visual ${extraClass}" data-visual-label="Selected work">
      <img src="${withBase(item.image)}" alt="${escapeAttr(item.title)}">
      <span class="visual-corner visual-corner-top" aria-hidden="true"></span>
      <span class="visual-corner visual-corner-bottom" aria-hidden="true"></span>
    </div>
  `;
}

function withBase(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${assetBase}${path}`;
}

function detailList(items) {
  return `<ul class="detail-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function linksRow(links = []) {
  if (!links.length) return "";
  return `<div class="link-row">${links.map(iconLink).join("")}</div>`;
}

function workCard(item, metaLabel) {
  return `
    <article class="feature-card panel" data-reveal data-scroll-section>
      <div class="feature-visual-wrap" data-depth="0.18">
        ${mediaBlock(item)}
      </div>
      <div class="feature-copy">
        <div class="eyebrow-row">
          <span class="eyebrow">${metaLabel}</span>
          <span class="meta-pill">${item.period}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="meta-line">${item.location}</p>
        <p>${item.summary}</p>
        ${detailList(item.highlights)}
        ${linksRow(item.links)}
      </div>
    </article>
  `;
}

function cmsWorkCard(item) {
  if (!item) return "";

  return `
    <article class="feature-card feature-card-cms panel" data-reveal data-scroll-section>
      <div class="feature-visual-wrap" data-depth="0.18">
        <div class="card-visual" data-visual-label="Live platform">
          <img src="${withBase("assets/images/cms2.jpg")}" alt="${escapeAttr(item.title)} preview">
          <span class="visual-corner visual-corner-top" aria-hidden="true"></span>
          <span class="visual-corner visual-corner-bottom" aria-hidden="true"></span>
        </div>
      </div>
      <div class="feature-copy">
        <div class="eyebrow-row">
          <span class="eyebrow">${item.organization}</span>
          <span class="meta-pill">${item.period}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="meta-line">${item.location}</p>
        <p>${item.summary}</p>
        ${detailList(item.highlights)}
        ${linksRow(item.links)}
      </div>
    </article>
  `;
}

function experienceTimelineItem(item) {
  return `
    <article class="timeline-item panel" data-reveal data-scroll-section>
      <div class="timeline-rail"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <div>
            <p class="eyebrow">${item.organization}</p>
            <h3>${item.title}</h3>
          </div>
          <div class="timeline-meta">
            <span>${item.period}</span>
            <span>${item.location}</span>
          </div>
        </div>
        <div class="timeline-body">
          <div class="feature-visual-wrap" data-depth="0.16">
            ${mediaBlock(item, "timeline-visual")}
          </div>
          <div>
            <p>${item.summary}</p>
            ${detailList(item.highlights)}
            ${linksRow(item.links)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function projectArchiveItem(item) {
  return `
    <article class="archive-card panel" data-reveal data-scroll-section>
      <div class="feature-visual-wrap" data-depth="0.16">
        ${mediaBlock(item)}
      </div>
      <div class="archive-copy">
        <div class="eyebrow-row">
          <span class="eyebrow">${item.tag}</span>
          <span class="meta-pill">${item.period}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="meta-line">${item.location}</p>
        <p>${item.summary}</p>
        ${detailList(item.highlights)}
        ${linksRow(item.links)}
      </div>
    </article>
  `;
}

function certificationItem(item) {
  return `
    <a class="credential-card panel" href="${item.href}" target="_blank" rel="noreferrer" data-reveal data-scroll-section>
      <p class="eyebrow">${item.issuer}</p>
      <h3>${item.title}</h3>
    </a>
  `;
}

function skillGroupItem(group) {
  return `
    <article class="skill-card panel" data-reveal data-scroll-section>
      <p class="skill-title">${group.title}</p>
      <div class="pill-list">
        ${group.items.map((item) => `<span class="pill">${item}</span>`).join("")}
      </div>
    </article>
  `;
}

function statsItem(item) {
  return `
    <article class="stat-card panel" data-reveal data-scroll-section>
      <p class="stat-value">${item.value}</p>
      <p class="stat-label">${item.label}</p>
    </article>
  `;
}

function arrowIcon() {
  return `<span aria-hidden="true">↗</span>`;
}

export function renderPage(pageName, basePath = "./") {
  assetBase = basePath;
  const app = document.querySelector("#app");
  if (!app) return;

  if (pageName === "home") {
    app.innerHTML = `
      <section class="hero-shell" data-reveal data-scroll-section>
        <div class="hero panel hero-panel hero-panel-compact">
          <p class="hero-ghost-name" aria-hidden="true">DIPIN</p>
          <div class="hero-copy hero-copy-panel">
            <div class="hero-copy-grid">
              <div class="hero-copy-primary">
                <p class="availability"><span></span>${siteData.site.availability}</p>
                <h1>${siteData.profile.headline}</h1>
              </div>
              <div class="hero-copy-secondary">
                <p class="hero-summary">${siteData.profile.summary}</p>
                <p class="location-line">${siteData.site.location}</p>
                <div class="hero-actions">
                  <a class="button button-primary" href="#contact">Start a conversation</a>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-visual-stage hero-visual-stage-compact">
            <div class="hero-portrait-wrap hero-portrait-wrap-compact" data-depth="0.08">
              <span class="portrait-depth-layer portrait-depth-layer-a" aria-hidden="true"></span>
              <span class="portrait-depth-layer portrait-depth-layer-b" aria-hidden="true"></span>
              <div class="hero-portrait hero-portrait-compact">
                <img src="${withBase(siteData.site.heroImage)}" alt="${escapeAttr(siteData.site.name)} portrait">
              </div>
            </div>
            <span class="hero-orbit-chip orbit-chip-a" data-depth="0.35">SAP</span>
            <span class="hero-orbit-chip orbit-chip-b" data-depth="0.48">GRC</span>
            <span class="hero-orbit-chip orbit-chip-c" data-depth="0.28">SOX</span>
            <span class="hero-orbit-chip orbit-chip-d" data-depth="0.42">ACCESS</span>
          </div>
        </div>
      </section>

      <div class="kinetic-strip" aria-label="Areas of focus">
        <div class="kinetic-track">
          <span>SAP SECURITY</span><i>✦</i><span>ACCESS GOVERNANCE</span><i>✦</i><span>GRC</span><i>✦</i><span>COMPLIANCE</span><i>✦</i>
          <span>SAP SECURITY</span><i>✦</i><span>ACCESS GOVERNANCE</span><i>✦</i><span>GRC</span><i>✦</i><span>COMPLIANCE</span><i>✦</i>
        </div>
      </div>

      <section class="stats-grid stats-grid-compact">${siteData.stats.map(statsItem).join("")}</section>

      <section class="education-strip panel" data-reveal data-scroll-section aria-labelledby="education-title">
        <div>
          <p class="eyebrow">Education</p>
          <h2 id="education-title">${siteData.education.degree}</h2>
        </div>
        <div class="education-details">
          <strong>${siteData.education.school}</strong>
          <span>${siteData.education.distinction}</span>
          <span>${siteData.education.period} · ${siteData.education.location}</span>
        </div>
      </section>

      <section class="section-shell story-section" data-reveal data-scroll-section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Experience</p>
          </div>
          <a class="text-link" href="./experiences/">See all experience</a>
        </div>
        <div class="featured-work-stack">
          ${workCard(primaryFeaturedExperience, primaryFeaturedExperience.organization)}
          ${cmsWorkCard(cmsExperience)}
        </div>
      </section>

      <section class="section-shell story-section" data-reveal data-scroll-section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Projects</p>
            <h2>Selected projects.</h2>
          </div>
          <a class="text-link" href="./projects/">See all projects</a>
        </div>
        ${workCard(featuredProject, featuredProject.tag)}
      </section>

      <section class="section-shell" data-reveal data-scroll-section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Capabilities</p>
            <h2>Core strengths.</h2>
          </div>
        </div>
        <div class="skills-grid">${siteData.skillGroups.map(skillGroupItem).join("")}</div>
      </section>

      <section class="section-shell" data-reveal data-scroll-section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Credentials</p>
            <h2>Supporting coursework and certifications.</h2>
          </div>
        </div>
        <div class="credentials-grid">${siteData.certifications.map(certificationItem).join("")}</div>
      </section>

      <section class="profile-details-grid" aria-label="Honors and languages">
        <article class="profile-detail-card panel" data-reveal data-scroll-section>
          <p class="eyebrow">Recognition</p>
          <h2>Honors.</h2>
          <ul class="compact-list">${siteData.highlights.honors.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article class="profile-detail-card panel" data-reveal data-scroll-section>
          <p class="eyebrow">Communication</p>
          <h2>Languages.</h2>
          <ul class="compact-list">${siteData.highlights.languages.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      </section>

      <section class="contact-shell panel" id="contact" data-reveal data-scroll-section>
        <div class="contact-copy">
          <p class="eyebrow">Contact</p>
          <h2>Let’s build something useful.</h2>
          <p>${siteData.site.availability}. If you have a role, project, or idea that fits, I’d be glad to hear about it.</p>
          <div class="contact-links"><a href="mailto:${siteData.site.email}">${siteData.site.email}</a>${siteData.site.socialLinks.map(iconLink).join("")}</div>
        </div>
        <form class="contact-form" action="${siteData.site.emailFormAction}" method="POST">
          <label for="contact-name">Name</label>
          <input id="contact-name" type="text" name="name" autocomplete="name" placeholder="Your name" required>
          <label for="contact-email">Email</label>
          <input id="contact-email" type="email" name="email" autocomplete="email" placeholder="you@example.com" required>
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" placeholder="Tell me a little about the opportunity or project." required></textarea>
          <input type="hidden" name="_captcha" value="false">
          <button class="button button-primary" type="submit">Send message</button>
        </form>
      </section>
    `;
    return;
  }

  if (pageName === "projects") {
    app.innerHTML = `
      <section class="page-hero panel" data-reveal data-scroll-section>
        <p class="eyebrow">Projects</p>
        <h1>Projects built around real problems.</h1>
        <p class="page-summary">Selected software, analytics, and product work—from cloud-backed platforms to predictive workflows.</p>
      </section>
      <section class="archive-grid">${siteData.projects.map(projectArchiveItem).join("")}</section>
    `;
    return;
  }

  if (pageName === "experiences") {
    app.innerHTML = `
      <section class="page-hero panel" data-reveal data-scroll-section>
        <p class="eyebrow">Experience</p>
        <h1>Experience across engineering, data, and enterprise systems.</h1>
        <p class="page-summary">A record of internships, research, consulting programs, and technical leadership.</p>
      </section>
      <section class="timeline">${siteData.experiences.map(experienceTimelineItem).join("")}</section>
    `;
  }
}

export { siteData };
