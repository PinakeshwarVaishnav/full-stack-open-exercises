const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://pinakeshwarvtech:${password}@cluster0.ebubh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  Number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = // code for creating new phonebook person entry by taking the arguments from the command line while entering the command 'node mongo.js your_password name number' and then you have to take that input and put it in the database as well as do something about id, maybe generate it using a function of math.random or something

  person.save().then(result => {
    console.log()
    mongoose.connection.close()
  })
