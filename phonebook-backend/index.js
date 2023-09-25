
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

//AWS address (domain): phonebook220923.eu-north-1.elasticbeanstalk.com

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },  
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
    const dayte = new Date()
    const info = '<span>Phonebook has info for </span>' + persons.length
    + '<span> people</span><p></p>' + dayte
    response.send(info)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

function getName(person){
  return person.name
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.map(getName).includes(body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const n_person = {
    id: Math.floor((Math.random() * 10000) + 1),
    name: body.name,
    number: body.number
  }

  console.log("Myrsky")

  persons = persons.concat(n_person)

  response.json(n_person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})