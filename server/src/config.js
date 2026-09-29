import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  sessionSecret: process.env.SESSION_SECRET || 'super-secret-session-key',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/discord-server-site',
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
  discordCallbackUrl: process.env.DISCORD_CALLBACK_URL || 'http://localhost:5000/auth/discord/callback'
};
