const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { response, request } = require('express')

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  if (username === undefined) {
    return response.status(400).json({ error: 'username missing' })

  } else if (password === undefined) {
    return response.status(400).json({ error: 'password missing' })
  } else if (username.length < 3) {
    return response.status(400).json({ error: 'username length must be atleast 3 characters long' })
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'password length must be atleast 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, })
  response.json(users)
})

module.exports = usersRouter
