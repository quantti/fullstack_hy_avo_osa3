const mongoose = require('mongoose')

const url = 'mongodb://vankari:testipassu1@ds245680.mlab.com:45680/testikanta'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

if (process.argv[2]) {
  person
    .save()
    .then(() => {
      console.log('Lisätään henkilö ' + person.name + ' numero ' + person.number + ' luetteloon')
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(result => {
      console.log('Puhelinluettelo: ')
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
}

