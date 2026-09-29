:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  color: #edf2ff;
  background: #0b1020;
  line-height: 1.6;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg: #0b1020;
  --panel: rgba(15, 23, 42, 0.85);
  --panel-strong: #101827;
  --accent: #8b5cf6;
  --accent-2: #22c55e;
  --muted: #a8b3cf;
  --line: rgba(148, 163, 184, 0.18);
  --shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(99, 102, 241, 0.3), transparent 35%),
    linear-gradient(180deg, #0b1020 0%, #111827 100%);
  color: #edf2ff;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

.page-shell {
  width: min(1200px, 90vw);
  margin: 0 auto;
  padding-bottom: 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #22c55e);
  box-shadow: 0 0 24px rgba(139, 92, 246, 0.8);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
}

.nav-links a {
  transition: color 0.25s ease;
}

.nav-links a:hover {
  color: white;
}

.auth-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-pill {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #d8cbff;
  font-size: 0.9rem;
}

.primary-btn,
.secondary-btn,
.vote-btn {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-btn,
.secondary-btn {
  padding: 12px 18px;
  font-weight: 600;
}

.primary-btn {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  box-shadow: var(--shadow);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid var(--line);
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover,
.vote-btn:hover {
  transform: translateY(-1px);
}

.secondary-link {
  color: #d7dff7;
  font-weight: 600;
}

.hero {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 28px;
  padding: 42px 0 30px;
  align-items: center;
}

.hero-copy,
.hero-card,
.faq-item,
.news-card,
.suggestion-card,
.social-block,
.suggestion-form {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.hero-copy {
  padding: 42px;
}

.badge,
.news-tag,
.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  color: #d9d2ff;
}

.hero-copy h1 {
  margin: 18px 0 14px;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.06;
}

.hero-copy p {
  margin: 0;
  color: var(--muted);
  font-size: 1.08rem;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 26px;
}

.hero-card {
  padding: 28px;
}

.hero-card h3 {
  margin-top: 0;
  font-size: 1.4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.stats-grid div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 14px;
  border-radius: 18px;
  background: rgba(148, 163, 184, 0.04);
  border: 1px solid var(--line);
}

.stats-grid strong {
  font-size: 1.5rem;
}

.stats-grid span {
  color: var(--muted);
  font-size: 0.88rem;
}

.content-block {
  padding-top: 50px;
}

.section-heading {
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 10px 0 0;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
}

.alt-bg {
  padding-top: 64px;
}

.faq-list,
.news-grid,
.suggestions-list,
.social-grid {
  display: grid;
  gap: 18px;
}

.faq-list {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.faq-item,
.news-card,
.suggestion-card {
  padding: 22px 20px;
}

.faq-item h3,
.news-card h3,
.suggestion-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.faq-item p,
.news-card p,
.suggestion-card p {
  margin: 0;
  color: var(--muted);
}

.news-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.news-card small {
  display: block;
  margin-top: 16px;
  color: #d7dff7;
}

.suggestion-form {
  display: grid;
  gap: 18px;
  padding: 28px;
  margin-bottom: 20px;
}

.field-group {
  display: grid;
  gap: 8px;
}

.field-group label {
  color: #deebff;
  font-weight: 600;
}

.field-group input,
.field-group textarea {
  width: 100%;
  background: rgba(15, 23, 42, 0.7);
  color: white;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  resize: vertical;
}

.field-group input:focus,
.field-group textarea:focus {
  outline: 2px solid rgba(139, 92, 246, 0.4);
  border-color: rgba(139, 92, 246, 0.5);
}

.notice {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #d5fbe2;
  margin-bottom: 18px;
}

.suggestions-list {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.suggestion-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.suggestion-head small {
  color: #d8cbff;
}

.vote-btn {
  padding: 10px 12px;
  background: rgba(34, 197, 94, 0.12);
  color: #d6ffe8;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.social-block {
  margin-top: 48px;
  padding: 24px 28px;
}

.social-grid {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.social-grid a {
  display: block;
  text-align: center;
  padding: 16px 12px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid var(--line);
  color: #edf2ff;
}

.footer {
  padding: 32px 0 12px;
  text-align: center;
  color: var(--muted);
}

@media (max-width: 820px) {
  .topbar,
  .hero {
    grid-template-columns: 1fr;
    display: grid;
  }

  .topbar {
    gap: 12px;
    text-align: center;
  }

  .nav-links,
  .auth-box,
  .cta-row {
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-links {
    display: flex;
  }

  .hero-copy,
  .hero-card,
  .suggestion-form {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
