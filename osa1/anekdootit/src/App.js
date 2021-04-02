import React, { useState } from 'react'

const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const MostPopularAnecdote = (props) => {
  const { anecdotes, points } = props
  console.log("MostPopularAnecdote", anecdotes, points)
  const mostPopIndex = points.indexOf(Math.max(...points))
  console.log("MostPopularAnecdote mostPopIndex", mostPopIndex)

  return (
    <div>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostPopIndex]}</p>
      <p>has {points[mostPopIndex]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  console.log(anecdotes)

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  
  console.log(points)

  const [selected, setSelected] = useState(0)

  const randSelected = () => {
    const randVal = Math.floor(Math.random() * anecdotes.length)
    console.log("Next random anecdote is #", randVal)
    return randVal
  }

  const voteSelected = () => {
    console.log("Adding vote for andecote", selected)
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={voteSelected}/>
      <Button text="next anecdote" handleClick={() => setSelected(randSelected)}/>
      <MostPopularAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App