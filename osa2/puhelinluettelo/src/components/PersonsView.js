import personsService from '../services/persons'

const DeleteButton = ({ personToDelete, allPersons, setPersons, setMessageObj }) => {
  const deletePerson = () => {
    console.log(`Confirming deletion for person ${personToDelete.id}`)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      console.log(`User confirmed deletion of person ${personToDelete.id}`)

      personsService.deletePerson(personToDelete.id)
        .then(console.log(`Person ${personToDelete.id} deleted successfully`))
        .then(setPersons(allPersons.filter(person => person.id !== personToDelete.id)))
        .catch(error => {
          console.log(error)

          setMessageObj({
            type: "errormsg",
            text: `Information of ${personToDelete.name} has already been removed from server`
          })

          setTimeout(() => setMessageObj(null), 5000)
        })
    }

    else console.log(`User cancelled deletion of person ${personToDelete.id}`)
  }

  return (
    <button type="button" onClick={deletePerson}>delete</button>
  )
}

const Person = ({ person }) => {
  return (
    <>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </>
  )
}

const PersonsView = ({ currFilter, personsList, setPersons, setMessageObj }) => {

  const personsToShow = personsList
    .filter(person => {
      return (
        person.name.toLowerCase().includes(currFilter)
        || person.number.includes(currFilter)
      )
    })

  return (
    <table>
      <tbody>
        {personsToShow.map(person =>
          <tr key={person.id}>
            <Person person={person} />
            <td>
              <DeleteButton
                personToDelete={person}
                allPersons={personsList}
                setPersons={setPersons}
                setMessageObj={setMessageObj}
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default PersonsView