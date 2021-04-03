const PersonForm = ({nameValue, nameChangeHandler, numberValue, numberChangeHandler, addPersonHandler}) => {
  return (
    <form onSubmit={addPersonHandler}>
      <div>
        name: <input
          value={nameValue}
          onChange={nameChangeHandler}
        />
      </div>
      <div>
        number: <input
          value={numberValue}
          onChange={numberChangeHandler}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm