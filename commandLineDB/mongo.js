const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

function addPerson (newName, newNumber) {
  
  const person = new Person({
    name: newName,
    number: newNumber
  })
  
  person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

function listPersons () {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const password = process.argv[2]

const url =
  `mongodb+srv://WilderA:${password}@sep23.9ugrs9r.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

if (process.argv.length<3) {
  console.log('give password as argument')
} else if (process.argv.length == 3){
  listPersons()
} else {
  addPerson(process.argv[3], process.argv[4])
}