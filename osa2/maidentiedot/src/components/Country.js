import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <h3>Basic information</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(lang => <li>{lang.name}</li>)}
      </ul>
      <img
        alt={`${country.name} flag`}
        src={country.flag}
        width="150"
        height="70"
      />
    </div>
  )
}

export default Country
