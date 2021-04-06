import personsService from '../services/persons'

const DeleteButton = ({ personToDelete, allPersons, setPersons }) => {
  const deleteClick = () => {
    console.log(`Confirming deletion for person ${personToDelete.id}`)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      console.log(`User confirmed deletion of person ${personToDelete.id}`)

      personsService.deletePerson(personToDelete.id)
        .then(console.log(`Person ${personToDelete.id} deleted successfully`))
        .then(setPersons(allPersons.filter(person => person.id !== personToDelete.id)))
        .catch(error => {
          console.log(error)
          alert(
            `Deletion of person ${personToDelete.id} was not successfull`
          )
        })
    }

    else console.log(`User cancelled deletion of person ${personToDelete.id}`)
  }

  return (
    <button type="button" onClick={deleteClick}>delete</button>
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

const PersonsView = ({ currFilter, personsList, setPersons }) => {

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
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default PersonsView