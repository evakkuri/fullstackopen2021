import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVoteClick }) => {  
  const elem = (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </li>
  )

  return elem
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  return (
    <div>
      <ul>
        {anecdotes
          .filter(anecdote => filter === ''
            ? true
            : anecdote.content.toLowerCase().includes(filter))
          .map(anecdote =>
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleVoteClick={() => {
                dispatch(vote(anecdote.id))
                dispatch(setNotification(`You voted for: ${anecdote.content}`))
              }
              }
            />
          )}
      </ul>
    </div>
  )
}

export default AnecdoteList