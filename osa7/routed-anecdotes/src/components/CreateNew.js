import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const reset = (event) => {
    content.reset()
    author.reset()
    info.reset()
  }

  const createInputObj = (fullObj) => {
    return { ...fullObj, reset: undefined }
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:
          <input name='content' {...createInputObj(content)} />
        </div>√
        <div>
          Author
          <input name='author' {...createInputObj(author)} />
        </div>
        <div>
          Url for more info
          <input name='info' {...createInputObj(info)} />
        </div>
        <button type='submit'>Create</button>
      </form>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default CreateNew
