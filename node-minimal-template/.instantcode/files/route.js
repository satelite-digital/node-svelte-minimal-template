const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const passport = require('passport');

const {{id}}Service = require('../services/{{id}}');

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
  {{id}} = await {{id}}Service.findMany()
  res.send({{id}});
})

router.get('/:id', async (req, res) => {
  {{id}} = await {{id}}Service.findById(req.params.id)
  res.send({{id}});
})

router.post('/', async (req, res) =>{
  new{{capitalized}} = await {{id}}Service.create(req.body, req.user)
  res.send(new{{capitalized}})
})

router.put('/:id', async (req, res) =>{
  updated{{capitalized}} = await {{id}}Service.update(req.params.id, req.body)
  res.send({ updated : true, id : req.params.id})
})

router.delete('/:id', async (req, res) =>{
  deleted{{capitalized}} = await {{id}}Service.delete(req.params.id)
  res.send({ deleted : true, id : req.params.id})
})

module.exports = router