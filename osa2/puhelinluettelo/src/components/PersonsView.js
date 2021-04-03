const Entry = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const PersonsView = ({ currFilter, personsList }) => {

  const personsToShow = personsList
    .filter(person => {
      return (
        person.name.toLowerCase().includes(currFilter)
        || person.number.includes(currFilter)
      )
    })

  return (
    personsToShow.map(entry => <Entry
      key={entry.name}
      name={entry.name}
      number={entry.number}
    />)
  )
}

export default PersonsView