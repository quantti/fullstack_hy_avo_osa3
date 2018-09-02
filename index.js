const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('content', (req, res) => { return JSON.stringify(req.body)})
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(Person.format(person))
    })
    .catch(error => {
      res.status(400).send({ error: 'malformatted id or person not found'})
    })
  /* if (person) {
    res.status(200).json(person)
  } else {
    res.status(400).end()
  } */
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id'})
    })

  
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if ( body.name.length === 0 || body.number.length === 0 ) {
    return res.status(400).json({error: 'nimi tai numero puuttuu'})
  }

  /* let unique = true

  persons.forEach(person => {
    if ( person.name === body.name ) {
      unique = false
    }
  })

  if ( !unique ) {
    return res.status(400).json({error: 'nimi löytyy jo luettelosta!'})
  } */

  const person = new Person({
    name: body.name,
    number: body.number
  })

  Person
    .find({ name: person.name })
    .then(result => {
      if (result.length > 0) {
        return res.status(400).send({ error: 'nimi löytyy jo luettelosta '})
      } else {
        person
          .save()
          .then(savedPerson => {
            res.json(Person.format(savedPerson))
          })
          .catch(error => {
            console.log('error: ', error)
          })
      }
    })
    .catch(error => {
      res.status(400).json({error: 'jotain meni vikaan'})
    })



    /* .save()
    .then(savedPerson => {
      res.json(Person.format(savedPerson))
    })
    .catch(error => {
      console.log(error)
    }) */
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body
  if ( body.number.length === 0 ) {
    return res.status(400).json({error: 'numero puuttuu'})
  }

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findOneAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log('error: ', error)
      res.status(400).send({ error: 'malformatted or wrong id'})
    })
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.send('<p>Puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p><p>' + new Date() + '</p>')
    })
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
