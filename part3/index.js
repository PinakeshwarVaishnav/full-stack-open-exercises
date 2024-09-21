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

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
  console.log(`person entry with the id ${id} deleted successfullly`)
})

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1e16)
  return String(randomId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    console.log('content missing', body)
    return response.status(400).json({ error: 'content missing' })
  }

  const nameExists = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())

  if (nameExists) {
    console.log(body.name, ' already exists')
    return response.status(400).json({ error: `${body.name} already exists in the phonebook` })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  console.log('New entry created successfully', person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const requestTime = new Date().toISOString()
  response.send(`Phonebook has info for ${persons.length}<br/><br/>${requestTime}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
