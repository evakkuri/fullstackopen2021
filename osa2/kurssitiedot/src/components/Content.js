import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                console.log(part)
                return (
                    <Part key={part.id} partName={part.name} partNumExercises={part.exercises} />
                )
            })}
        </div>
    )
}

export default Content