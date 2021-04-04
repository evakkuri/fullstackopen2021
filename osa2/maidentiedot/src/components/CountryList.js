import React from 'react'
import Country from './Country'

const CountryList = ({ countryList }) => {
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
    console.log('CountryView: List too long')
    return (<p>Too many matches, specify another filter</p>)
  }

  return (
    countryList.map(country =>
      <p key={country.numericCode} >{country.name}</p>
    )
  )
}

export default CountryList