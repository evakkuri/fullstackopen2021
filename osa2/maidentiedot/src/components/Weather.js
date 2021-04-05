import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({ capitalName }) => {
  const [weather, setWeather] = useState({})

  const accessKey = process.env.REACT_APP_WEATHER_API_KEY

  const weatherApiQuery =
    `http://api.weatherstack.com/current?access_key=${accessKey}&query=${capitalName}`

  const weatherHook = () => {
    console.log('weatherHook: Started')
    axios
      .get(weatherApiQuery)
      .then(response => {
        console.log("weatherHook: Promise fulfilled")
        console.log("Response:", response)
        setWeather(response.data)
      })
  }

  useEffect(weatherHook, [weatherApiQuery])

  console.log("weather:", weather)
  console.log("weather type:", typeof (weather))
  console.log(Object.keys(weather))

  const weatherView = () => {
    if (Object.keys(weather).length > 0) return (
      <div>
        <p><b>Temperature:</b> {weather.current.temperature} Celsius</p>
        <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        <p>
          {weather.current.weather_icons.map(icon =>
            <img key={icon}
              alt={`Current weather in ${capitalName} icon`}
              src={icon}
              width="70"
              height="70"
            />
          )}
        </p>
      </div>
    )
    else return <p></p>
  }

  return (
    <div>
      <h3>Weather in {capitalName}</h3>
      {weatherView()}
    </div>
  )
}

export default Weather