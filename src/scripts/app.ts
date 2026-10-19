/**
 * Client behavior for the single-page portfolio: theme switching, EN/ES
 * text swapping, mobile menu, project filters, stack tabs, copy buttons,
 * the demo contact form with live issue preview, the decorative activity
 * grid, reveal-on-scroll, section scroll-spy and the footer clock.
 *
 * Markup carries `data-i18n` / `data-i18n-ph` / `data-i18n-aria` keys;
 * this module swaps their values in place, mirroring the dictionary
 * the server used to render the English defaults.
 */
import { I18N, type Lang } from "../data/i18n";

const CONTACT_EMAIL = "ariellazaro444@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const root = document.documentElement;
let lang: Lang = root.getAttribute("data-lang") === "es" ? "es" : "en";
let theme: "dark" | "light" = root.getAttribute("data-theme") === "light" ? "light" : "dark";
let sent = false;

function t(key: string): string {
  const value = I18N[lang]?.[key] ?? I18N.en[key];
  return value ?? "";
}

/** Run `fn` over every element matching `selector`. */
function each<T extends Element>(selector: string, fn: (el: T) => void): void {
  document.querySelectorAll<T>(selector).forEach(fn);
}

/* ---------- theme ---------- */

const themeBtn = document.getElementById("themeBtn") as HTMLButtonElement | null;

function paintTheme(): void {
  each("[data-theme-icon]", (el) => {
    (el as HTMLElement).style.display = el.getAttribute("data-theme-icon") === theme ? "" : "none";
  });
  const meta = document.getElementById("themeColor");
  if (meta) meta.setAttribute("content", theme === "light" ? "#f7f7f9" : "#141419");
  if (themeBtn) {
    const label = t(theme === "dark" ? "ctrl.toLight" : "ctrl.toDark");
    themeBtn.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
    themeBtn.setAttribute("aria-label", label);
    themeBtn.setAttribute("title", label);
  }
}

function setTheme(next: string, persist: boolean): void {
  theme = next === "light" ? "light" : "dark";
  root.setAttribute("data-theme", theme);
  if (persist) {
    try { localStorage.setItem("al.theme", theme); } catch { /* storage blocked */ }
  }
  paintTheme();
}

themeBtn?.addEventListener("click", () => setTheme(theme === "dark" ? "light" : "dark", true));

if (window.matchMedia) {
  try {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("al.theme"); } catch { /* storage blocked */ }
      if (!saved) setTheme(e.matches ? "light" : "dark", false);
    });
  } catch { /* older Safari lacks addEventListener on MediaQueryList */ }
}

/* ---------- language ---------- */

const langBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".lang button"));
const photoImg = document.getElementById("photoImg");
if (photoImg) photoImg.addEventListener("error", () => { photoImg.style.display = "none"; });

function setLang(next: string, persist: boolean): void {
  lang = next === "es" ? "es" : "en";
  root.setAttribute("data-lang", lang);
  root.lang = lang;
  if (persist) {
    try { localStorage.setItem("al.lang", lang); } catch { /* storage blocked */ }
  }
  each("[data-i18n]", (el) => {
    const value = t(el.getAttribute("data-i18n") ?? "");
    if (value) el.textContent = value;
  });
  each("[data-i18n-ph]", (el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph") ?? ""));
  });
  each("[data-i18n-aria]", (el) => {
    const value = t(el.getAttribute("data-i18n-aria") ?? "");
    if (value) el.setAttribute("aria-label", value);
  });
  // Per-language file links (e.g. CV download button): swap href + filename.
  each("a[data-href-en][data-href-es]", (el) => {
    const href = el.getAttribute(`data-href-${lang}`) ?? el.getAttribute("data-href-en");
    if (href) (el as HTMLAnchorElement).setAttribute("href", href);
  });
  langBtns.forEach((b) => {
    b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
  });
  paintTheme();
  updateCount();
  renderPreview();
  resetSubmit();
  clock();
}

langBtns.forEach((b) => {
  b.addEventListener("click", () => setLang(b.getAttribute("data-lang") ?? "en", true));
});

/* ---------- mobile menu ---------- */

const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn") as HTMLButtonElement | null;

function menuClose(): void {
  if (!navLinks || !menuBtn) return;
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.addEventListener("click", (e) => {
    if ((e.target as Element | null)?.closest("a")) menuClose();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menuClose();
  });
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !(e.target as Element | null)?.closest(".nav")) menuClose();
  });
}

/* ---------- project filters ---------- */

const filterBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".filter-btn"));
const cards = Array.from(document.querySelectorAll<HTMLElement>("#workGrid .case"));
const countEl = document.getElementById("workCount");
const emptyEl = document.getElementById("workEmpty");
let shown = cards.length;

function updateCount(): void {
  if (!countEl) return;
  countEl.textContent = t("projects.count").replace("{n}", String(shown)).replace("{m}", String(cards.length));
}

function applyFilter(filter: string): void {
  let visible = 0;
  cards.forEach((card) => {
    const lanes = card.getAttribute("data-lanes") ?? "";
    const ok = filter === "all" || lanes.split(" ").indexOf(filter) > -1;
    card.style.display = ok ? "" : "none";
    if (ok) visible++;
  });
  shown = visible;
  if (emptyEl) emptyEl.hidden = visible > 0;
  updateCount();
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    applyFilter(btn.getAttribute("data-filter") ?? "all");
  });
});

/* ---------- stack tabs (roving tabindex + arrow keys) ---------- */

const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
const panes = Array.from(document.querySelectorAll<HTMLElement>("[data-pane]"));

function selectTab(index: number): void {
  tabs.forEach((tab, i) => {
    const on = index === i;
    tab.setAttribute("aria-selected", on ? "true" : "false");
    tab.tabIndex = on ? 0 : -1;
  });
  panes.forEach((pane, i) => {
    const on = index === i;
    pane.classList.toggle("active", on);
    if (on) pane.removeAttribute("hidden");
    else pane.setAttribute("hidden", "");
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(i));
  tab.addEventListener("keydown", (e) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      tabs[next]?.focus();
      selectTab(next);
    }
  });
});

/* ---------- copy to clipboard ---------- */

const copyStatus = document.getElementById("copyStatus");

function copyText(text: string, btn: HTMLButtonElement): void {
  const key = btn.getAttribute("data-copy-key") ?? "form.copy";
  const done = (ok: boolean) => {
    btn.textContent = t(ok ? "form.copied" : "form.copyFail");
    if (copyStatus) copyStatus.textContent = (ok ? t("form.copied") : t("form.copyFail")) + ": " + text;
    setTimeout(() => {
      btn.textContent = t(key);
      if (copyStatus) copyStatus.textContent = "";
    }, 1800);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => done(true), () => done(false));
    return;
  }
  // Fallback for non-secure contexts.
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { /* unsupported */ }
  document.body.removeChild(ta);
  done(ok);
}

each<HTMLButtonElement>(".copy-btn", (btn) => {
  btn.setAttribute("aria-live", "polite");
  btn.addEventListener("click", () => copyText(CONTACT_EMAIL, btn));
});

/* ---------- contact form + live preview ---------- */

const form = document.getElementById("contactForm") as HTMLFormElement | null;
const nameEl = document.getElementById("fName") as HTMLInputElement | null;
const emailEl = document.getElementById("fEmail") as HTMLInputElement | null;
const msgEl = document.getElementById("fMsg") as HTMLTextAreaElement | null;
const typeEl = document.getElementById("fType") as HTMLSelectElement | null;
const okBox = document.getElementById("formOk");
const formStatus = document.getElementById("formStatus");
const submitBtn = form?.querySelector<HTMLButtonElement>('[type="submit"]') ?? null;

type Rule = [field: HTMLInputElement | HTMLTextAreaElement, errorId: string, valid: (value: string) => boolean];

const rules: Rule[] = [];
if (nameEl) rules.push([nameEl, "eName", (v) => v.trim().length >= 2]);
if (emailEl) rules.push([emailEl, "eEmail", (v) => EMAIL_RE.test(v.trim())]);
if (msgEl) rules.push([msgEl, "eMsg", (v) => v.trim().length >= 20]);

function flagField(field: HTMLInputElement | HTMLTextAreaElement, errorId: string, bad: boolean): void {
  const err = document.getElementById(errorId);
  if (err) err.style.display = bad ? "block" : "none";
  field.setAttribute("aria-invalid", bad ? "true" : "false");
}

function resetSubmit(): void {
  if (submitBtn) submitBtn.textContent = sent ? t("form.sent") : t("form.send");
}

function renderPreview(): void {
  const pvTitle = document.getElementById("pvTitle");
  const pvBody = document.getElementById("pvBody");
  const pvLabel = document.getElementById("pvLabel");
  if (!pvTitle || !pvBody || !pvLabel || !nameEl) return;
  pvLabel.textContent = typeEl?.value ?? "";
  pvTitle.textContent = t("form.pvFrom") + " " + (nameEl.value.trim() || "Ada Lovelace");
  pvBody.textContent = (msgEl?.value.trim() || t("form.pvBody")) + " — " + (emailEl?.value.trim() || "ada@company.com");
}

if (form && nameEl && emailEl && msgEl && typeEl) {
  rules.forEach(([field, errorId, valid]) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") flagField(field, errorId, !valid(field.value));
    });
  });
  [nameEl, emailEl, msgEl].forEach((el) => el.addEventListener("input", renderPreview));
  typeEl.addEventListener("change", renderPreview);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstBad: HTMLInputElement | HTMLTextAreaElement | null = null;
    rules.forEach(([field, errorId, valid]) => {
      const bad = !valid(field.value);
      flagField(field, errorId, bad);
      if (bad && !firstBad) firstBad = field;
    });
    if (firstBad) {
      if (okBox) okBox.style.display = "none";
      if (formStatus) formStatus.textContent = t("form.fix");
      firstBad.focus();
      return;
    }
    if (formStatus) formStatus.textContent = "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = t("form.sending");
    }
    // Demo only: simulate a round-trip, then confirm.
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
      sent = true;
      resetSubmit();
      if (okBox) okBox.style.display = "block";
    }, 900);
  });

  renderPreview();
}

/* ---------- decorative activity grid ---------- */

const heat = document.getElementById("heatCells");
if (heat) {
  // Bounded rhythm: a few dense weeks among quieter ones.
  const levels: number[] = [0, 0, 1, 0, 2, 1, 0, 0, 3, 2, 1, 0, 0, 1, 2, 0, 0, 0, 1, 3, 2, 1, 0, 0, 1, 0, 2, 1, 0, 3, 1, 2, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 2, 3, 1, 0, 0, 0, 1, 2, 0, 1, 0, 0, 3, 2, 0, 1, 0, 0, 1, 2, 0, 0, 1, 0, 2, 1, 3, 0, 0, 1, 0, 0, 2, 1, 0, 0, 3, 2, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 3, 1, 2, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 3];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 104; i++) {
    const cell = document.createElement("i");
    const level = levels[i % levels.length] ?? 0;
    if (level === 1) cell.className = "l1";
    else if (level === 2) cell.className = "l2";
    else if (level === 3) cell.className = "l3";
    fragment.appendChild(cell);
  }
  heat.appendChild(fragment);
}

/* ---------- reveal on scroll ---------- */

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  each(".reveal", (el) => io.observe(el));
} else {
  each(".reveal", (el) => el.classList.add("on"));
}

/* ---------- scroll spy ---------- */

const railLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("#railNav a"));
const topLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
const spySections = ["hero", "about", "projects", "stack", "experience", "code", "contact"]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => el !== null);

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      railLinks.forEach((a) => {
        const on = a.getAttribute("href") === id;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      topLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  spySections.forEach((section) => spy.observe(section));
}

/* ---------- footer clock ---------- */

const footTime = document.getElementById("footTime");

function clock(): void {
  if (!footTime) return;
  try {
    const time = new Date().toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    footTime.textContent = time + " " + t("footer.local");
  } catch { /* locale formatting unavailable */ }
}

setInterval(clock, 30000);

// Background tabs get their timers throttled (Chrome coalesces them to ~1 per
// 10 min after a while, and pauses everything while asleep), so the footer
// could show a several-minutes-old time when returning to the tab. Repaint at
// the instant the page becomes visible again.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") clock();
});
addEventListener("pageshow", (e) => {
  if (e.persisted) clock(); // restored from the back/forward cache
});

/* ---------- boot ---------- */

paintTheme();
setLang(lang, false);
