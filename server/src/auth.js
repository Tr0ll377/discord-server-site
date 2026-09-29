import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import User from './models/User.js';
import { config } from './config.js';

passport.use(
  new DiscordStrategy(
    {
      clientID: config.discordClientId,
      clientSecret: config.discordClientSecret,
      callbackURL: config.discordCallbackUrl,
      scope: ['identify', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ discordId: profile.id });

        if (existingUser) {
          existingUser.username = profile.username;
          existingUser.avatar = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;
          existingUser.email = profile.email || existingUser.email;
          await existingUser.save();
          return done(null, existingUser);
        }

        const newUser = await User.create({
          discordId: profile.id,
          username: profile.username,
          avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
          email: profile.email || null,
          role: 'member'
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
