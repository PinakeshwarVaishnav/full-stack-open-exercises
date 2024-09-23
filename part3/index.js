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
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
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

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const { name, number } = body

  Person.findOneAndUpdate(
    { name: name },
    { number: number },
    { new: true })
    .then(updatedEntry => {
      if (updatedEntry) {
        response.status(200).json(updatedEntry)
      }
      else {
        response.status(400).json({ message: 'no entry found with that name' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
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

app.post('/api/persons', (request, response) => {
  const body = request.body
  const { name, number } = body

  if (typeof name !== 'string' || typeof number !== 'number') {
    console.log('invalid input: ', body)
    return response.status(400).json({ error: 'invalid input' })
  }
  else {
    const newPerson = new Person(body)
    newPerson.save()
      .then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        response.status(201).json(newPerson)
      })
      .catch(err => {
        console.error(`error in saving ${newPerson} to the database`, err)
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
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
