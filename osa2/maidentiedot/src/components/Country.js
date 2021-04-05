import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <h3>Basic information</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_1}>{lang.name}</li>)
        }
      </ul>
      <img
        alt={`${country.name} flag`}
        src={country.flag}
        width="140"
        height="70"
      />
      <Weather capitalName={country.capital} />
    </div>
  )
}

export default Country
