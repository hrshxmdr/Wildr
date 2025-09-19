const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || undefined;
      if (!email) return done(null, false);
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          username: profile.displayName || 'Google User',
          email,
          password: 'google-oauth',
        });
      }
      return done(null, user);
    } catch (e) { return done(e); }
  }));
}

module.exports = passport;
