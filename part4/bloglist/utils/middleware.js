const { request } = require('express')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return response.status(401).json({ error: 'unauthorized access no token' })

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return response.sendstatus(403)
    request.user = user
    next()
  })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticateToken
}
