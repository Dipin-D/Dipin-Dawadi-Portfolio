import { siteData } from "./data.js";

let assetBase = "./";

const securityExperienceTitles = new Set(["ERP Security Analyst", "SAP IT Intern", "IAM Intern"]);

function escapeAttr(value) {
  return value ? String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;") : "";
}

function withBase(path) {
  if (!path || /^(https?:)?\/\//.test(path)) return path;
  return `${assetBase}${path}`;
}

function externalLink(link) {
  return `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}<span aria-hidden="true">↗</span></a>`;
}

function linksRow(links = []) {
  return links.length ? `<div class="link-row">${links.map(externalLink).join("")}</div>` : "";
}

function detailList(items) {
  return `<ul class="detail-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function imageBlock(item, className = "") {
  if (!item.image) {
    return `<div class="record-image record-image--empty ${className}" aria-hidden="true"><span>${item.title.slice(0, 2).toUpperCase()}</span></div>`;
  }

  return `
    <div class="record-image ${className}">
      <img src="${withBase(item.image)}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async">
    </div>`;
}

function sectionIntro(index, eyebrow, title, copy = "", link = "") {
  return `
    <header class="section-intro" data-reveal>
      <div class="section-index" aria-hidden="true">${index}</div>
      <div class="section-title-wrap">
        <p class="kicker">${eyebrow}</p>
        <h2>${title}</h2>
      </div>
      ${copy ? `<p class="section-copy">${copy}</p>` : ""}
      ${link}
    </header>`;
}

function statItem(item, index) {
  return `
    <article class="ledger-stat" data-reveal>
      <span class="ledger-id">0${index + 1}</span>
      <strong data-count-value="${escapeAttr(item.value)}">${item.value}</strong>
      <p>${item.label}</p>
    </article>`;
}

function caseRecord(item) {
  return `
    <article class="case-record" data-case-record data-reveal>
      <div class="case-record__rail">
        <span>${item.index}</span>
        <i aria-hidden="true"></i>
        <b>${item.signal}</b>
      </div>
      <div class="case-record__body">
        <div class="case-record__heading">
          <p class="kicker">${item.scope}</p>
          <h3>${item.title}</h3>
        </div>
        <div class="case-record__narrative">
          <div>
            <span class="field-label">Control question</span>
            <p>${item.challenge}</p>
          </div>
          <div>
            <span class="field-label">My contribution</span>
            <p>${item.response}</p>
          </div>
        </div>
        <ul class="evidence-chips" aria-label="Evidence">${item.evidence.map((entry) => `<li>${entry}</li>`).join("")}</ul>
      </div>
    </article>`;
}

function capabilityGroup(group, index) {
  return `
    <article class="capability-row" data-reveal>
      <span class="capability-number">0${index + 1}</span>
      <h3>${group.title}</h3>
      <div class="capability-list">${group.items.map((item) => `<span>${item}</span>`).join("")}</div>
    </article>`;
}

function credentialItem(item) {
  return `
    <a class="credential-ticket" href="${item.href}" target="_blank" rel="noreferrer" data-reveal>
      <span class="field-label">${item.issuer}</span>
      <strong>${item.title}</strong>
      <span aria-hidden="true">↗</span>
    </a>`;
}

function projectArchiveItem(item, index) {
  return `
    <article class="archive-record" data-reveal>
      <div class="archive-record__number">${String(index + 1).padStart(2, "0")}</div>
      ${imageBlock(item, "archive-record__image")}
      <div class="archive-record__copy">
        <div class="record-meta"><span>${item.tag}</span><span>${item.period}</span><span>${item.location}</span></div>
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
        ${detailList(item.highlights)}
        ${linksRow(item.links)}
      </div>
    </article>`;
}

function experienceRecord(item, index) {
  const upcoming = item.title === "ERP Security Analyst" ? `
    <aside class="inline-upcoming">
      <span class="field-label">Upcoming / not yet started</span>
      <strong>${siteData.upcomingInitiative.title}</strong>
      <p>${siteData.upcomingInitiative.description}</p>
    </aside>` : "";

  return `
    <article class="experience-record" data-reveal>
      <div class="experience-record__date"><span>${String(index + 1).padStart(2, "0")}</span><b>${item.period}</b></div>
      <div class="experience-record__main">
        <div class="record-meta"><span>${item.organization}</span><span>${item.location}</span></div>
        <h3>${item.title}</h3>
        <p class="experience-summary">${item.summary}</p>
        ${detailList(item.highlights)}
        ${upcoming}
        ${linksRow(item.links)}
      </div>
    </article>`;
}

function compactExperience(item, index) {
  return `
    <article class="archive-line" data-reveal>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><p class="kicker">${item.organization}</p><h3>${item.title}</h3></div>
      <p>${item.summary}</p>
      <div class="archive-line__meta"><span>${item.period}</span><span>${item.location}</span>${linksRow(item.links)}</div>
    </article>`;
}

function renderHome() {
  const currentRole = siteData.experiences[0];
  const previousRole = siteData.experiences[1];
  const priorityCredentials = siteData.certifications.filter((item) => item.priority);

  return `
    <section class="control-hero">
      <div class="control-hero__grid" aria-hidden="true"></div>
      <div class="control-hero__copy" data-hero-copy>
        <p class="system-id">DD / ERPSEC / PORTFOLIO—2026</p>
        <h1 data-hero-name>${siteData.site.name.split(" ").map((word) => `<span><i>${word}</i></span>`).join("")}</h1>
        <div class="hero-rule" aria-hidden="true"><i></i></div>
        <p class="control-role">ERP Security Analyst</p>
        <div class="hero-rule hero-rule--long" aria-hidden="true"><i></i></div>
        <p class="control-focus"><span>SAP Security</span><i></i><span>Access Governance</span><i></i><span>GRC</span></p>
        <p class="control-summary">${siteData.profile.summary}</p>
        <div class="hero-actions">
          <a class="button button--signal" href="#authorization-path">Review access path <span aria-hidden="true">↓</span></a>
          <a class="button button--ghost" href="./experiences/">View experience <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="control-map" data-hero-visual aria-label="Authorization path from request to verified access">
        <div class="circuit circuit--a" aria-hidden="true"></div>
        <div class="circuit circuit--b" aria-hidden="true"></div>
        <div class="control-map__flow">
          <div class="map-stage"><span>Request</span><b><i></i></b></div>
          <div class="map-connector" aria-hidden="true"></div>
          <div class="map-stage"><span>Authenticate</span><b><i></i></b></div>
          <div class="map-connector" aria-hidden="true"></div>
          <div class="map-stage"><span>Authorize</span><b><i></i></b></div>
          <div class="map-connector map-connector--verified" aria-hidden="true"></div>
          <div class="map-stage map-stage--verified"><span>Verified</span><b><i></i></b></div>
        </div>
        <div class="control-log" aria-hidden="true">
          <span>ACCESS_TRACE / DD-001</span>
          <i></i><i></i><i></i><i></i>
          <b>CONTROL STATE / VERIFIED</b>
        </div>
      </div>
      <div class="control-hero__foot" data-hero-line>
        <span>HUNTSVILLE, AL</span>
        <span>Review the request · Test the risk · Preserve the evidence</span>
        <span>STATUS / ACTIVE</span>
      </div>
    </section>

    <section class="proof-ledger" aria-label="Verified career highlights">
      <div class="ledger-title"><span>Verified scope</span><b>Evidence / 04</b></div>
      <div class="ledger-grid">${siteData.stats.map(statItem).join("")}</div>
    </section>

    <section class="dossier-section authorization-section" id="authorization-path">
      ${sectionIntro("01", "Interactive control path", "Access is a decision, not a checkbox.", "Follow a request from identity through evidence. Each stage represents the questions behind responsible enterprise access.")}
      <div class="authorization-lab" data-auth-lab data-reveal>
        <div class="auth-flow" role="tablist" aria-label="Authorization stages">
          <button class="auth-node is-active" type="button" role="tab" aria-selected="true" data-auth-stage="0"><span>01</span><b>Identity</b><i></i></button>
          <button class="auth-node" type="button" role="tab" aria-selected="false" data-auth-stage="1"><span>02</span><b>Role map</b><i></i></button>
          <button class="auth-node" type="button" role="tab" aria-selected="false" data-auth-stage="2"><span>03</span><b>SoD review</b><i></i></button>
          <button class="auth-node" type="button" role="tab" aria-selected="false" data-auth-stage="3"><span>04</span><b>Approval</b><i></i></button>
          <button class="auth-node" type="button" role="tab" aria-selected="false" data-auth-stage="4"><span>05</span><b>Evidence</b><i></i></button>
        </div>
        <div class="auth-inspector" aria-live="polite">
          <div class="auth-inspector__top"><span data-auth-code>IDENTITY / 01</span><b data-auth-state>VERIFIED</b></div>
          <div class="auth-inspector__content">
            <p class="field-label" data-auth-label>Control question</p>
            <h3 data-auth-title>Is this person who the request says they are?</h3>
            <p data-auth-copy>Confirm the user, employment context, request source, and accountable owner before access moves forward.</p>
          </div>
          <div class="auth-inspector__foot"><span>OWNER / SECURITY</span><span>TRACE / PRESERVED</span></div>
        </div>
      </div>
    </section>

    <section class="dossier-section" id="security-impact">
      ${sectionIntro("02", "Completed work", "Proof, organized as an audit record.", "An anonymized example drawn from work already performed—not a promise, inflated outcome, or future assignment.")}
      <div class="case-records">${siteData.impactStories.map(caseRecord).join("")}</div>
    </section>

    <section class="dossier-section role-section">
      ${sectionIntro("03", "Current assignment", "Security work in the real enterprise.", "Present responsibilities and upcoming scope are deliberately separated so the record stays accurate.", '<a class="section-link" href="./experiences/">Full career record ↗</a>')}
      <div class="role-dossier" data-reveal>
        <article class="role-primary">
          <div class="role-primary__head"><span>${currentRole.period}</span><span>${currentRole.location}</span></div>
          <p class="kicker">${currentRole.organization}</p>
          <h3>${currentRole.title}</h3>
          <p>${currentRole.summary}</p>
          ${detailList(currentRole.highlights.slice(0, 3))}
        </article>
        <figure class="role-portrait">
          <img src="${withBase(siteData.site.heroImage)}" alt="${escapeAttr(siteData.site.name)}" loading="lazy" decoding="async">
          <figcaption><span>Identity / DD—001</span><strong>${siteData.site.name}</strong><i>ERP Security Analyst</i></figcaption>
        </figure>
        <aside class="upcoming-card">
          <div class="upcoming-card__status"><i aria-hidden="true"></i>${siteData.upcomingInitiative.status}</div>
          <p class="kicker">${siteData.upcomingInitiative.label}</p>
          <h3>${siteData.upcomingInitiative.title}</h3>
          <p class="upcoming-scope">${siteData.upcomingInitiative.scope}</p>
          <p>${siteData.upcomingInitiative.description}</p>
        </aside>
        <article class="role-previous">
          <span class="field-label">Previous record</span>
          <h3>${previousRole.title}</h3>
          <p>${previousRole.period} · ${previousRole.organization}</p>
          <strong>16K+ records validated · ticket-routing automation · audit support</strong>
        </article>
      </div>
    </section>

    <section class="dossier-section capability-section">
      ${sectionIntro("04", "Control library", "Capabilities indexed for the work.")}
      <div class="capability-index">${siteData.skillGroups.map(capabilityGroup).join("")}</div>
    </section>

    <section class="foundation-section">
      <article class="education-dossier" data-reveal>
        <span class="field-label">Education record</span>
        <p class="education-score">4.0</p>
        <h2>${siteData.education.degree}</h2>
        <p><strong>${siteData.education.school}</strong><br>${siteData.education.distinction}</p>
        <span>${siteData.education.period} · ${siteData.education.location}</span>
      </article>
      <div class="credential-stack">${priorityCredentials.map(credentialItem).join("")}</div>
    </section>

    <section class="contact-terminal" id="contact" data-reveal>
      <div class="contact-terminal__intro">
        <p class="kicker">Open channel / Contact</p>
        <h2>Let’s talk about access that can stand up to scrutiny.</h2>
        <p>ERP security, access governance, GRC, compliance, and adjacent technical opportunities.</p>
        <div class="contact-direct"><a href="mailto:${siteData.site.email}">${siteData.site.email}</a>${siteData.site.socialLinks.map(externalLink).join("")}</div>
      </div>
      <form class="contact-form" action="${siteData.site.emailFormAction}" method="POST">
        <div class="form-field"><label for="contact-name">01 / Name</label><input id="contact-name" type="text" name="name" autocomplete="name" required></div>
        <div class="form-field"><label for="contact-email">02 / Email</label><input id="contact-email" type="email" name="email" autocomplete="email" required></div>
        <div class="form-field form-field--wide"><label for="contact-message">03 / Message</label><textarea id="contact-message" name="message" rows="4" required></textarea></div>
        <input type="hidden" name="_subject" value="Portfolio contact from dipindawadi.com.np">
        <input type="hidden" name="_captcha" value="false">
        <button class="button button--signal" type="submit">Transmit message <span aria-hidden="true">↗</span></button>
      </form>
    </section>`;
}

function renderProjects() {
  return `
    <section class="archive-hero">
      <div class="archive-hero__index">P / 01</div>
      <p class="kicker">Technical archive</p>
      <h1>Projects built to investigate, explain, and ship.</h1>
      <p>Product, analytics, research, and software work behind the security practice.</p>
    </section>
    <section class="archive-records" aria-label="Project archive">${siteData.projects.map(projectArchiveItem).join("")}</section>`;
}

function renderExperiences() {
  const securityExperiences = siteData.experiences.filter((item) => securityExperienceTitles.has(item.title));
  const otherExperiences = siteData.experiences.filter((item) => !securityExperienceTitles.has(item.title));

  return `
    <section class="archive-hero archive-hero--experience">
      <div class="archive-hero__index">E / 01</div>
      <p class="kicker">Career record</p>
      <h1>Security first. Technical range behind it.</h1>
      <p>Enterprise access, engineering, data, research, and leadership—organized by relevance and backed by the record.</p>
    </section>
    <section class="experience-section">
      ${sectionIntro("01", "Primary practice", "ERP security & identity access.")}
      <div class="experience-records">${securityExperiences.map(experienceRecord).join("")}</div>
    </section>
    <section class="experience-section">
      ${sectionIntro("02", "Technical foundation", "Engineering, data & leadership.")}
      <div class="archive-lines">${otherExperiences.map(compactExperience).join("")}</div>
    </section>`;
}

export function renderPage(pageName, basePath = "./") {
  assetBase = basePath;
  const app = document.querySelector("#app");
  if (!app) return;

  if (pageName === "home") app.innerHTML = renderHome();
  if (pageName === "projects") app.innerHTML = renderProjects();
  if (pageName === "experiences") app.innerHTML = renderExperiences();
}

export { siteData };
