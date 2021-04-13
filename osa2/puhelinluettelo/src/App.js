import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonsView from './components/PersonsView'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currFilter, setFilter] = useState('')
  const [messageObj, setMessageObj] = useState(null)

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

  const updatePerson = (newPerson) => {
    console.log(`Person with name ${newName} is already in phonebook, confirming number update`)

    const toUpdate = window.confirm(
      `${newPerson.name} is already added to phonebook, replace old phone number with the new one?`)

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

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      updatePerson(newPerson)
    }

    else {
      console.log("Creating new person", newPerson)
      personsService
        .createPerson(newPerson)
        .then(createdPerson => {
          console.log("New person created successfully:", createdPerson)

          setPersons(persons.concat(createdPerson))

          setMessageObj({
            type: "successmsg",
            text: `Added ${newName}`
          })

          setTimeout(() => {
            setMessageObj(null)
          }, 2500)

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)

          setMessageObj({
            type: "errormsg",
            text: error.response.data.error
          })

          setTimeout(() => {
            setMessageObj(null)
          }, 2500)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageObj={messageObj} />
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
      <PersonsView
        currFilter={currFilter}
        personsList={persons}
        setPersons={setPersons}
        setMessageObj={setMessageObj}
      />
    </div>
  )

}

export default App