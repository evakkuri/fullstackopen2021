import React from 'react'

const PersonForm = ({ nameValue, nameChangeHandler, numberValue, numberChangeHandler, addPersonHandler }) => {
  return (
    <form onSubmit={addPersonHandler}>
      <p>
        name: <input
          value={nameValue}
          onChange={nameChangeHandler}
        />
      </p>
      <p>
        number: <input
          value={numberValue}
          onChange={numberChangeHandler}
        />
      </p>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm