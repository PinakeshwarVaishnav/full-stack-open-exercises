require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - Body::body'))
app.use(express.static('dist'))
const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

let persons = [

]

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
      console.log('phonebook: ', persons)
    })
    .catch(err => console.error('error in person.find: ', err))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const { name, number } = body

  Person.findOneAndUpdate(
    { name: name },
    { number: number },
    { new: true },
    { runValidators: true })
    .then(updatedEntry => {
      if (updatedEntry) {
        response.status(200).json(updatedEntry)
      }
      else {
        response.status(400).json({ message: 'no entry found with that name' })
      }
    })
    .catch(error => {
      next(error)
    })
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1e16)
  return String(randomId)
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const { name, number } = body

  if (typeof name !== 'string' || typeof number !== 'string') {
    console.log('invalid input type: ', body)
    return response.status(400).json({ error: 'invalid input type' })
  }
  else {
    const newPerson = new Person(body)
    newPerson.save()
      .then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        response.status(201).json(newPerson)
      })
      .catch(err => {
        next(err)
      })
  }
})

app.get('/info', (request, response) => {
  const requestTime = new Date().toISOString()
  response.send(`Phonebook has info for ${persons.length}<br/><br/>${requestTime}`)
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
