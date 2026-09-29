import { useEffect, useState } from 'react';

const API_BASE = '';
const DISCORD_INVITE = 'https://discord.gg/9jPDygrhM';

function App() {
  const [auth, setAuth] = useState({ authenticated: false, user: null });
  const [faq, setFaq] = useState([]);
  const [news, setNews] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(options.body ? { 'Content-Type': 'application/json' } : {})
      }
    });
    if (!response.ok) throw new Error(await response.text() || 'Erreur réseau');
    return response.headers.get('content-type')?.includes('application/json') ? response.json() : null;
  }

  async function loadPageData() {
    try {
      const [faqData, newsData, suggestionsData, authData] = await Promise.all([
        fetchJson(`${API_BASE}/api/faq`),
        fetchJson(`${API_BASE}/api/news`),
        fetchJson(`${API_BASE}/api/suggestions`),
        fetchJson(`${API_BASE}/auth/me`).catch(() => ({ authenticated: false, user: null }))
      ]);
      setFaq(faqData || []);
      setNews(newsData || []);
      setSuggestions(suggestionsData || []);
      setAuth(authData || { authenticated: false, user: null });
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => { loadPageData(); }, []);

  function handleLogin() { window.location.href = `${API_BASE}/auth/discord`; }
  function handleLogout() { window.location.href = `${API_BASE}/auth/logout`; }

  async function handleVote(id) {
    if (!auth.authenticated) return setMessage('Connectez-vous pour voter sur une suggestion.');
    try {
      const updated = await fetchJson(`${API_BASE}/api/suggestions/${id}/vote`, { method: 'POST' });
      setSuggestions((items) => items.map((item) => item._id === updated._id ? updated : item));
    } catch (error) { setMessage(error.message); }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!auth.authenticated) return setMessage('Vous devez être connecté avec Discord pour soumettre une suggestion.');
    try {
      const created = await fetchJson(`${API_BASE}/api/suggestions`, { method: 'POST', body: JSON.stringify(formData) });
      setSuggestions((items) => [created, ...items]);
      setFormData({ title: '', description: '' });
      setMessage('Votre suggestion a bien été publiée.');
    } catch (error) { setMessage(error.message); }
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand-block" href="#home"><span className="brand-dot" /><span>ServerName</span></a>
        <nav className="nav-links">
          <a href="#faq">FAQ</a><a href="#news">Nouveautés</a><a href="#suggestions">Suggestions</a><a href="#socials">Réseaux</a>
        </nav>
        <div className="auth-box">
          {auth.authenticated ? <><span className="user-pill">{auth.user?.username}</span><button className="secondary-btn" onClick={handleLogout}>Déconnexion</button></> : <button className="primary-btn" onClick={handleLogin}>Connexion Discord</button>}
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <span className="badge">Communauté Discord</span>
            <h1>Bienvenue dans notre univers.</h1>
            <p>Un espace convivial pour discuter, jouer, partager vos idées et suivre toutes les nouveautés du serveur.</p>
            <div className="cta-row"><a className="primary-btn" href={DISCORD_INVITE} target="_blank" rel="noreferrer">Rejoindre le serveur</a><a href="#suggestions" className="secondary-link">Découvrir les idées</a></div>
          </div>
          <div className="hero-card"><h3>La communauté en quelques chiffres</h3><div className="stats-grid"><div><strong>3.5K+</strong><span>Membres</span></div><div><strong>90+</strong><span>Événements</span></div><div><strong>24/7</strong><span>Présence</span></div></div></div>
        </section>

        <section id="news" className="content-block"><div className="section-heading"><p className="eyebrow">Nouveautés</p><h2>Les dernières annonces</h2></div><div className="news-grid">{news.map((item) => <article className="news-card" key={item._id || item.title}><span className="news-tag">Annonce</span><h3>{item.title}</h3><p>{item.content}</p><small>{item.author}</small></article>)}</div></section>
        <section id="faq" className="content-block"><div className="section-heading"><p className="eyebrow">Aide</p><h2>Questions fréquentes</h2></div><div className="faq-list">{faq.map((item) => <article className="faq-item" key={item._id || item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>

        <section id="suggestions" className="content-block"><div className="section-heading"><p className="eyebrow">Participation</p><h2>Suggestions de la communauté</h2></div>{message && <div className="notice">{message}</div>}<form className="suggestion-form" onSubmit={handleSubmit}><div className="field-group"><label htmlFor="title">Titre</label><input id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} placeholder="Ex : Ajouter un salon musique" required /></div><div className="field-group"><label htmlFor="description">Description</label><textarea id="description" rows="5" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} placeholder="Expliquez votre idée..." required /></div><button type="submit" className="primary-btn">Publier une suggestion</button></form><div className="suggestions-list">{suggestions.map((item) => <article className="suggestion-card" key={item._id || item.title}><div className="suggestion-head"><div><h3>{item.title}</h3><small>{item.username}</small></div><button type="button" className="vote-btn" onClick={() => handleVote(item._id)}>▲ {item.votes}</button></div><p>{item.description}</p></article>)}</div></section>

        <section id="socials" className="content-block social-block"><div className="section-heading"><p className="eyebrow">Retrouvez-nous</p><h2>Nos réseaux</h2></div><div className="social-grid"><a className="discord-link" href={DISCORD_INVITE} target="_blank" rel="noreferrer">💬 Rejoindre Discord</a><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a><a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a></div></section>
      </main>
      <footer className="footer"><p>© 2026 ServerName — Une communauté pour tous</p></footer>
    </div>
  );
}

export default App;
