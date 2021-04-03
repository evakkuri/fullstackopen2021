import React from 'react'

const Filter = ({ currFilter, onChangeFunction }) => {
  return (
    <div>
      filter shown with <input
        value={currFilter}
        onChange={onChangeFunction}
      />
    </div>
  )
}

export default Filter
