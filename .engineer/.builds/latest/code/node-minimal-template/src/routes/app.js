const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const passport = require('passport');

const appService = require('../services/app');

const router = express();


router.use((req, res, next) => {
  const token = req.headers['authorization'];

  jwt.verify(token, JWT_KEY, function (err, data) {
      if (err) {
          res.status(401).send({ error: "NotAuthorized" })
      } else {
          req.user = data;
          next();
      }
  })
})

router.get('/', async (req, res) => {
  app = await appService.findMany()
  res.send(app);
})

router.get('/:id', async (req, res) => {
  app = await appService.findById(req.params.id)
  res.send(app);
})

router.post('/', async (req, res) =>{
  newApp = await appService.create(req.body, req.user)
  res.send(newApp)
})

router.put('/:id', async (req, res) =>{
  updatedApp = await appService.update(req.params.id, req.body)
  res.send({ updated : true, id : req.params.id})
})

router.delete('/:id', async (req, res) =>{
  deletedApp = await appService.delete(req.params.id)
  res.send({ deleted : true, id : req.params.id})
})

module.exports = router