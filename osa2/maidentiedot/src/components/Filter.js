import React from 'react'

const Filter = ({ value, handler }) => {
  const filterChange = (event) => {
    console.log(event.target.value)
    handler(event.target.value)
  }

  return (
    <input value={value} onChange={filterChange}></input>
  )
}

export default Filter