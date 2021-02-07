const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const passport = require('passport');

const userService = require('../services/user');

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
  user = await userService.findMany()
  res.send(user);
})

router.get('/:id', async (req, res) => {
  user = await userService.findById(req.params.id)
  res.send(user);
})

router.post('/', async (req, res) =>{
  newUser = await userService.create(req.body, req.user)
  res.send(newUser)
})

router.put('/:id', async (req, res) =>{
  updatedUser = await userService.update(req.params.id, req.body)
  res.send({ updated : true, id : req.params.id})
})

router.delete('/:id', async (req, res) =>{
  deletedUser = await userService.delete(req.params.id)
  res.send({ deleted : true, id : req.params.id})
})

module.exports = router