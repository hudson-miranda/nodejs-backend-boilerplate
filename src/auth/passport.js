const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      if (!user || user.isDeleted) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));
};
