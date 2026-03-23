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
    return `<div class="card-visual placeholder ${extraClass}"><span>${item.title}</span></div>`;
  }

  return `
    <div class="card-visual ${extraClass}">
      <img src="${withBase(item.image)}" alt="${escapeAttr(item.title)}">
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
        <div class="card-visual">
          <img src="${withBase("assets/images/cms2.jpg")}" alt="${escapeAttr(item.title)} preview">
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

export function renderPage(pageName, basePath = "./") {
  assetBase = basePath;
  const app = document.querySelector("#app");
  if (!app) return;

  if (pageName === "home") {
    app.innerHTML = `
      <section class="hero-shell" data-reveal data-scroll-section>
        <div class="hero panel hero-panel hero-panel-compact">
          <div class="hero-copy hero-copy-panel">
            <div class="hero-copy-grid">
              <div class="hero-copy-primary">
                <p class="eyebrow">Portfolio</p>
                <h1>${siteData.profile.headline}</h1>
              </div>
              <div class="hero-copy-secondary">
                <p class="hero-summary">${siteData.profile.summary}</p>
              </div>
            </div>
          </div>
          <div class="hero-visual-stage hero-visual-stage-compact">
            <div class="hero-portrait-wrap hero-portrait-wrap-compact" data-depth="0.08">
              <div class="hero-portrait hero-portrait-compact">
                <img src="${withBase(siteData.site.heroImage)}" alt="${escapeAttr(siteData.site.name)} portrait">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="stats-grid stats-grid-compact">${siteData.stats.map(statsItem).join("")}</section>

      <section class="section-shell story-section" data-reveal data-scroll-section>
        <div class="section-head">
          <div>
            <p class="eyebrow">Experience</p>
            <h2>Recent work first.</h2>
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
            <h2>Selected work.</h2>
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

      <section class="contact-shell panel" id="contact" data-reveal data-scroll-section>
        <div class="contact-copy">
          <p class="eyebrow">Contact</p>
          <h2>Interested in building something together?</h2>
          <p>${siteData.site.availability}. Reach out if software, analytics, or systems work is on the table.</p>
        </div>
        <form class="contact-form" action="${siteData.site.emailFormAction}" method="POST">
          <input type="text" name="name" placeholder="Your name" required>
          <input type="email" name="email" placeholder="Your email" required>
          <textarea name="message" rows="5" placeholder="Your message" required></textarea>
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
        <h1>Projects and shipped work.</h1>
        <p class="page-summary">A quick archive of what I've built.</p>
      </section>
      <section class="archive-grid">${siteData.projects.map(projectArchiveItem).join("")}</section>
    `;
    return;
  }

  if (pageName === "experiences") {
    app.innerHTML = `
      <section class="page-hero panel" data-reveal data-scroll-section>
        <p class="eyebrow">Experience</p>
        <h1>Roles, programs, and technical work.</h1>
        <p class="page-summary">A quick timeline of my work.</p>
      </section>
      <section class="timeline">${siteData.experiences.map(experienceTimelineItem).join("")}</section>
    `;
  }
}

export { siteData };
