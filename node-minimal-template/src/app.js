const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config()


const cors = require('cors')


const app = express();

app.use(cors())


// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/public', express.static(`../svelte-minimal-template/public`))
// allow cors from all - no hustle and never safe
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})

// Passport initialization
app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

app.use('/auth', require('./routes/auth'))

app.use('/api/user', require('./routes/user'))
app.use('/api/app', require('./routes/app'))
// start server
app.listen(3001, () => console.log("Server listening on http://localhost:3001"))
