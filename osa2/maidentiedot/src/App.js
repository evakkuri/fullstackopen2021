import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList'
import Filter from './components/Filter'

import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [currFilter, setFilter] = useState('')

  const countriesHook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        setCountries(response.data)
      })
  }

  useEffect(countriesHook, [])
  console.log('render', countries.length, 'notes')

  const countriesFiltered = countries.filter(
    country => country.name
      .toLowerCase()
      .includes(currFilter.toLowerCase())
  )

  return (
    <div className="App">
      <Filter value={currFilter} handler={setFilter} />
      <CountryList countryList={countriesFiltered} setFilter={setFilter} />
    </div>
  );
}

export default App;
