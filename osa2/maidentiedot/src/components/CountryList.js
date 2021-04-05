import React from 'react'
import Country from './Country'

const FilterButton = ({ countryName, setFilter }) => {
  return (
    <button onClick={() => setFilter(countryName)}>show</button>
  )
}

const CountryList = ({ countryList, setFilter }) => {
  console.log('CountryView: Rendering', countryList.length)
  console.log(
    'CountryView: countryList length over 10:',
    countryList.length > 10
  )

  if (countryList.length === 1) {
    console.log('CountryView: 1 match found')
    return (
      countryList.map(country =>
        <Country key={country.numericCode} country={country} />
      )
    )
  }

  if (countryList.length === 0) {
    console.log('CountryView: Empty list')
    return (<p></p>)
  }

  if (countryList.length > 10) {
    console.log('CountryView: More than 10 matches, list too long')
    return (<p>Too many matches, specify another filter</p>)
  }


  console.log("CountryView: Less than 10 matches, showing country names")

  const countryTable = countryList.map(country => {
    return (
      <tr key={country.numericCode}>
        <td>{country.name}</td>
        <td><FilterButton countryName={country.name} setFilter={setFilter} /></td>
      </tr>)
  })

  return (
    <table>
      <tbody>
        {countryTable}
      </tbody>
    </table>
  )
}

export default CountryList