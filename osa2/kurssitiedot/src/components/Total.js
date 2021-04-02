import React from 'react'

const Total = ({ parts }) => {
    console.log(parts)

    const total = parts
        .map(part => part.exercises)
        .reduce((accumVar, curVal) => accumVar + curVal)

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

export default Total