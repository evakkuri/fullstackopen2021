import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsView from './components/PersonsView'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

  const handleInputFieldChange = (eventHandler) => {
    console.log(eventHandler)
    return ((event) => {
      console.log(event.target.value)
      eventHandler(event.target.value)
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("addNote", event.target)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    console.log(persons.map(person => person.name).includes(newName))

    persons.map(person => person.name).includes(newName)
      ? window.alert(`${newPerson.name} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currFilter={currFilter} onChangeFunction={handleInputFieldChange(setFilter)} />
      <h2>add a new</h2>
      <PersonForm
        nameValue={newName}
        nameChangeHandler={handleInputFieldChange(setNewName)}
        numberValue={newNumber}
        numberChangeHandler={handleInputFieldChange(setNewNumber)}
        addPersonHandler={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsView currFilter={currFilter} personsList={persons} />
    </div>
  )

}

export default App