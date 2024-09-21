const mongoose = require('mongoose');

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://pinakeshwarvtech:${password}@cluster0.ebubh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => console.log('mongodb connected'))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
    .catch(err => console.error('error in person.find ', err))
}

else if (process.argv.length < 5) {
  console.log('give password, name and number as argument')
  process.exit(1)
}

else if (process.argv.length === 5) {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  }).catch(err => {
    console.error(`error in saving ${person} to the database`)
    mongoose.connection.close().then(() => console.log('connection closed'))
      .catch(closeErr => console.error('Error closing connection :', closeErr))
  })
}
