import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      console.log(`Adding vote to anecdote ${action.id}`)

      const updatedState = state.map((anecdote) =>
        anecdote.id === action.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote)

      const sortedState = updatedState.sort((anec1, anec2) => anec2.votes - anec1.votes)

      return sortedState

    case 'NEW_ANECDOTE':
      console.log(`Adding new anecdote: ${JSON.stringify(action.data)}`)
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data
    
    default: return state
  }
}

export const vote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdoteArray = await anecdoteService.getAll()
    const sortedArray = anecdoteArray.sort((anec1, anec2) => anec2.votes - anec1.votes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedArray,
    })
  }
}

export default anecdoteReducer