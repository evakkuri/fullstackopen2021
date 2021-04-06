import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsView from './components/PersonsView'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currFilter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleInputFieldChange = (eventHandler) => {
    return ((event) => {
      eventHandler(event.target.value)
    })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      console.log(`Person with name ${newName} is already in phonebook, confirming number update`)

      const toUpdate = window.confirm(
        `${newPerson.name} is already added to phonebook, replace old phone number with the one?`)

      if (toUpdate) {
        console.log(`User confirmed update for existing person ${newName}`)
        console.log(`Updating phone number for person ${newName} to ${newNumber}`)

        const personToUpdate = persons.find(p => p.name === newName)
        const updated = { ...personToUpdate, number: newNumber }

        personsService
          .updatePerson(personToUpdate.id, newPerson)
          .then(() => {
            setPersons(persons.map(p => p.id !== updated.id ? p : updated))
            setNewName('')
            setNewNumber('')
          })
      }

      else {
        console.log(`User cancelled phone number update for person ${newName}`)
      }
    }

    else {
      console.log("Creating new person", newPerson)
      personsService.createPerson(newPerson).then(createdPerson => {
        console.log("New person created successfully:", createdPerson)
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter currFilter={currFilter} onChangeFunction={handleInputFieldChange(setFilter)} />
      <h2>Add a new entry</h2>
      <PersonForm
        nameValue={newName}
        nameChangeHandler={handleInputFieldChange(setNewName)}
        numberValue={newNumber}
        numberChangeHandler={handleInputFieldChange(setNewNumber)}
        addPersonHandler={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsView currFilter={currFilter} personsList={persons} setPersons={setPersons} />
    </div>
  )

}

export default App