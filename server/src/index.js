import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import passport from './auth.js';
import { config } from './config.js';
import { connectDatabase } from './db.js';
import Faq from './models/Faq.js';
import News from './models/News.js';
import Suggestion from './models/Suggestion.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: 'Authentification requise' });
}

async function seedDatabase() {
  const faqCount = await Faq.countDocuments();
  if (faqCount === 0) {
    await Faq.insertMany([
      {
        question: 'Comment devenir modérateur ?',
        answer: 'Les modérateurs sont sélectionnés selon leur implication, leur comportement et leur disponibilité. Vous pouvez participer activement et demander une candidature sur le Discord.'
      },
      {
        question: 'Comment signaler un comportement abusif ?',
        answer: 'Utilisez le canal de signalement ou contactez directement un modérateur. Les preuves ou captures d’écran sont toujours utiles.'
      },
      {
        question: 'Quand ont lieu les événements ?',
        answer: 'Les événements sont annoncés dans les channels de nouveautés et dans le salon d’annonce du serveur.'
      }
    ]);
  }

  const newsCount = await News.countDocuments();
  if (newsCount === 0) {
    await News.insertMany([
      {
        title: 'Nouveau salon de soutien',
        content: 'Nous avons ajouté un nouveau salon dédié à l’entraide et aux questions du quotidien. Rejoignez-nous pour échanger !',
        author: 'Équipe du serveur'
      },
      {
        title: 'Événement communautaire du week-end',
        content: 'Un événement spécial aura lieu ce samedi avec mini-jeux, cadeaux et surprises pour la communauté.',
        author: 'Équipe du serveur'
      }
    ]);
  }

  const suggestionCount = await Suggestion.countDocuments();
  if (suggestionCount === 0) {
    await Suggestion.insertMany([
      {
        user: null,
        username: 'Communauté',
        avatar: null,
        title: 'Créer un salon de partage de projets',
        description: 'Un espace pour présenter des idées, projets et créations de la communauté serait très utile.',
        votes: 9,
        status: 'open'
      },
      {
        user: null,
        username: 'Communauté',
        avatar: null,
        title: 'Ajouter des événements hebdomadaires',
        description: 'Des événements réguliers permettraient de renforcer l’engagement du serveur.',
        votes: 7,
        status: 'open'
      }
    ]);
  }
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, status: 'Server is running' });
});

app.get('/auth/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,
      role: req.user.role
    }
  });
});

app.get('/auth/discord', passport.authenticate('discord', { scope: ['identify', 'email'] }));

app.get(
  '/auth/discord/callback',
  passport.authenticate('discord', {
    failureRedirect: `${config.clientUrl}/?error=auth-failed`
  }),
  (_req, res) => {
    res.redirect(`${config.clientUrl}/?auth=success`);
  }
);

app.get('/auth/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy(() => {
      res.redirect(config.clientUrl);
    });
  });
});

app.get('/api/config', (_req, res) => {
  res.json({
    discordAuthEnabled: Boolean(config.discordClientId && config.discordClientSecret),
    clientUrl: config.clientUrl
  });
});

app.get('/api/faq', async (_req, res) => {
  const items = await Faq.find().sort({ createdAt: 1 });
  res.json(items);
});

app.get('/api/news', async (_req, res) => {
  const items = await News.find().sort({ createdAt: -1 });
  res.json(items);
});

app.get('/api/suggestions', async (_req, res) => {
  const items = await Suggestion.find().sort({ votes: -1, createdAt: -1 });
  res.json(items);
});

app.post('/api/suggestions', ensureAuthenticated, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Titre et description requis' });
  }

  const suggestion = await Suggestion.create({
    user: req.user._id,
    username: req.user.username,
    avatar: req.user.avatar,
    title,
    description,
    votes: 1,
    status: 'open'
  });

  return res.status(201).json(suggestion);
});

app.post('/api/suggestions/:id/vote', ensureAuthenticated, async (req, res) => {
  const suggestion = await Suggestion.findById(req.params.id);

  if (!suggestion) {
    return res.status(404).json({ message: 'Suggestion introuvable' });
  }

  suggestion.votes += 1;
  await suggestion.save();

  return res.json(suggestion);
});

const distPath = path.join(__dirname, '../../client/dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
      return next();
    }

    return res.sendFile(path.join(distPath, 'index.html'));
  });
}

async function start() {
  await connectDatabase();
  await seedDatabase();

  app.listen(config.port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${config.port}`);
  });
}

start();
