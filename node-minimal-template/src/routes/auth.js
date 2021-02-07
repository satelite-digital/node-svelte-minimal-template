const express = require('express');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const { Strategy } = require('passport-github');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const users = require('../services/user');
const JWT_KEY = process.env.JWT_KEY

const router = express();

// Use github strategy
passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/github/callback`
},

function (accessToken, refreshToken, profile, done) {
  users.findOrCreate(profile);
  return done(null, profile);
}
));

// Use google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/auth/google/callback`
},

function (token, refreshToken, profile, cb) {
  users.findOrCreate(profile);
  return cb(null, profile);
}
));

router.get('/self', async (req, res, next)=>{
  const token = req.headers['authorization'];

  jwt.verify(token, JWT_KEY, async (err, data)=>{
      if (err) {
          res.status(401).send({ error: "NotAuthorized" })
      } else {
          const user = await users.findMany({ where : { oAuthId : data.id }})
          console.log(user)
          if(user && user.length){
            res.send(user[0])
          }else{
            res.status(401).send({ error: "NotAuthorized" })
          }
      }
  })

})

// Github auth route and callback
router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', { scope: [], state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  next();
});

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      if (err) return next(err);
      res.redirect(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/#/login?token=${token}`)
    });
        
  },
);

// Google auth route and callback
router.get('/google', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('google', { scope: 'openid profile email', state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  next();
});

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, process.env.JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      if (err) return next(err); ;
      res.redirect(`${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/#/login?token=${token}`)
    });
        
  },
);


module.exports = router;