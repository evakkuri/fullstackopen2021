import React, { useState } from 'react'

const SectionHeader = (props) => <h2>{props.text}</h2>

const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)

  const { good, neutral, bad } = props

  const all = good + neutral + bad
  const average = (good - bad) / all
  const posPercent = ((good / all) * 100) + " %"

  if (all > 0) return (
    <table>
      <StatisticLine name={"Good"} value={good} />
      <StatisticLine name={"Neutral"} value={neutral} />
      <StatisticLine name={"Bad"} value={bad} />
      <StatisticLine name={"All"} value={all} />
      <StatisticLine name={"Average"} value={average} />
      <StatisticLine name={"Positive"} value={posPercent} />
    </table>
  )
  return <p>No feedback given</p>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <SectionHeader text={"Give feedback"} />
      <Button text={"Good"} handleClick={() => setGood(good + 1)} />
      <Button text={"Neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"Bad"} handleClick={() => setBad(bad + 1)} />
      <SectionHeader text={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App